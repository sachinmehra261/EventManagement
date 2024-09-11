import React, { useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Section from "../section/Section";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { ValueContext } from "../context/Context";

function Home() {
  const{isLoading,setIsLoading} = useContext(ValueContext)
  localStorage.removeItem("eventData");

  return (
    <>
    {isLoading ? <Loader/> : null}
      <Navbar />
      <Section />
    </>
  );
}

export default Home;
