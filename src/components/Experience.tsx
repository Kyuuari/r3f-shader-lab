import { Grid, OrbitControls } from "@react-three/drei";
import { useControls, button, folder } from "leva";
import { Perf } from "r3f-perf";
import React, { Suspense, useState } from "react";
import Portal from "../shaders/portal/Portal";
import Waves from "../shaders/waves/Waves";
import { useFrame, useThree } from "@react-three/fiber";

type Props = {};

const Experience = (props: Props) => {
  const [component, setComponent] = useState("Portal");
  const gl = useThree((state) => state.gl);

  // Use Leva to create a control to switch between components
  const generalControls = useControls("General", {
    component: {
      value: component,
      options: ["Portal", "Waves"],
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
  const cameraControls = useControls("Camera", {
    cameraPosition: [0, 0, 2],
    cameraRotation: [0, 0, 0],
    useOrbitControls: true, // Add a boolean control to toggle between modes
  });

  const { camera } = useThree();

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
        <OrbitControls />
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
      </>
    </>
  );
};

export default Experience;
