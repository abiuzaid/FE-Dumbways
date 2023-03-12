import React from "react";

import { useState } from "react";

import Tmb from "../assets/image/Thumbnail.png";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [imageUrl, setImageUrl] = useState("/image/product-placeholder.webp");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const handleFileOnChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setAddProduct({
      ...addProduct,
      photo: e.target.files[0],
    });
  };

  const [addProduct, setAddProduct] = useState({
    id: new Date().getTime(),
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: "",
  });

  const onChangeHandler = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    e.preventDefault();

    const requestBody = new FormData()
    requestBody.append('name', addProduct.name)
    requestBody.append('price', addProduct.price)
    requestBody.append('description', addProduct.description)
    requestBody.append('stock', addProduct.stock)
    requestBody.append('photo', addProduct.photo)

    const results = await axios.post(
      "http://localhost:5000/api/v1/product", 
      requestBody, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      navigate("/list-product")

    // const newProduct = {
    //   ...addProduct,
    //   id: new Date().getTime(),
    //   photo: imageUrl,
    // };

    // const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));

    // if (dataProduct === null) {
    //   localStorage.setItem("dataProduct", JSON.stringify([newProduct]));
    // } else {
    //   dataProduct.push(newProduct);
    //   localStorage.setItem("dataProduct", JSON.stringify(dataProduct));
    // }
    // navigate("/list-product");
  };

  return (
    <div>
      <div className="container d-flex justify-content-around align-items-center my-5" style={{ marginTop: 46 }}>
        <div style={{ width: 472 }}>
          <p className="fw-bold fs-3" style={{ color: "#613D2B", marginBottom: 31 }}>
            Add Product
          </p>

          <form onSubmit={onSubmitHandler}>
            <div class="mb-3">
              <input
                type="text"
                className="form-control p-2"
                name="name"
                placeholder="Name"
                onChange={onChangeHandler}
                id="name"
                style={{
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
            </div>

            <div class="mb-3">
              <input
                type="number"
                className="form-control p-2"
                name="stok"
                placeholder="Stok"
                onChange={onChangeHandler}
                id="stok"
                style={{
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
            </div>

            <div class="mb-3">
              <input
                type="number"
                className="form-control p-2"
                name="price"
                placeholder="Price"
                onChange={onChangeHandler}
                id="price"
                style={{
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
              />
            </div>

            <div class="mb-3">
              <textarea
                className="form-control p-2"
                name="description"
                placeholder="Description Product"
                onChange={onChangeHandler}
                id="description"
                style={{ height: 150, resize: "none", textColor: "#613D2B", backgroundColor: "rgba(97, 61, 43, 0.25)", border: "2px solid #613D2B" }}
              ></textarea>
            </div>

            <Form.Group
              controlId="formFile"
              className=""
              style={{
                textColor: "#613D2B",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
                borderRadius: 5,
                width: 190,
                height: 50,
              }}
            >
              <Form.Label className="d-flex">
                <div className="d-flex justify-content-between align-text-center">
                  <Form.Control name="photo" type="file" hidden placeholder="Photo Product" cursor="pointer" onChange={handleFileOnChange} />
                  <p className="m-0 mt-2 ms-2" style={{ color: "grey" }}>
                    Photo Product
                  </p>
                </div>
                <div className="d-flex ms-4 mt-2">
                  <img src={Tmb} alt="" />
                </div>
              </Form.Label>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="outline-light"
                className="btn"
                style={{
                  backgroundColor: "#613D2B",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  width: 260,
                  height: 40,
                  marginTop: 66,
                }}
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
        <div style={{ width: 436, height: 555 }}>
          <img src={imageUrl} style={{ width: "100%" }} alt="imageadmin" />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
