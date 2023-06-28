/* eslint-disable no-unused-vars */
import React from "react";
import { ZdogLogo } from "./ZdogLogo";
import { Label } from "./Label";

export const Heading = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "70vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: `9.5vw`,
          textAlign: "left",
          color: "white",
          fontWeight: 900,
        }}
      >
        React{" "}
        <div
          style={{
            width: "10.5vw",
            height: "10.5vw",
            display: "inline-block",
            position: "relative",
            bottom: "-30px",
            left: "20px",
            // border: "2px solid white",
          }}
        >
          <ZdogLogo background={"white"} />
        </div>
        dog Renderer
      </h1>
      <p
        style={{
          fontSize: "1.7vw",
          color: "#ccc",
        }}
      >
        React renderer for zdog, so you can create cute 3D graphics in react app
        declaratively
      </p>
      <div style={{ display: "flex", gap: "4px", padding: "20px 0" }}>
        <Label
          text={"Github"}
          link="https://github.com/bhushan6/react-zdog-renderer"
        />
        <Label
          text={"Package"}
          link="https://www.npmjs.com/package/react-zdog-renderer"
        />
        <Label
          text={"Example"}
          link="https://stackblitz.com/edit/react-lwydjw?file=src%2FApp.js"
        />
        <Label text={"Twitter"} link="https://twitter.com/Bhushanwtf" />
      </div>
    </div>
  );
};
