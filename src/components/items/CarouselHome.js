import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "/assests/images/banner1.png",
    key: "1",
  },
  {
    src: "/assests/images/banner2.png",
    key: "2",
  },
  {
    src: "/assests/images/banner3.png",
    key: "3",
  },
];

const CarouselHome = () => <UncontrolledCarousel items={items} />;

export default CarouselHome;
