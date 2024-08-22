"use client";

import useWindowSize from "@/hooks/useWindowSize";
import Confetti from "react-confetti";

const AllPassConfetti = () => {
  const size = useWindowSize();

  return <Confetti recycle={false} {...size} />;
};

export default AllPassConfetti;
