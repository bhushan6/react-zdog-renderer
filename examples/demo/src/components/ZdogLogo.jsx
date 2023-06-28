/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Canvas, useAnimate, useZDog } from "react-zdog-renderer";
import Zdog from "zdog";

const depth = 20;
const lineWidth = 8;

const topSide = {
  width: 40,
  height: depth,
  translate: { y: -20 },
  rotate: { x: Zdog.TAU / 4 },
  fill: true,
  stroke: lineWidth,
  color: "orange",
};

const endCap = {
  width: depth,
  height: 8,
  translate: { x: -20, y: -16 },
  rotate: { y: Zdog.TAU / 4 },
  fill: true,
  color: "orange",
  stroke: lineWidth,
  backface: false,
};

const cornerCap = {
  height: 10,
  translate: { x: -20, y: 15 },
};

const underSide = {
  width: 30,
  height: depth,
  translate: { x: -5, y: -12 },
  rotate: { x: -Zdog.TAU / 4 },
  stroke: lineWidth,
  fill: true,
  color: "orange",
};

const slopeW = 30;
const slopeH = 22;
const slopeAngle = Math.atan(slopeH / slopeW);

const slope = {
  width: Math.sqrt(slopeH * slopeH + slopeW * slopeW),
  height: depth,
  translate: { x: -5, y: -1 },
  rotate: { x: Zdog.TAU / 4, y: slopeAngle },
  stroke: lineWidth,
  fill: true,
  color: "orange",
  backface: false,
};

const orange = "orange";
const TAU = Zdog.TAU;

const tail = {
  diameter: 32,
  quarters: 1,
  closed: false,
  translate: { x: 22, y: -4 },
  rotate: { z: TAU / 4 },
  color: orange,
  stroke: lineWidth,
};

const tongueH = 12;
const tongueS = 5;
const tongueTip = tongueH + tongueS;

const tongue = {
  path: [
    { x: -tongueS, y: 0 },
    { x: tongueS, y: 0 },
    { x: tongueS, y: tongueH },
    {
      arc: [
        { x: tongueS, y: tongueTip },
        { x: 0, y: tongueTip },
      ],
    },
    {
      arc: [
        { x: -tongueS, y: tongueTip },
        { x: -tongueS, y: tongueH },
      ],
    },
  ],
  rotate: { x: TAU / 4 - Math.atan(16 / 22) },
  fill: true,
  stroke: 4,
  color: "#534",
};

const face = {
  path: [
    { x: -20, y: -20 },
    { x: 20, y: -20 },
    { x: 20, y: -10 },
    { x: -10, y: 12 },
    { x: 20, y: 12 },
    { x: 20, y: 20 },
    { x: -20, y: 20 },
    { x: -20, y: 10 },
    { x: 10, y: -12 },
    { x: -20, y: -12 },
  ],
  translate: { z: depth / 2 },
  fill: true,
  color: "gold",
  stroke: lineWidth,
  backface: false,
};

const nose = {
  quarters: 2,
  scale: 8,
  translate: { x: -26, y: -20 },
  rotate: { y: TAU / 4, z: TAU / 4 },
  fill: true,
  stroke: 5,
  color: "#534",
  closed: true,
};

const ear = {
  quarters: 2,
  scale: 24,
  rotate: { z: -TAU / 16, x: TAU / 16 },
  translate: { x: 10, y: -14, z: depth },
};

export const ZdogLogo = ({ background }) => {
  return (
    <>
      <Canvas
        element={"svg"}
        background={"transparent"}
        dragRotate={true}
        zoom={2}
        style={{
          height: "100%",
        }}
      >
        <anchor translate={{ y: 0, x: -4 }}>
          <group>
            <group updateSort={true}>
              <rect {...topSide}></rect>
              <rect
                {...topSide}
                translate={{ y: 20 }}
                rotate={{ x: -Zdog.TAU / 4 }}
              ></rect>
              <rect {...endCap}></rect>
              <rect {...endCap} translate={{ x: 20, y: 16 }}></rect>
              <rect {...endCap} {...cornerCap}></rect>
              <rect
                {...endCap}
                {...cornerCap}
                translate={{ x: 20, y: -15 }}
                rotate={{ y: -Zdog.TAU / 4 }}
              ></rect>
              <rect {...underSide}></rect>
              <rect
                {...underSide}
                translate={{ x: 5, y: 12 }}
                rotate={{ x: Zdog.TAU / 4 }}
              ></rect>
              <rect {...slope}></rect>
              <rect
                {...slope}
                translate={{ x: 5, y: 1 }}
                rotate={{ x: -Zdog.TAU / 4, y: -slopeAngle }}
              ></rect>
              <ellipse {...tail} />
              <anchor translate={{ x: -6, y: -7 }} rotate={{ y: TAU / 4 }}>
                <shape {...tongue}></shape>
              </anchor>
              <ellipse {...nose} />
            </group>
            <group updateSort={true}>
              <shape {...face}></shape>
              <shape
                {...face}
                scale={{ x: -1 }}
                translate={{ z: -depth / 2 }}
                rotate={{ y: TAU / 2 }}
              ></shape>
            </group>
          </group>
          <group>
            <ellipse {...nose} {...ear}>
              <shape visible={false} translate={{ z: 0.5, x: -0.5 }}></shape>
            </ellipse>
          </group>
          <group scale={{ z: -1 }}>
            <ellipse {...nose} {...ear}>
              <shape visible={false} translate={{ z: 0.5, x: -0.5 }}></shape>
            </ellipse>
          </group>
        </anchor>
      </Canvas>
    </>
  );
};
