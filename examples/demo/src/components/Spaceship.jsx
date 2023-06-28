/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import Zdog from "zdog";
import { useAnimate } from "react-zdog-renderer";
import { TweenMax, Power0 } from "gsap/all";

const LOW = 2;
const HIGH = 8;
const DIAMETER = 70;
const SHIP_COLOR = "#fafafa";
const LENGTH = 150;
const RADIUS = 20;
const ROCKET_DIAMETER = DIAMETER * 0.75;

const randomInRange = (max, min) =>
  Math.floor(Math.random() * (max - min)) + min;

const main = {
  length: LENGTH,
  diameter: DIAMETER,
  rotate: {
    x: Zdog.TAU / 4,
  },
  stroke: false,
  color: SHIP_COLOR,
};

const fin = {
  addTo: main,
  color: "silver",
  stroke: 5,
  fill: true,
  path: [
    {
      z: 20,
      y: 0,
    },
    {
      y: DIAMETER * 0.5,
      z: -30,
    },
    {
      y: 0,
      z: -30,
    },
  ],
  translate: {
    z: -40,
    y: DIAMETER / 2,
  },
};

const screen = {
  width: DIAMETER,
  height: DIAMETER,
  color: "dodgerblue",
  quarters: 1,
  stroke: 10,
  translate: {
    z: 60,
    y: 5,
  },
  rotate: {
    z: Zdog.TAU / 2.65,
  },
};

const tip = {
  diameter: DIAMETER,
  color: "#333",
  translate: {
    x: 0,
    y: 0,
    z: LENGTH / 2,
  },
};

const bottomAnchor = {
  translate: {
    x: -RADIUS,
    y: 90,
    z: RADIUS,
  },
};

const bottom = {
  diameter: ROCKET_DIAMETER,
  length: LENGTH * 0.15,
  stroke: false,
  color: "#333",
  rotate: {
    x: Zdog.TAU / 4,
  },
};

const bottomCone = {
  diameter: ROCKET_DIAMETER,
  color: SHIP_COLOR,
  rotate: {
    x: Zdog.TAU / 4,
  },
  translate: {
    y: -DIAMETER * 0.15,
  },
};

const bottomJet = {
  diameter: ROCKET_DIAMETER * 0.5,
  stroke: 5,
  fill: true,
  color: "orange",
  rotate: {
    x: Zdog.TAU / 4,
  },
  translate: {
    y: 15,
  },
};

const wing = {
  stroke: 10,
  color: "silver",
  fill: true,
  translate: {
    z: DIAMETER / -2 - 5,
  },
  path: [
    {
      x: DIAMETER * 0.25,
      y: -60,
    },
    {
      x: DIAMETER * -0.25,
      y: -60,
    },
    {
      x: DIAMETER * -0.75,
      y: 20,
    },
    {
      x: -100,
      y: LENGTH / 2 - 10,
    },
    {
      x: 100,
      y: LENGTH / 2 - 10,
    },
    {
      x: DIAMETER * 0.75,
      y: 20,
    },
  ],
};

const spot = {
  diameter: 15,
  fill: true,
  stroke: 2,
  color: "#e74c3c",
  backface: "silver",
  translate: {
    x: 50,
    y: 50,
    z: 4,
  },
};

const Star = (props) => {
  const star = useRef();

  useEffect(() => {
    const animateStars = (starRef, reset) => {
      if (reset) {
        TweenMax.set(starRef.translate, { y: -window.innerHeight * 0.75 });
      }
      TweenMax.to(starRef.translate, randomInRange(LOW, HIGH), {
        y: window.innerHeight,
        onComplete: () => {
          animateStars(star.current, true);
        },
        ease: Power0.easeNone,
      });
    };
    animateStars(star.current, false);
  }, []);

  return (
    <>
      <shape ref={star} {...props} />
    </>
  );
};

const Stars = ({ count = 50 }) => {
  return (
    <>
      {new Array(count).fill().map((star, i) => {
        const props = {
          stroke: randomInRange(2, 10),
          color: `rgba(255, 255, 255, ${Math.random()})`,
          translate: {
            x: randomInRange(window.innerWidth * -0.5, window.innerWidth * 0.5),
            y: randomInRange(
              -window.innerHeight * 0.75,
              window.innerHeight * 0.5
            ),
            z: randomInRange(window.innerWidth * -0.5, window.innerWidth * 0.5),
          },
        };
        return <Star key={i} {...props} />;
      })}
    </>
  );
};

const Nozzle = (props) => {
  return (
    <anchor {...bottomAnchor} {...props}>
      <cylinder {...bottom}></cylinder>
      <hemisphere {...bottomCone}></hemisphere>
      <ellipse {...bottomJet}></ellipse>
    </anchor>
  );
};

const nozzlePosition = [
  { ...bottomAnchor.translate },
  {
    ...bottomAnchor.translate,
    x: RADIUS,
  },
  {
    ...bottomAnchor.translate,
    z: -RADIUS,
  },
  {
    ...bottomAnchor.translate,
    x: RADIUS,
    z: -RADIUS,
  },
];

const Spaceship = () => {
  const ship = useRef();

  useAnimate(() => {
    if (!ship.current) return;
    ship.current.rotate.y += 0.003;
  });

  return (
    <>
      <anchor ref={ship} translate={{ x: 300, y: 50 }}>
        <cylinder {...main}>
          <shape {...fin} />
          <ellipse {...screen} />
          <hemisphere {...tip} />
        </cylinder>
        {nozzlePosition.map((position, i) => {
          return <Nozzle key={i} translate={position} />;
        })}
        <shape {...wing}>
          <ellipse {...spot} />
        </shape>
      </anchor>
      <Stars count={200} />
    </>
  );
};

export default Spaceship;
