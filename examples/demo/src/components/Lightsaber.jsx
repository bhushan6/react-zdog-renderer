/* eslint-disable no-unused-vars */
import React from "react";
import { useAnimate } from "react-zdog-renderer";

const saber = {
  path: [
    { y: -130 }, // start at 1st point
    { y: 60 }, // line to 2nd point
  ],
  stroke: 20,
  color: "blue",
  translate: { y: -100, x: 100 },
  rotate: { z: 10 },
};

const handle1 = {
  width: 30,
  height: 15,
  depth: 30,
  stroke: false,
  color: "#515A5A",
  translate: { y: 80, x: -20 },
  rotate: { z: 10 },
};

const handle2 = {
  width: 30,
  height: 15,
  depth: 30,
  stroke: false,
  color: "#515A5A",
  translate: { y: 20, x: 20 },
  rotate: { z: 10 },
};

const box = {
  width: 25,
  height: 100,
  depth: 25,
  stroke: true,
  color: "#99A3A4",
  leftFace: "#7F8C8D",
  rightFace: "#7F8C8D",
  topFace: "#ED0",
  bottomFace: "#636",
  translate: { y: 50 },
  rotate: { z: 10 },
};

export const Lightsaber = () => {
  //   useAnimate((state) => {
  //     state.Illustration.rotate.y += 0.03;
  //   });

  return (
    <>
      <shape {...saber}></shape>
      <box {...handle1}></box>
      <box {...handle2}></box>
      <box {...box}></box>
    </>
  );
};
