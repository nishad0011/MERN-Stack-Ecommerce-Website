import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";

import { FaPen } from "react-icons/fa6";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineWarehouse } from "react-icons/md";

import "./AdminDashboard.css";
import "./NewProduct.css";
import Sidebar from "./Sidebar";

import { clearErrors, newProductCreate } from "../../actions/productAction";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
    if (error) {
      // console.log("error = ", error);
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const form = JSON.stringify({
      name: name,
      price: price,
      stock: stock,
      description: description,
      category: category,
      images: Array.from(images),
    });

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("price", price);
    // myForm.set("stock", stock);
    // myForm.set("description", description);
    // myForm.set("category", category);
    // myForm.set("images", Array.from(images));

    dispatch(newProductCreate(form));
  };

  const createProductImageChangeHandler = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
          <h1 className="productsListHeading">Create Product</h1>
          <div className="formContainer">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="newProductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
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
                  <select onChange={(e) => setCategory(e.target.value)}>
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
                <div id="imageShow">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Avatar" />
                  ))}
                </div>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
