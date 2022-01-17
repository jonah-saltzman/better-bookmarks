import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate()
  navigate('/')
  return (
    <></>
  );
};

export default PageNotFound;
