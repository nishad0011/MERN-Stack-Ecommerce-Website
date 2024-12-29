import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAlert } from "react-alert";

import { FaPen } from "react-icons/fa6";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineWarehouse } from "react-icons/md";

import "./AdminDashboard.css";
import "./UpdateProduct.css";
import Sidebar from "./Sidebar";

import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const {
    error: updateError,
    product: updatedProduct,
    loading,
    isUpdated,
    message,
  } = useSelector((state) => state.product);

  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(null);

  const productId = params.id;
  const categories = [
    "Electronics",
    "Laptop",
    "Footwear",
    "Pants",
    "Shirts",
    "Camera",
    "Phones",
  ];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success(message);
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    message,
    productId,
    product,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const form = JSON.stringify({
      name: name,
      price: price,
      stock: stock,
      description: description,
      category: category,
      images: Array.from(images),
    });

    dispatch(updateProduct(productId, form));
  };

  const createProductImageChangeHandler = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages(null);

    files.forEach((file) => {
      const reader = new FileReader();

      //onload occurs after reader.readAsDataURL(file)
      reader.onload = () => {
        //0=initial , 1=Loading , 2=Read Complete
        if (reader.readyState === 2) {
          // reader.result is byteStream
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Metadata title={"Create New Product"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <h1 className="productsListHeading">Update Product</h1>
          <div className="formContainer">
            <form
              className="newProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <div>
                <FaPen />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <HiOutlineCurrencyRupee />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <MdOutlineDescription />
                <textarea
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                />
              </div>
              <div>
                <MdOutlineAccountCircle />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <MdOutlineWarehouse />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div id="imageUpload">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImageChangeHandler}
                  multiple
                />
              </div>
              {oldImages ? (
                <div id="imageShow">
                  {oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product" />
                  ))}
                </div>
              ) : null}
              {imagesPreview ? (
                <div id="imageShow">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="New Product" />
                  ))}
                </div>
              ) : null}
              {/* <div id="imageShow">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product" />
                ))}
              </div> */}
              <div>
                <button
                  id="createProdBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
