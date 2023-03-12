// import DataProduct from "../assets/data/data.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Products() {
  const params = useParams();
  const id = parseInt(params.id);

  const [findProduct, setFindProduct] = useState({
    photo: "",
    name: "",
    stock: "",
    description: "",
    price: "",
  });

  // const getProduct = JSON.parse(localStorage.getItem("dataProduct"));
  // const findProduct = getProduct.find((product) => product.id === id);

  const panggilData = async () => {
    // Panggil Data dari backend
    const results = await axios.get(
      "http://localhost:5000/api/v1/product/" + id
    );
    setFindProduct({
      photo: results.data.data.photo,
      name: results.data.data.name,
      stock: results.data.data.stock,
      description: results.data.data.description,
      price: results.data.data.price,
    });
    console.log("results", results);

    // ubah data find Product sesuai dengan data dari backend
  };

  useEffect(() => {
    panggilData();
  }, []);

  const handleCart = async () => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});

    // panggil backend
    const results = await axios.post(
      "http://localhost:5000/api/v1/cart/" + id,
      { order_quantity: 1 },
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    );

    // handle add cart
    const dataCart = JSON.parse(localStorage.getItem("dataCart")) || [];
    const newProduct = {
      id: findProduct.id,
      name: findProduct.name,

      price: findProduct.price,
      photo: findProduct.photo,
      qty: 1,
    };

    const indexCart = dataCart.findIndex((item) => item.id === id);
    if (indexCart === -1) {
      dataCart.push(newProduct);
    } else {
      dataCart[indexCart].qty = dataCart[indexCart].qty + 1;
    }
    localStorage.setItem("dataCart", JSON.stringify(dataCart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center mb-5"
        style={{ marginTop: 92, padding: "0 100px" }}
      >
        <div className="left-content">
          <div className="img-wrapper" style={{ width: 436, height: 555 }}>
            <img
              src={`http://localhost:5000/uploads/${findProduct.photo}`}
              alt="imgproduct"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="ms-5 right-content">
          <div className="right-wrapper">
            <h1 className="fw-bold" style={{ color: "#613D2B", marginTop: 0 }}>
              {findProduct.name}
            </h1>
            <p style={{ color: "#974A4A", fontSize: 18 }}>
              Stock: {findProduct.stock}
            </p>
            <p className="mt-5" style={{ textAlign: "justify", fontSize: 18 }}>
              {findProduct.description}
            </p>
            <p
              className="my-4 text-end"
              style={{ color: "#974A4A", fontWeight: 900, fontSize: 24 }}
            >
              Rp. {findProduct.price}
            </p>
          </div>
          <Button
            type="submit"
            onClick={handleCart}
            className="rounded-3 fw-bold border-0 py-2 w-100 mt-3 text-white"
            style={{ backgroundColor: "#613D2B" }}
          >
            Add Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default Products;
