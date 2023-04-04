import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { Vector2, Color, Mesh, ShaderMaterial } from "three";
import * as THREE from "three";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { useControls } from "leva";

const Gradient = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null!);
  const mousePosition = useRef({ x: 0, y: 0 });

  const controls = useControls("Gradient", {
    colorA: "#ff5858",
    colorB: "#7683d5",
    colorC: "#e55eff",
  });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_colorA: { value: new Color(controls.colorA) },
      u_colorB: { value: new Color(controls.colorB) },
      u_colorC: { value: new Color(controls.colorC) },
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    (mesh.current.material as ShaderMaterial).uniforms.u_time.value =
      clock.getElapsedTime();
    (mesh.current.material as ShaderMaterial).uniforms.u_mouse.value =
      new Vector2(mousePosition.current.x, mousePosition.current.y);

    // Update color uniforms
    uniforms.u_colorA.value.set(controls.colorA);
    uniforms.u_colorB.value.set(controls.colorB);
    uniforms.u_colorC.value.set(controls.colorC);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Gradient;
