import React from "react";
import { Container, Table } from "react-bootstrap";

const getProduct = JSON.parse(localStorage.getItem("Transaction")) || []

function ListProduct() {
  return (
    <Container>
      <h1 className="custom-margin-top product-title font-size-36px mb-5">Income Transaction</h1>
      <Table responsive bordered hover className="mx-auto animate__animated animate__fadeIn">
        <thead style={{ backgroundColor: "#E5E5E5" }}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {getProduct.map((item, index) => (
          <tr key={item.id}>
            <td> {index + 1} </td>
            <td> {item.fullName} </td>
            <td> {item.email} </td>
            <td style={{ color:"#FF9900" }}> {item.status} </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProduct;
