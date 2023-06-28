/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useState } from "react";
import { useAnimate } from "react-zdog-renderer";

/** --- Basic, re-usable shapes -------------------------- */
const TAU = Math.PI * 2;
const Eye = (props) => (
  <ellipse
    diameter={1.5}
    quarters={2}
    translate={{ x: -2.2, y: 0, z: 4.5 }}
    rotate={{ z: -TAU / 4 }}
    color="#444B6E"
    stroke={0.5}
    {...props}
  />
);
const Leg = (props) => (
  <shape
    path={[{ y: 0 }, { y: 6 }]}
    translate={{ x: -3 }}
    color="#747B9E"
    stroke={4}
    {...props}
  >
    <shape
      path={[{ y: 0 }, { y: 6 }]}
      translate={{ y: 6 }}
      rotate={{ x: -TAU / 8 }}
      color="#747B9E"
      stroke={4}
    />
    <roundedRect
      width={2}
      height={4}
      cornerRadius={1}
      translate={{ y: 12, z: -3.5 }}
      rotate={{ x: TAU / 6 }}
      color="#444B6E"
      fill
      stroke={4}
    />
  </shape>
);
const Arm = (props) => (
  <shape
    path={[{ y: 0 }, { y: 4 }]}
    translate={{ x: -5, y: -2 }}
    color="#F0F2EF"
    stroke={4}
    {...props}
  >
    <shape
      path={[{ y: 0 }, { y: 4 }]}
      translate={{ y: 6 }}
      rotate={{ x: TAU / 8 }}
      color="#EA0"
      stroke={4}
    />
    <shape translate={{ z: 4, y: 9, x: 0 }} stroke={5.4} color="#EA0" />
  </shape>
);

/** --- Assembly ----------------------------------------- */
let t = 0;
export function Guy() {
  // Change motion every second
  const [up, setUp] = useState(true);
  useEffect(
    () => void setInterval(() => setUp((previous) => !previous), 450),
    []
  );
  // Turn static values into animated values
  const { rotation, color, size } = {
    size: up ? 1.2 : 0.2,
    color: up ? "#EA0" : "tomato",
    rotation: up ? 0 : Math.PI,
  };
  const ref = useRef();

  useAnimate(() => {
    if (!ref.current) return;
    ref.current.rotate.y = Math.cos((t += 0.1) / TAU);
  });

  return (
    <shape ref={ref} path={[{ x: -3 }, { x: 3 }]} stroke={4} color="#747B9E">
      <anchor rotate={rotation}>
        <shape
          path={[{ x: -1.5 }, { x: 1.5 }]}
          translate={{ y: -6 }}
          stroke={9}
          color="#E1E5EE"
        >
          <shape stroke={11} translate={{ y: -9.5 }} color={color}>
            <shape
              translate={{ x: 0, y: -2, z: -4 }}
              stroke={8}
              color="#747B9E"
            />
            <ellipse
              diameter={6}
              rotate={{ x: -TAU / 10 }}
              translate={{ y: -4, z: -1 }}
              stroke={4}
              color="#444B6E"
              fill
            />
            <Eye />
            <Eye translate={{ x: 2.2, z: 4.5 }} />
            <ellipse
              diameter={1.3}
              scale={size}
              translate={{ y: 2, z: 4.5 }}
              rotate={{ z: TAU / 4 }}
              closed
              color="#444B6E"
              stroke={0.5}
              fill
            />
            <ellipse
              diameter={1}
              translate={{ x: -3.5, y: 1.5, z: 4.5 }}
              rotate={{ z: TAU / 4 }}
              closed
              color="indianred"
              stroke={0.5}
              fill
            />
            <ellipse
              diameter={1}
              translate={{ x: 3.5, y: 1.5, z: 4.5 }}
              rotate={{ z: TAU / 4 }}
              closed
              color="indianred"
              stroke={0.5}
              fill
            />
            <ellipse
              diameter={0.5}
              translate={{ x: 4.5, y: -4.5, z: 4.5 }}
              rotate={{ z: TAU / 4 }}
              closed
              color="lightblue"
              stroke={0.5}
              fill
            />
          </shape>
          <Arm rotate={rotation} />
          <Arm translate={{ x: 5, y: -2 }} rotate={rotation} />
        </shape>
      </anchor>
      <Leg rotate={rotation} />
      <Leg translate={{ x: 3 }} rotate={rotation} />
    </shape>
  );
}
