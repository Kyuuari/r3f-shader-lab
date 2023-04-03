import React, { useRef } from "react";
import * as THREE from "three";
import portalVertexShader from "./vertex.glsl";
import portalFragmentShader from "./fragment.glsl";
import { ShaderMaterial } from "three";
import { MaterialNode, extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { PortalMaterial } from "../../shaders";

// class PortalMaterial extends ShaderMaterial {
//   constructor() {
//     super({
//       uniforms: {
//         u_time: { value: 0 },
//         u_colorStart: { value: new THREE.Color("#ffffff") },
//         u_colorEnd: { value: new THREE.Color("#000000") },
//       },
//       vertexShader: portalVertexShader,
//       fragmentShader: portalFragmentShader,
//     });
//   }
// }
// extend({ PortalMaterial });

// // Add types to ThreeElements elements so primitives pick up on it
// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     portalMaterial: MaterialNode<PortalMaterial, typeof PortalMaterial>;
//   }
// }

type Props = {};

const Portal = (props: Props) => {
  const portalMaterial = useRef<PortalMaterial>(null!);
  useFrame((state, delta) => {
    portalMaterial.current.uniforms.uTime.value += delta;
  });
  const { scale } = useControls({ scale: -2 });
  return (
    <mesh scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <portalMaterial ref={portalMaterial} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default Portal;
