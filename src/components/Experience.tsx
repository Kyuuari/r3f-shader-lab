import { Grid, OrbitControls } from "@react-three/drei";
import { useControls, button, folder } from "leva";
import { Perf } from "r3f-perf";
import React, { Suspense, useRef, useState } from "react";
import Portal from "../shaders/portal/Portal";
import Waves from "../shaders/waves/Waves";
import { useFrame, useThree } from "@react-three/fiber";
import Blob from "../shaders/blobs/Blob";
import Gradient from "../shaders/gradient/Gradient";
import Particles from "../shaders/particles/Particles";
import LavaLamp from "../shaders/lavalamp/LavaLamp";

type Props = {};

const Experience = (props: Props) => {
  const [component, setComponent] = useState("Gradient");
  const gl = useThree((state) => state.gl);

  // Use Leva to create a control to switch between components
  const generalControls = useControls("General", {
    component: {
      value: component,
      options: ["Portal", "Waves", "Blob", "Gradient", "LavaLamp"],
      onChange: (value) => {
        setComponent(value);
      },
    },
    enablePerf: false,
    enableGrid: true,
  });

  //Grid Controls
  // const gridControls = useControls("Grid", {});

  //Screenshots
  const screenShotControls = useControls("Screenshots", {
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
  });

  //Camera Controls
  const [cameraControls, set] = useControls("Camera", () => ({
    cameraPosition: [0, 0, 2],
    cameraRotation: [0, 0, 0],
    useOrbitControls: true, // Add a boolean control to toggle between modes
    resetCameraControls: button(() => {
      camera.position.set(0, 0, -2);
      camera.rotation.set(0, 0, 0);
      set({
        cameraPosition: [0, 0, 2],
        cameraRotation: [0, 0, 0],
      });
    }),
  }));

  const { camera } = useThree();

  // Create a ref for the camera position and rotation
  const cameraRef = useRef<any>();

  // Update camera position and rotation
  useFrame(() => {
    if (cameraControls.useOrbitControls === false) {
      camera.position.set(...cameraControls.cameraPosition);
      camera.rotation.set(...cameraControls.cameraRotation);
    }
  });

  return (
    <>
      {generalControls.enablePerf && <Perf position={"top-left"} />}
      {cameraControls.useOrbitControls ? (
        <OrbitControls ref={cameraRef} />
      ) : (
        <group>
          <perspectiveCamera
            position={cameraControls.cameraPosition}
            rotation={cameraControls.cameraRotation}
          />
        </group>
      )}

      {generalControls.enableGrid && <Grid cellColor="white" args={[10, 10]} />}
      <>
        {component === "Portal" ? <Portal /> : null}
        {component === "Waves" ? <Waves /> : null}
        {component === "Blob" ? <Blob /> : null}
        {component === "Gradient" ? <Gradient /> : null}
        {component === "LavaLamp" ? <LavaLamp /> : null}
        {/* {component === "Particles" ? <Particles /> : null} */}
      </>
    </>
  );
};

export default Experience;
