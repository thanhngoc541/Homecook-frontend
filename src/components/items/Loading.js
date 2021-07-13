import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <section>
      <h1>Loading</h1>
      <Spinner color="success" />
    </section>
  );
}

export default Loading;
