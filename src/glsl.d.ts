declare module '*.glsl' {
  const value: string;
  export default value;
}

// // Add types to ThreeElements elements so primitives pick up on it
// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     portalMaterial: MaterialNode<PortalMaterial, typeof PortalMaterial>;
//   }
// }