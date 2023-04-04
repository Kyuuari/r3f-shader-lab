import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { MathUtils, Mesh } from "three";
import vertexShader from "./vertex.glsl";
// import fragmentShader from "../portal/fragment.glsl";
import fragmentShader from "./fragment.glsl";

type Props = {};

const Blob = (props: Props) => {
  const meshRef = useRef<Mesh>(null!);
  const hover = useRef(false);
  const controls = useControls("Blob", {
    colorStart: "#6ca7ff",
    colorEnd: "#aebcff",
  });

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
      uColorStart: { value: new THREE.Color(controls.colorStart) },
      uColorEnd: { value: new THREE.Color(controls.colorEnd) },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
      0.4 * clock.getElapsedTime();

    (
      meshRef.current.material as THREE.ShaderMaterial
    ).uniforms.u_intensity.value = MathUtils.lerp(
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_intensity
        .value,
      hover.current ? 0.85 : 0.15,
      0.02
    );

    // // Update time uniform
    // if (materialRef.current) {
    //   materialRef.current.uniforms.uTime.value += delta;
    // }
    // Update color uniforms
    uniforms.uColorStart.value.set(controls.colorStart);
    uniforms.uColorEnd.value.set(controls.colorEnd);
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={0.3}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default Blob;
