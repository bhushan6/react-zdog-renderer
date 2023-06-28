import { useEffect } from "react";
import { useZDog, useInvalidate } from "react-zdog-renderer";

export const Rotate = () => {
  const illu = useZDog((state) => state.Illustration);
  const invalidate = useInvalidate();
  useEffect(() => {
    const r = () => {
      if (illu) {
        // illu.rotate.y += 0.3;
        // invalidate();
      }
    };
    document.addEventListener("click", r);

    if (illu) {
      illu.onDragMove = () => {
        invalidate();
      };
    }

    return () => document.removeEventListener("click", r);
  }, [illu, invalidate]);

  return <></>;
};
