import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import productsData from "./productsData.json"; // Import the JSON data

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    setLoading(true);

    // Find the product with the matching ID from the imported JSON data
    const productData = productsData.find((item) => item.id === parseInt(id, 10));

    if (productData) {
      setProduct(productData);
    } else {
      // Handle the case when the product is not found
      setProduct(null);
    }

    setLoading(false);
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={400} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <>
        <div className="col-md-6">
          <img src={product.imageURL} alt={product.name} height="400px" width="400px" />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.type}</h4>
          <h1 className="display-5">{product.name}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">
            {product.price} {product.currency}
          </h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;























