/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import "./App.css";
import { Canvas } from "react-zdog-renderer";
import Zdog from "zdog";
// import { Guy } from "./components/Guy";
// import { Guy2 } from "./components/Guy2";
// import { Lightsaber } from "./components/Lightsaber";
import Spaceship from "./components/Spaceship";
import { Heading } from "./components/Heading";

// const TAU = Zdog.TAU;

// const ZDOG = ({ type = "canvas" }) => {
//   return (
//     <>
//       <div
//         style={{
//           width: "100%",
//           height: "100vh",
//         }}
//       >
//         <Canvas
//           centered={true}
//           element={type}
//           background={"#D4EFDF"}
//           dragRotate={true}
//           zoom={2}
//           style={{
//             height: "100%",
//           }}
//         >
//           {/* <anchor>
//             <ellipse
//               diameter={20}
//               rotate={{ x: -TAU / 3 }}
//               translate={{ y: 15, z: -100, x: -50 }}
//               stroke={4}
//               color="#373740"
//               fill
//             />
//             <anchor translate={{ x: -50 }}>
//               <Guy />
//             </anchor>
//           </anchor>
//           <anchor rotate={{ x: -TAU / 9 }} translate={{ x: 50 }}>
//             <Guy2 />
//           </anchor>
//           <ellipse
//             diameter={20}
//             rotate={{ x: -TAU / 3 }}
//             translate={{ y: 15, z: -100, x: 50 }}
//             stroke={4}
//             color="#373740"
//             fill
//           /> */}
//           <Lightsaber />
//         </Canvas>
//       </div>
//     </>
//   );
// };

const Space = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <Canvas
          element={"svg"}
          background={"#141852"}
          // dragRotate={true}
          zoom={2}
          style={{
            height: "100%",
          }}
          rotate={{
            y: Zdog.TAU * 0.05,
            x: Zdog.TAU * 0.05,
          }}
        >
          <Spaceship />
        </Canvas>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <Heading />
      <Space />
    </>
  );
}

export default App;
