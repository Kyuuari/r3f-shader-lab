import React, { useMemo, useRef } from "react";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

type Props = {};

const Portal = (props: Props) => {
  const materialRef = useRef<ShaderMaterial>(null!);
  const controls = useControls({
    colorStart: "#d5369b",
    colorEnd: "#f8b7b7",
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorStart: { value: new THREE.Color(controls.colorStart) },
      uColorEnd: { value: new THREE.Color(controls.colorEnd) },
    }),
    []
  );

  useFrame((state, delta) => {
    // Update time uniform
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    // Update color uniforms
    uniforms.uColorStart.value.set(controls.colorStart);
    uniforms.uColorEnd.value.set(controls.colorEnd);
  });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Portal;
