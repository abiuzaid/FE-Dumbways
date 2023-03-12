import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListProduct() {
  const [listProduct, setListProduct] = useState([]);

  const panggilDataProduct = async () => {
    // Panggil Data Backend
    const results = await axios.get("http://localhost:5000/api/v1/product");

    setListProduct(results.data.data);
  };

  useEffect(() => {
    panggilDataProduct();
  }, []);
  //   const getProduct = JSON.parse(localStorage.getItem("dataProduct"));

  //   setListProduct(getProduct);
  // }
  // useEffect(() => {
  //   getListProduct();
  // }, []);

  const deleteProduct = async (id) => {
    // const newList = listProduct.filter((item) => item.id !== id);
    // localStorage.setItem("dataProduct", JSON.stringify(newList));
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    const results = await axios.delete(
      "http://localhost:5000/api/v1/product/" + id,
      {
        headers: {
          Authorization: "Bearer " + userData.toket,
        },
      }
    );
    panggilDataProduct();
  };

  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="custom-margin-top product-title font-size-36px mb-5">
        List Product
      </h1>
      <Table
        responsive
        bordered
        hover
        className="mx-auto w-100 animate__animated animate__fadeIn"
      >
        <thead style={{ backgroundColor: "#E5E5E5" }}>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${item.photo}`}
                  alt={item.name}
                  style={{ width: "25px" }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td style={{ width: "15rem" }}>
                <Button
                  onClick={() => deleteProduct(item.id)}
                  variant="danger"
                  className="py-0 me-2 button-delete mb-2"
                  style={{ width: "48%" }}
                >
                  delete
                </Button>
                <Button
                  onClick={() => navigate(`/update-product/${item.id}`)}
                  variant="success"
                  className="py-0 button-update mb-2"
                  style={{ width: "48%" }}
                >
                  update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProduct;
