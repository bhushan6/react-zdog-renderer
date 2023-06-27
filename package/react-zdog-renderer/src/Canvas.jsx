/* eslint-disable react/prop-types */
import React from "react";
import {
  useIsomorphicLayoutEffect,
  ErrorBoundary,
  render,
  unmountComponentAtNode,
} from ".";
import useMeasure from "react-use-measure";

export const Canvas = ({
  style,
  children,
  resize,
  dragRotate,
  rotate,
  zoom = 1,
  centered = true,
  element = "canvas",
  onDragStart,
  frameloop = "always",
  ...props
}) => {
  const canvasRef = React.useRef(null);

  const [divRef, { width, height }] = useMeasure({
    scroll: true,
    debounce: { scroll: 50, resize: 0 },
  });

  const [canvas, setCanvas] = React.useState();

  const [error, setError] = React.useState(false);

  if (error) throw error;

  if (canvas && width > 0 && height > 0) {
    render(<ErrorBoundary set={setError}>{children}</ErrorBoundary>, canvas, {
      dragRotate,
      rotate,
      onDragStart,
      zoom,
      centered,
      frameloop,
      width,
      height,
      resize,
    });
  }

  useIsomorphicLayoutEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  React.useEffect(() => {
    if (canvas)
      return () => {
        unmountComponentAtNode(canvas);
      };
  }, [canvas]);

  const Element = element;

  const sizeProp = element === "svg" ? { width, height } : {};

  return (
    <>
      <h1>{element}</h1>
      <div
        {...props}
        ref={divRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...style,
        }}
      >
        <Element
          ref={canvasRef}
          style={{
            display: "blocck",
            boxSizing: "border-box",
          }}
          {...sizeProp}
        />
      </div>
    </>
  );
};
