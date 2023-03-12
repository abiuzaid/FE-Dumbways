import IcDelete from "../assets/image/iconDelete.png";
import IcPlus from "../assets/image/+.png";
import IcMin from "../assets/image/-.png";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [getCart, setGetCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const payCart = async (Transaction) => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    const results = await axios.post(
      "http://localhost:5000/api/v1/transaction",
      undefined,
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    );
    console.log(results);
    fetchCart();
  };
  const plusProduct = async (product) => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    // panggil backend
    const results = await axios.post(
      "http://localhost:5000/api/v1/cart/" + product.id,
      { order_quantity: 1 },
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    );

    console.log(results);

    fetchCart();
  };
  const minProduct = async (product) => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    // panggil backend
    const results = await axios.delete(
      "http://localhost:5000/api/v1/cart/" + product.cartIds[0],
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    );

    console.log(results);

    fetchCart();
  };
  const deleteCart = async (id) => {
    const data = getCart.find((item) => item.id === id);
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});

    await Promise.all(
      data.cartIds.map((item) =>
        axios.delete("http://localhost:5000/api/v1/cart/" + item, {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        })
      )
    );
    fetchCart();
  };

  const fetchCart = async () => {
    const userData = JSON.parse(localStorage.getItem("loginUser") ?? {});
    try {
      // Panggil data ke backend dengan token dari login
      const results = await axios.get("http://localhost:5000/api/v1/cart", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      });

      // mapping data agar sesuai dengan bentuk mapping pada frontend
      const mappedData = results.data.data.reduce(
        (accumulation = [], currentValue) => {
          const checkIndex = accumulation.findIndex(
            (item) => item.id === currentValue.product_id
          );

          // If already inside acc
          if (checkIndex === -1) {
            accumulation.push({
              cartIds: [currentValue.id],
              id: currentValue.product_id,
              name: currentValue.product.name,
              photo: currentValue.product.photo,
              price: currentValue.product.price,
              qty: currentValue.order_quantity,
            });
            return accumulation;
          } else {
            return [
              ...accumulation.slice(0, checkIndex),
              {
                ...accumulation[checkIndex],
                qty: accumulation[checkIndex].qty + currentValue.order_quantity,
                cartIds: [...accumulation[checkIndex].cartIds, currentValue.id],
              },
              ...accumulation.slice(checkIndex + 1),
            ];
          }
        },
        []
      );

      const subTotal = mappedData.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );

      const totalQty = mappedData.reduce((acc, curr) => acc + curr.qty, 0);
      setGetCart(mappedData);
      setTotalQty(totalQty);
      setTotalPrice(subTotal);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "No record found") {
        setGetCart([]);
        setTotalQty(0);
        setTotalPrice(0);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Container>
        <Row className="custom-margin-top mx-5 responsive-margin-x">
          <h1 className="px-0 product-title">My Cart</h1>
          <p className="px-0 font-size-18px custom-text-primary">
            Review Your Order
          </p>
          <Row className="justify-content-between align-items-start px-0">
            <Col xs={12} lg={7}>
              {getCart.map((item) => (
                <Col
                  xs={12}
                  className="py-4 px-0 mb-4 animate__animated animate__slideInLeft"
                  style={{
                    borderTop: "1px solid #613D2B",
                    borderBottom: "1px solid #613D2B",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap align-items-center">
                      <img
                        src={`http://localhost:5000/uploads/${item.photo}`}
                        alt={item.name}
                        className="me-3"
                        style={{ width: "7.5rem" }}
                      />
                      <div className="">
                        <h3 className="product-title font-size-18px mb-4">
                          {" "}
                          {item.name}{" "}
                        </h3>
                        <div className="d-flex align-items-center">
                          <img
                            src={IcMin}
                            onClick={() => minProduct(item)}
                            alt="Decrease Button"
                            style={{ cursor: "pointer" }}
                          />
                          <span
                            className="font-size-18px custom-text-primar px-3 mx-3 rounded"
                            style={{ backgroundColor: "#F6E6DA" }}
                          >
                            {item.qty}
                          </span>
                          <img
                            src={IcPlus}
                            onClick={() => plusProduct(item)}
                            alt="Increase Button"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="product-details font-size-18px mb-4">
                        Rp. {item.price}{" "}
                      </div>
                      <div className="text-end">
                        <img
                          src={IcDelete}
                          alt="Delete Order"
                          onClick={() => deleteCart(item.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Col>
            <Col
              xs={12}
              lg={4}
              className="py-4 px-0 ms-2 animate__animated animate__slideInRight"
              style={{ borderTop: "1px solid #613D2B" }}
            >
              <div className="d-flex justify-content-between mb-4 font-size-18px">
                <div className="product-details"> Subtotal </div>
                <div className="product-details"> Rp. {totalPrice} </div>
              </div>
              <div
                className="d-flex justify-content-between pb-4 font-size-18px"
                style={{ borderBottom: "1px solid #613D2B" }}
              >
                <div className="product-details">Qty</div>
                <div className="product-details"> {totalQty} </div>
              </div>
              <div className="d-flex justify-content-between mt-4 font-size-18px">
                <div className="product-details fw-bold">Total</div>
                <div className="product-details fw-bold">Rp. {totalPrice}</div>
              </div>
              <div className="d-flex justify-content-end mt-5">
                <Button
                  variant="primary"
                  onClick={() => payCart()}
                  size="lg"
                  className="custom-btn-primary fw-bold font-size-18px w-75"
                >
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
