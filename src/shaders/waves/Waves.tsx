import React, { useMemo, useRef } from "react";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";
import { Mesh, ShaderMaterial } from "three";
import { useControls } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {};

const Waves = (props: Props) => {
  const materialRef = useRef<Mesh>(null!);
  const controls = useControls("Waves", {
    colorA: "#d5369b",
    colorB: "#f8b7b7",
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new THREE.Color(controls.colorA) },
      u_colorB: { value: new THREE.Color(controls.colorB) },
    }),
    []
  );

  useFrame((state, delta) => {
    // Update time uniform
    if (materialRef.current) {
      // Cast the material as ShaderMaterial to access the uniforms property
      (materialRef.current.material as ShaderMaterial).uniforms.u_time.value +=
        delta;
    }

    // Update color uniforms
    uniforms.u_colorA.value.set(controls.colorA);
    uniforms.u_colorB.value.set(controls.colorB);
  });

  return (
    <mesh
      ref={materialRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Waves;
