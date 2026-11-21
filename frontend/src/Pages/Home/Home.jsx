import React, { useState } from "react";
import Banner from "./Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { decrement, decrementByAmount, increment, incrementByAmount } from "../../Redux/Features/counterSlice";


const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [num, setNum] = useState(5);

  return (
    <div className="">
      <Banner
        imageFit="cover"
        autoplayDelay={2000}
        height="clamp(250px, 68vh, 760px)"
      />
      
    </div>
  );
};

export default Home;
