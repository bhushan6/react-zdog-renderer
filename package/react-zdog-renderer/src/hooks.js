import React from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  (window.document?.createElement ||
    window.navigator?.product === "ReactNative")
    ? React.useLayoutEffect
    : React.useEffect;

export const ZDogContext = React.createContext(null);

export function useStore() {
  const store = React.useContext(ZDogContext);
  if (!store)
    throw Error(
      `react-ogl hooks can only used inside a canvas or ZDogContext provider!`
    );
  return store;
}

export function useZDog(selector, equalityFn) {
  return useStore()(selector, equalityFn);
}

export function useAnimate(callback, renderPriority = 0) {
  const subscribe = useZDog((state) => state.subscribe);
  const unsubscribe = useZDog((state) => state.unsubscribe);
  // Store frame callback in a ref so we can pass a mutable reference.
  // This allows the callback to dynamically update without blocking
  // the render loop.
  const ref = React.useRef(callback);
  useIsomorphicLayoutEffect(() => (ref.current = callback), [callback]);
  // Subscribe on mount and unsubscribe on unmount
  useIsomorphicLayoutEffect(() => {
    subscribe(ref, renderPriority);
    return () => unsubscribe(ref, renderPriority);
  }, [subscribe, unsubscribe, renderPriority]);
}

export const useInvalidate = () => {
  const illu = useZDog((state) => state.Illustration);

  return () => {
    illu?.updateRenderGraph();
  };
};
