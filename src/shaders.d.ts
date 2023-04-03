import { MaterialNode } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import portalVertexShader from "../src/shaders/portal/vertex.glsl";
import portalFragmentShader from "../src/shaders/portal/fragment.glsl"

declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: MaterialNode<PortalMaterial, typeof PortalMaterial>;
  }
}

class PortalMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_time: { value: 0 },
        u_colorStart: { value: new THREE.Color("#ffffff") },
        u_colorEnd: { value: new THREE.Color("#000000") },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    });
  }
}

export { PortalMaterial };
