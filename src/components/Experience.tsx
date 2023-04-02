import { Grid, OrbitControls, shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { useRef } from "react";
import * as THREE from "three";
import portalVertexShader from "../shaders/portal/vertex.glsl";
import portalFragmentShader from "../shaders/portal/fragment.glsl";
import { ShaderMaterial } from "three";

class PortalMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color("#ffffff") },
        uColorEnd: { value: new THREE.Color("#000000") },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    });
  }
}
extend({ PortalMaterial });

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: MaterialNode<PortalMaterial, typeof PortalMaterial>;
  }
}

type Props = {};

const Experience = (props: Props) => {
  console.log(portalVertexShader);
  const { scale } = useControls({ scale: -2 });

  const portalMaterial = useRef<PortalMaterial>(null!);
  console.log(portalMaterial);

  useFrame((state, delta) => {
    portalMaterial.current.uniforms.uTime.value += delta;
  });

  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls />
      <Grid cellColor="white" args={[10, 10]} />
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshBasicMaterial /> */}
        <portalMaterial ref={portalMaterial} />
      </mesh>
    </>
  );
};

export default Experience;
