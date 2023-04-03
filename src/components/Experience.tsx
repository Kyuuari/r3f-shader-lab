import { Grid, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import React, { Suspense, useState } from "react";

type Props = {};

const Experience = (props: Props) => {
  const [component, setComponent] = useState("Portal");

  // Use Leva to create a control to switch between components
  useControls({
    component: {
      value: component,
      options: ["Portal", "Waves"],
      onChange: (value) => {
        setComponent(value);
      },
    },
  });

  const DynamicComponent = React.lazy(() =>
    component === "Portal"
      ? import("../shaders/portal/Portal")
      : import("../shaders/waves/Waves")
  );

  return (
    <>
      <Perf position={"top-left"} />
      <OrbitControls />
      <Grid cellColor="white" args={[10, 10]} />
      <Suspense fallback={null}>
        <DynamicComponent />
      </Suspense>
    </>
  );
};

export default Experience;
