/* eslint-disable react/prop-types */
import React from "react";

export const toPascalCase = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1);

export const RESERVED_PROPS = ["children", "key", "ref", "__self", "__source"];

export function getInstanceProps(queue) {
  const props = {};

  for (const key in queue) {
    if (!RESERVED_PROPS.includes(key)) props[key] = queue[key];
  }

  return props;
}

export class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError = () => ({ error: true });
  componentDidCatch(error) {
    this.props.set(error);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
