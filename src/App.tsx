import { useState } from "react";
import "./App.css";
import Experience from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import Overlay, { OverlayDark, OverlayLight } from "./components/Overlay";
import { useControls } from "leva";

function App() {
  const controls = useControls({
    backgroundColor: "#1f1f1f",
  });

  return (
    <>
      <Overlay />
      <Canvas
        style={{ background: controls.backgroundColor }}
        camera={{ position: [3, 3, 3] }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
