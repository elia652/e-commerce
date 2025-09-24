import React, { useState } from 'react';
import './index.css';
import upload_area from '../../assets/upload_area.svg';
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const Add_product = async () => {
    console.log('addded');
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product.image);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert('Product added') : alert('Failed');
        });
    }
  };
  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Add Product</p>
        <input
          type="text"
          placeholder="Type Here!"
          value={productDetails.name}
          onChange={changeHandler}
          name="name"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            placeholder="Type Here!"
            value={productDetails.old_price}
            onChange={changeHandler}
            name="old_price"
          />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type Here!"
            name="new_price"
          />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="add-product-selector"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
              className="addproduct-thumnbail-image"
            />
          </label>
          <input
            onChange={handleImage}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <button onClick={() => Add_product()} className="addproduct-btn">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
