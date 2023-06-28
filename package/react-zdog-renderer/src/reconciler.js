/* eslint-disable no-unused-vars */
import React from "react";
import ReactReconciler from "react-reconciler";
import Zdog from "zdog";
import { RESERVED_PROPS, getInstanceProps, toPascalCase } from ".";

export const reconciler = ReactReconciler({
  supportsMutation: true,

  createInstance(type, props, rootContainerInstance) {
    const zdogEleType = toPascalCase(type);
    if (Zdog[zdogEleType] === undefined) {
      throw Error(
        `Please use valid zdog Element, looks like ${type} doesn't exist in zdog`
      );
    }
    const { dragRotate, addTo, ...rest } = getInstanceProps(props);
    let ele = new Zdog[zdogEleType]({
      ...rest,
    });

    if (dragRotate) {
      rootContainerInstance.dragRotate = ele;
    }

    if (addTo) {
      console.warn(
        `"addTo" prop found on component, you don't really need to use addTo prop to add component as child, just nest the component within the parent and react will add it as child for you.`
      );
    }

    return ele;
  },

  createTextInstance() {
    throw Error("Text is not supported");
  },

  appendChildToContainer(container, child) {
    container.addChild(child);
  },
  appendChild(parent, child) {
    parent.addChild(child);
  },
  appendInitialChild(parent, child) {
    parent.addChild(child);
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  removeChild(parent, child) {
    parent.removeChild(child);
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    let payload = {};

    if (newProps.color !== oldProps.color) {
      payload.color = newProps.color;
    }

    let payload2 = {};
    const newPropsCopy = { ...newProps };

    Object.keys(oldProps).forEach((key) => {
      if (!RESERVED_PROPS.includes(key)) {
        if (oldProps[key] !== newPropsCopy[key]) {
          payload2[key] = newPropsCopy[key];
        }
      }
      delete newPropsCopy[key];
    });

    payload2 = { ...payload2, ...newPropsCopy };

    return payload2;
  },

  commitUpdate(instance, updatePayload) {
    Object.entries(updatePayload).forEach(([key, value]) => {
      instance[key] = value;
    });
  },

  finalizeInitialChildren() {},
  getChildHostContext() {},
  getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false;
  },

  getRootHostContext() {},
  clearContainer() {},
  detachDeletedInstance: (instance) => {
    instance.remove();
  },
  getCurrentEventPriority() {},
});
