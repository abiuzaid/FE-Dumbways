import React from "react";
import LogoBrand from "../assets/image/LogoBrand.png";

import DataProduct from "../assets/data/data.json";



function Transaction() {
  return (
    <div className="card-wrapper">
      <h3 className="fw-bold" style={{ color: "#613D2B", marginBottom: 26 }}>
        My Transaction
      </h3>
      {DataProduct.map((item, index) => (
      <div key={item.id} className="d-flex align-items-center justify-content-between mb-2 p-4" style={{ backgroundColor: "#F6E6DA", width: 524, height: 145 }}>
        <div className="d-flex align-items-center ">
          <div className="img-wrapper" style={{ width: 80, weight: 120 }}>
            <img src={item.photo} style={{ width: "100%" }} alt="logo" />
          </div>
          <div className="ms-4">
            <p className="m-0" style={{ color: "#613D2B", fontWeight: 900 }}>
              {item.name}
            </p>
            <p className="m-0 mt-1" style={{ color: "#974A4A", fontSize: 14 }}>{item.date}</p>
            <p className="m-0 mt-3" style={{ color: "#974A4A", fontSize: 14 }}>{item.price}</p>
            <p className="m-0" style={{ color: "#974A4A", fontSize: 14 }}>{item.qty}</p>
            <p className="m-0 fw-bold" style={{ color: "#974A4A" }}>{item.total}</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={LogoBrand} alt="logo-brand" style={{ width: 73, height: 22, margin: "10px 0" }} />
          <img src={item.barcode} alt="qr" style={{ width: 50, height: 50 }} />
          <p className="m-0 px-3 py-1 text-warning" style={{ backgroundColor: "linear-gradient(180deg, #FF9900 0%, #FF9900 100%)" }}>
            {item.status}
          </p>
        </div>
      </div>
      ))}
    </div>
  );
}

export default Transaction;
