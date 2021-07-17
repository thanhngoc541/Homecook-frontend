import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <section className="bg-grey">
      <Spinner color="success" />
    </section>
  );
}

export default Loading;
