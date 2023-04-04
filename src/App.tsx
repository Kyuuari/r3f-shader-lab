import { useState } from "react";
import "./App.css";
import Experience from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import Overlay, { OverlayDark, OverlayLight } from "./components/Overlay";
import { useControls } from "leva";

function App() {
  const controls = useControls({
    backgroundColor: "#ffffff",
  });

  return (
    <>
      <Overlay />
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        // style={{ background: controls.backgroundColor }}
        camera={{ position: [0, 0, -2] }}
      >
        <color attach="background" args={[controls.backgroundColor]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
