import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  return (
    <></>
  );
};

export default PageNotFound;
