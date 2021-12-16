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
      console.log([data.users]);

      setdata(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {mydata.map((val, index) => {
        const { id, profileVideo } = val;
        console.log(profileVideo);

        return (
          <>
            <div className="list" key={index}>
              <ul>
                <li>
                  <a href={profileVideo} target="_blank">
                    {profileVideo}
                  </a>
                </li>
              </ul>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Upload;
