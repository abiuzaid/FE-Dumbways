import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = (props) => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const OnChangeHandler = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const Navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // 1. PAnggil backend login
      const results = await axios.post("http://localhost:5000/api/v1/login", {
        email: formLogin.email,
        password: formLogin.password,
      });
      localStorage.setItem("loginUser", JSON.stringify(results.data.data));

      // 3. di cek apakah dia admin atau user
      if (results.data.data.email === "admin@mail.com") {
        Navigate("/admin-dashboard");
      } else {
        Navigate("/");
      }
      window.location.reload();

      // 4. user : ke tampilan awal

      // 5. admin: dashboard admin
    } catch (error) {
      console.log("Error Dari Modal login", error);
    }

    // console.log(formLogin);

    // const dataUsers = JSON.parse(localStorage.getItem("users"));
    // console.log(dataUsers);

    // const userFind = dataUsers.find((user) => user.email === formLogin.email && formLogin.password === user.password);

    // if (userFind === undefined) {
    //   return;
    // }

    // console.log(userFind);

    // localStorage.setItem("loginUser", JSON.stringify(userFind));
    // props.onHide();
    // if (userFind.email === "admin@gmail.com") {
    //   Navigate("/admin-dashboard");
    // } else {
    //   Navigate("/");
    // }
    // window.location.reload();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="px-5 pb-3">
          <p
            className="fs-3 fw-bold"
            style={{ color: "#613D2B", paddingTop: 45 }}
          >
            Login
          </p>
          <Form className="mt-4" onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="p-2 mb-3"
                onChange={OnChangeHandler}
                name="email"
                type="email"
                placeholder="Email"
                style={{
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
              <Form.Control
                type="password"
                onChange={OnChangeHandler}
                name="password"
                placeholder="Password"
                style={{
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="fw-bold border-0 w-100 py-2 mt-3"
              style={{ backgroundColor: "#613D2B" }}
            >
              Login
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account ? Klik{" "}
            <span
              onClick={props.onClick}
              className="fw-bold"
              style={{ cursor: "pointer" }}
            >
              Here
            </span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Login;
