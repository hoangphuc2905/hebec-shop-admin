import { Button } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({ title = "" }) => {
  const navigation = useNavigate();

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <Button type="primary">Test button</Button>
    </>
  );
};
