/* eslint-disable react/prop-types */
import { useRef } from "react";
import Zdog from "zdog";
import { useAnimate } from "react-zdog-renderer";

const TAU = Zdog.TAU;
const hipX = 3;
const armSize = 6;

const head = {
  stroke: 12,
  color: "gold",
  translate: { y: -9.5 },
};

const eye = {
  diameter: 2,
  quarters: 2,
  translate: { x: -2, y: 1, z: 4.5 },
  rotate: { z: -TAU / 4 },
  color: "red",
  stroke: 0.5,
  // backface: false,
};

const mouth = {
  diameter: 3,
  quarters: 2,
  translate: { y: 2.5, z: 4.5 },
  rotate: { z: TAU / 4 },
  closed: true,
  color: "#FED",
  stroke: 0.5,
  fill: true,
  backface: false,
};

const hips = {
  path: [{ x: -hipX }, { x: hipX }],
  stroke: 4,
  color: "#636",
  translate: { y: 2 },
};

const chest = {
  path: [{ x: -1.5 }, { x: 1.5 }],
  translate: { y: -6.5 },
  stroke: 9,
  color: "#C25",
};

const leg = {
  path: [{ y: 0 }, { y: 12 }],
  translate: { x: -hipX },
  color: "#636",
  stroke: 4,
};

const foot = {
  // addTo: leg,
  width: 2,
  height: 4,
  cornerRadius: 1,
  // y: past leg end, z: scootch toward front
  translate: { y: 14, z: 2 },
  color: "#C25",
  fill: true,
  stroke: 4,
  rotate: { x: Zdog.TAU / 4 },
};

const upperArm = {
  path: [{ y: 0 }, { y: armSize }],
  translate: { x: -5, y: -2 },
  color: "#636",
  stroke: 4,
};

const foreArm = {
  path: [{ y: 0 }, { y: armSize }],
  translate: { y: armSize },
  color: "#EA0",
  stroke: 4,
  rotate: { x: TAU / 8 },
};

const hand = {
  translate: { y: armSize, z: 1 },
  stroke: 6,
  color: "#EA0",
};

const spine = {
  rotate: { x: TAU / 8 },
};

let t = 0;
export const Guy2 = ({ y = 2 }) => {
  const ref = useRef();

  useAnimate(() => {
    if (!ref.current) return;
    ref.current.rotate.y = 0.5 * Math.cos((t += 0.1) / TAU);
  });

  return (
    <>
      <anchor ref={ref}>
        <shape {...hips} translate={{ y }}>
          <anchor {...spine}>
            <shape {...chest}>
              <shape {...head}>
                <ellipse {...eye}></ellipse>
                <ellipse {...eye} translate={{ x: 2, y: 1, z: 4.5 }}></ellipse>
                <ellipse {...mouth}></ellipse>
              </shape>
              <shape {...upperArm} rotate={{ x: -TAU / 4 }}>
                <shape {...foreArm}>
                  <shape {...hand}></shape>
                </shape>
              </shape>
              <shape
                {...upperArm}
                translate={{ x: 5, y: -2 }}
                rotate={{ x: TAU / 4 }}
              >
                <shape {...foreArm}>
                  <shape {...hand}></shape>
                </shape>
              </shape>
            </shape>
          </anchor>
          <shape {...leg} rotate={{ x: TAU / 4 }}>
            <roundedRect {...foot}></roundedRect>
          </shape>
          <shape {...leg} translate={{ x: hipX }} rotate={{ x: -TAU / 8 }}>
            <roundedRect {...foot} rotate={{ x: -TAU / 8 }}></roundedRect>
          </shape>
        </shape>
      </anchor>
    </>
  );
};
