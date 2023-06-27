/* eslint-disable no-unused-vars */
import Zdog from "zdog";
import { create } from "zustand";
import { ZDogContext, reconciler } from ".";
import React from "react";

const roots = new Map();

export const render = (
  element,
  canvas,
  {
    dragRotate = false,
    rotate,
    onDragStart = () => {},
    frameloop = "always",
    width,
    height,
    resize,
    ...configs
  }
) => {
  let root = roots.get(canvas);

  if (!root) {
    const illo = new Zdog.Illustration({
      element: canvas,
      dragRotate,
      rotate,
      onDragStart,
      resize,
      ...configs,
    });
    if (resize !== "fullscreen") {
      illo.setSize(width, height);
    }
    const store = create((set, get) => {
      return {
        Illustration: illo,
        frameloop,
        priority: 0,
        subscribed: [],
        // Subscribe/unsubscribe elements to the render loop
        subscribe(refCallback, renderPriority = 0) {
          // Subscribe callback
          const { subscribed } = get();
          subscribed.push(refCallback);

          // Enable manual rendering if renderPriority is positive
          set((state) => ({ priority: state.priority + renderPriority }));
        },
        unsubscribe(refCallback, renderPriority = 0) {
          // Unsubscribe callback
          const { subscribed } = get();
          const index = subscribed.indexOf(refCallback);
          if (index !== -1) subscribed.splice(index, 1);

          // Disable manual rendering if renderPriority is positive
          set((state) => ({ priority: state.priority - renderPriority }));
        },
        set,
        get,
      };
    });

    const state = store.getState();
    let nextFrame;
    // eslint-disable-next-line no-inner-declarations
    function animate(time = 0, frame) {
      const state = store.getState();

      // Cancel animation if frameloop is set, otherwise keep looping
      if (state.frameloop === "never") {
        return window.cancelAnimationFrame(nextFrame);
      }

      nextFrame = window.requestAnimationFrame(animate);

      for (const ref of state.subscribed) ref.current?.(state, time, frame);

      state.Illustration.updateRenderGraph();
    }
    if (state.frameloop !== "never") animate();

    const container = reconciler.createContainer(illo, element, false, null);

    root = { container, store };
    roots.set(canvas, root);
  }
  const state = root.store.getState();

  if (state.frameloop !== frameloop) state.set(() => ({ frameloop }));

  // Update contanier
  reconciler.updateContainer(
    <ZDogContext.Provider value={root.store}>{element}</ZDogContext.Provider>,
    root.container,
    null,
    () => {
      state.Illustration.setSize(width, height);

      if (state.frameloop === "never") {
        state.Illustration.updateRenderGraph();
      }
    }
  );

  return root.container;
};

export const unmountComponentAtNode = (canvas) => {
  const root = roots.get(canvas);
  if (!root) return;
  reconciler.updateContainer(null, root.container, null, () => {
    // Delete root
    roots.delete(canvas);

    const state = root.store.getState();

    // Cancel animation
    state.set(() => ({ frameloop: "never" }));
  });
};
