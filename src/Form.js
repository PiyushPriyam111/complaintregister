// Form.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Form.css'

function Form() {
  // Initialize the state for the form fields
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceItem, setInvoiceItem] = useState({});
  const [productComplaint, setProductComplaint] = useState("");
  const [serviceComplaint, setServiceComplaint] = useState("");
  const [subCategory1, setSubCategory1] = useState("");
  const [subCategory2, setSubCategory2] = useState("");
  const [description, setDescription] = useState("");

  // Define a function to handle the invoice number input change
  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  // Define a function to handle the search button click
  const handleSearchClick = () => {
    //Make a GET request to the backend with the invoice number
    axios
      .get(`/api/invoice/${invoiceNumber}`)
      .then((res) => {
        // Set the invoice item state with the response data
        setInvoiceItem(res.data);
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
      });
  };

  // Define a function to handle the product complaint input change
  const handleProductComplaintChange = (e) => {
    setProductComplaint(e.target.value);
  };

  // Define a function to handle the service complaint input change
  const handleServiceComplaintChange = (e) => {
    setServiceComplaint(e.target.value);
  };

  // Define a function to handle the sub category 1 input change
  const handleSubCategory1Change = (e) => {
    setSubCategory1(e.target.value);
  };

  // Define a function to handle the sub category 2 input change
  const handleSubCategory2Change = (e) => {
    setSubCategory2(e.target.value);
  };

  // Define a function to handle the description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();
    // Create an object with the form data
    const complaintData = {
      invoiceNumber,
      invoiceItem,
      productComplaint,
      serviceComplaint,
      subCategory1,
      subCategory2,
      description,
    };
    // Make a POST request to the backend with the complaint data
    axios
      .post("/api/complaint", complaintData)
      .then((res) => {
        // Handle the success
        console.log(res.data);
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
      });
  };

  return <>
  <div>
  <h1 className="log">Log a New Complaint</h1>
     </div>
    <div className="form">
     
      <div className="invoice-number">
        <label htmlFor="invoice-number">Enter Invoice Number and click Search</label>
        <input
          type="text"
          id="invoice-number"
          value={invoiceNumber}
          onChange={handleInvoiceNumberChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="invoice-item">
        <h2>Invoice Item</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Material</th>
              <th>Batch</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{invoiceItem.item}</td>
              <td>{invoiceItem.qty}</td>
              <td>{invoiceItem.material}</td>
              <td>{invoiceItem.batch}</td>
              <td>{invoiceItem.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="complaint-category">
        <h2>Select Complaint Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="product-complaint">
            <label htmlFor="product-complaint">Product Complaint</label>
            <select
              id="product-complaint"
              value={productComplaint}
              onChange={handleProductComplaintChange}
            >
              <option value="">Select</option>
              <option value="Quality">Quality</option>
              <option value="Quantity">Quantity</option>
              <option value="Damage">Damage</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="service-complaint">
            <label htmlFor="service-complaint">Service Complaint</label>
            <select
              id="service-complaint"
              value={serviceComplaint}
              onChange={handleServiceComplaintChange}
            >
              <option value="">Select</option>
              <option value="Delivery">Delivery</option>
              <option value="Installation">Installation</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="sub-category-1">
            <label htmlFor="sub-category-1">Sub Category 1</label>
            <select
              id="sub-category-1"
              value={subCategory1}
              onChange={handleSubCategory1Change}
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="sub-category-2">
            <label htmlFor="sub-category-2">Sub Category 2</label>
            <select
              id="sub-category-2"
              value={subCategory2}
              onChange={handleSubCategory2Change}
            >
              <option value="">Select</option>
              <option value="X">X</option>
              <option value="Y">Y</option>
              <option value="Z">Z</option>
              <option value="W">W</option>
            </select>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="submit-button">
            <button type="submit">Save Complaint</button>
          </div>
        </form>
      </div>
    </div>
   
    </>;
}

export default Form;