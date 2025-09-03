import React, { useEffect, useState } from "react";

const SendEmail = () => {
  const [data, setData] = useState();
  const [loginMessage, setLoginMessage] = useState();
  const [registerMessage, setRegisterMessage] = useState();
  useEffect(() => {
    fetch("http://127.0.0.1:5000/data")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(JSON.stringify(data));
      });
  }, []);

  function add() {
    fetch("http://127.0.0.1:5000/data", {
      method: "POST",
      body: JSON.stringify({
        email: "matii139@onet.pl",
        password: "lala123",
        username: "mati139",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        console.log(r.message);
      });
  }

  function update() {
    fetch("http://127.0.0.1:5000/data/mati139", {
      method: "POST",
      body: JSON.stringify({
        hh: "1111",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        console.log(r.message);
      });
  }

  function register() {
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      body: JSON.stringify({
        email: "mateuszrajczyk96@gmail.com",
        password: "Babunia155!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setLoginMessage("");
        setRegisterMessage(r.message);
      });
  }

  function login() {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email: "mateuszrajczyk96@gmail.com",
        password: "Bab",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setRegisterMessage("");
        setLoginMessage(r.message);
      });
  }

  return (
    <div>
      <button className="text-white" onClick={add}>
        Add data
      </button>
      <button className="text-white" onClick={update}>
        Update data
      </button>
      <button className="text-white" onClick={login}>
        Login
      </button>
      <button className="text-white" onClick={register}>
        Register
      </button>

      <div className="text-white">{data}</div>
      <div className="text-white">{loginMessage}</div>
      <div className="text-white">{registerMessage}</div>
    </div>
  );
};

export default SendEmail;
