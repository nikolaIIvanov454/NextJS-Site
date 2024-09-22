"use client";

import React from "react";

import { Rating } from "flowbite-react";

function StarsComponent() {
  return (
    <Rating>
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
    </Rating>
  );
}

export default StarsComponent