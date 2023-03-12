import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Tmb from "../assets/image/Thumbnail.png";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id);
  const [imageUrl, setImageUrl] = useState("/image/product-placeholder.webp");

  const [addProduct, setAddProduct] = useState({
    name: "",
    stok: "",
    price: "",
    description: "",
    photo: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setAddProduct({ ...addProduct, photo: file });
  };

  const fetchProduct = async () => {
    const results = await axios.get(
      "http://localhost:5000/api/v1/product/" + id
    );
    setAddProduct({
      name: results.data.data.name,
      stok: results.data.data.stock,
      price: results.data.data.price,
      description: results.data.data.description,
      photo: results.data.data.photo,
    });

    setImageUrl("http://localhost:5000/uploads/" + results.data.data.photo);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const onChangeHandler = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    e.preventDefault();

    const requestBody = new FormData();
    requestBody.append("name", addProduct.name);
    requestBody.append("price", addProduct.price);
    requestBody.append("description", addProduct.description);
    requestBody.append("stock", addProduct.stok);
    requestBody.append("photo", addProduct.photo);

    // Send data to backend

    const results = await axios.patch(
      "http://localhost:5000/api/v1/product/" + id,
      requestBody,
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    );

    // Navigate Ke List Product
    navigate("/list-product");
    // const dataProduct = JSON.parse(localStorage.getItem("dataProduct"));

    // const indexProduct = dataProduct.findIndex((item) => item.id === id);
    // dataProduct[indexProduct] = addProduct;
    // localStorage.setItem("dataProduct", JSON.stringify(dataProduct));
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-around align-items-center my-5"
        style={{ marginTop: 46 }}
      >
        <div style={{ width: 472 }}>
          <p
            className="fw-bold fs-3"
            style={{ color: "#613D2B", marginBottom: 31 }}
          >
            Add Product
          </p>

          <form onSubmit={onSubmitHandler}>
            <div class="mb-3">
              <input
                type="text"
                className="form-control p-2"
                name="name"
                placeholder="Name"
                value={addProduct.name}
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
                value={addProduct.stok}
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
                value={addProduct.price}
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
                value={addProduct.description}
                onChange={onChangeHandler}
                id="description"
                style={{
                  height: 150,
                  resize: "none",
                  textColor: "#613D2B",
                  backgroundColor: "rgba(97, 61, 43, 0.25)",
                  border: "2px solid #613D2B",
                }}
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
                  <Form.Control
                    name="photo"
                    type="file"
                    hidden
                    placeholder="Photo Product"
                    cursor="pointer"
                    onChange={handleImageUpload}
                  />
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
                Update Product
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

export default UpdateProduct;
