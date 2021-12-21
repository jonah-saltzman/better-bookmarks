import React from "react";
import { Redirect } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Redirect to='/'></Redirect>
  );
};

//FIXME: missing keywords
export default PageNotFound;
