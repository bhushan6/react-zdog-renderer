/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const Label = ({ text, link = "", styles = {} }) => {
  return (
    <div
      className="link"
      style={{
        background: "white",
        padding: "4px 8px",
        width: "fit-content",
        borderRadius: "6px",
        ...styles,
      }}
    >
      <a
        style={{ textDecoration: "none", fontSize: "20px" }}
        target={"_blank"}
        href={link}
        rel="noreferrer"
      >
        {text}
      </a>
    </div>
  );
};
