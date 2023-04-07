import React, { useRef } from "react";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

type Props = {};

// |Template Only|----------------------------------------------------------------
// Copy | Reuse | Rename|

const template = (props: Props) => {
  const materialRef = useRef<ShaderMaterial>(null!);

  //Leva controls
  //   const controls = useControls("Portal", {
  //     colorStart: "#6ca7ff",
  //     colorEnd: "#aebcff",
  //   });

  // |Sample Uniform component uncomment to use in shader|
  //   const uniforms = useMemo(
  //     () => ({
  //       uTime: { value: 0 },
  //       uColorStart: { value: new THREE.Color(controls.colorStart) },
  //       uColorEnd: { value: new THREE.Color(controls.colorEnd) },
  //     }),
  //     []
  //   );

  // |useFrame used for updates during render cycles, use with uniform time and deltas|
  //   useFrame((state, delta) => {
  //     // Update time uniform
  //     if (materialRef.current) {
  //       materialRef.current.uniforms.uTime.value += delta;
  //     }
  //     // Update color uniforms
  //     uniforms.uColorStart.value.set(controls.colorStart);
  //     uniforms.uColorEnd.value.set(controls.colorEnd);
  //   });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        // uniforms={uniforms}
      />
    </mesh>
  );
};

export default template;
