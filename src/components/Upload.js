import React, { useState, useEffect } from "react";

const Upload = () => {
  const [mydata, setdata] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setdata(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div></div>;
};

export default Upload;
