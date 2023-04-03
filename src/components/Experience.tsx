import { Grid, OrbitControls, shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useRef } from "react";
import * as THREE from "three";
import Portal from "../shaders/portal/Portal";

type Props = {};

const Experience = (props: Props) => {
  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls />
      <Grid cellColor="white" args={[10, 10]} />
      <Portal />
    </>
  );
};

export default Experience;
