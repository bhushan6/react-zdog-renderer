    npm install zdog react-zdog-renderer
    # or
    yarn add zdog react-zdog-renderer

![npm](https://img.shields.io/npm/v/react-zdog-renderer.svg?style=flat-square) ![npm](https://img.shields.io/npm/dt/react-zdog-renderer.svg?style=flat-square)

react-zdog-renderer is a react renderer for [zdog](https://zzz.dog/) library, Everything that works in vanialla zdog library it should work in react-zdog-renderer, it is binded to specific version of zdog, so even something new added into zdog lib should work out of the box here, unless changes are done API syntax. Try a live demo [here](https://stackblitz.com/edit/react-lwydjw?file=src%2FApp.js).

**Note:**
There is another library as solution to same problem this library trying to solve, [react-zdog](https://github.com/pmndrs/react-zdog) and I'd recommed checking that out before, just in case you stumbled upon this library before that one (which I doubt). It is light in weight that this library. Only issue is, it is not maintained and I found a bug in it when used react 18 which makes it unusable react 18. though you can still try it, just in case it worked for you.

# How it looks like

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "react-zdog-renderer";

const root = createRoot(document.getElementById("root"));

root.render(
  <Canvas zoom={8} style={{ width: "200px", height: "200px" }}>
    <shape stroke={20} color="lightblue" rotate={{ x: Math.PI }} />
  </Canvas>
);
```

# API

## Canvas

it create a root element required for rendering graphics, either svg or canvas, depending on element prop value (defaults to SVG) and initiates the Zdog.Illustration internally and takes all the config options of Illustration as pros. Apart from configs of Illustrations it takes few more props

### element

This specifies the type of root element to be used for graphics rendering. Possible values are "svg" and "canvas". Default is "svg"

### frameloop

Default is "always". This prop can be used for specifying render mode. Possible values are "always" and "never". If you wanna render the frames on demand you can specify it as "never" and use `useInavlidate` hook for rendering frames.

### background

Sets the background color of scene. Default is "white".

## Hooks

### useZDog

returns the state of renderer

```
import {useZDog} from "react-zdog-renderer"

function MyComponent() {
  const {
    Illustration,   // The parent Zdog.Illustration object which is used as scene
    frameloop
  } = useZDog()

  //since we use zustand as state manager, more appropriate way of accessing would be
  const Illustration = useZDog(state => state.Illustration) // this is the only useful state that you can use as of now
}

```

### useAnimate

This hook gives you access to render loop (useful only if you set the frameloop option to "always" on Canvas component)

```
import {useAnimate} from "react-zdog-renderer"

function MyComponent() {

    const ref = useRef()

    useAnimate(() => {
        if(!ref.current) return

        ref.current.roatate.y += 0.03
    })

    return (
        <anchor ref={ref} >
            {children}
        </anchor>
    )
}
```

You can also pass the second argument, that is priority of callback you passed.

### useInvalidate

It returns the function that can be called to render the frame if you have set the frameloop to "never" (probably will call it "onDemand")

```
import { useEffect } from "react";
import { useZDog, useInvalidate } from "react-zdog-renderer";

const Rotate = () => {
  const illu = useZDog((state) => state.Illustration);

  const invalidate = useInvalidate();

  useEffect(() => {
    if (illu) {
      illu.onDragMove = () => {
        invalidate();
      };
    }
  }, [illu, invalidate]);

  return <></>;
};

```

Above Component will render teh frame only when user drags. This can be used as optimization since it will not run render loop unless you need it.
