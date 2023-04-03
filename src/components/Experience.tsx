import { Grid, OrbitControls, shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useRef, useState } from "react";
import Portal from "../shaders/portal/Portal";
import Waves from "../shaders/waves/Waves";

type Props = {};

const Experience = (props: Props) => {
  const [component, setComponent] = useState("Portal");

  // Use Leva to create a control to switch between components
  useControls({
    component: {
      value: component,
      options: ["Portal", "Waves"],
      onChange: (value) => {
        setComponent(value);
      },
    },
  });
  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls />
      <Grid cellColor="white" args={[10, 10]} />
      <>
        {component === "Portal" ? <Portal /> : null}
        {component === "Waves" ? <Waves /> : null}
      </>
    </>
  );
};

export default Experience;
