import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton/dist";
import productsData from "./productsData.json";
import "./Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });

  useEffect(() => {
    setLoading(true);

    // Simulate fetching data from the imported JSON
    setData(productsData);
    setFilter(productsData);
    setLoading(false);
  }, []);

  const toggleFilter = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      // Clone the previous filters to make changes
      const updatedFilters = { ...prevFilters };

      // Check if the value is already in the filters
      if (updatedFilters[filterType].includes(value)) {
        // If it is, remove it
        updatedFilters[filterType] = updatedFilters[filterType].filter((v) => v !== value);
      } else {
        // If it's not, add it
        updatedFilters[filterType].push(value);
      }

      return updatedFilters;
    });
  };

  // Filter products based on selected filter options
  const applyFilters = () => {
  let filteredData = data;

  if (selectedFilters.color.length > 0) {
    filteredData = filteredData.filter((product) => selectedFilters.color.includes(product.color));
  }

  if (selectedFilters.gender.length > 0) {
    filteredData = filteredData.filter((product) => selectedFilters.gender.includes(product.gender));
  }

  if (selectedFilters.price.length > 0) {
    filteredData = filteredData.filter((product) =>
      selectedFilters.price.some((priceRange) => {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        return product.price >= minPrice && product.price <= maxPrice;
      })
    );
  }

  if (selectedFilters.type.length > 0) {
    filteredData = filteredData.filter((product) => selectedFilters.type.includes(product.type));
  }

  setFilter(filteredData);
};


  const clearFilters = () => {
    setSelectedFilters({
      color: [],
      gender: [],
      price: [],
      type: [],
    });

    setFilter(data);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="filter-box">
            <h2>Filter Products</h2>
            <div className="filter-section">
              <h3>Color</h3>
              {Array.from(new Set(data.map((product) => product.color))).map((color, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedFilters.color.includes(color)}
                    onChange={(e) => toggleFilter("color", e.target.value)}
                  />
                  {color}
                </label>
              ))}
            </div>
            <div className="filter-section">
              <h3>Gender</h3>
              {Array.from(new Set(data.map((product) => product.gender))).map((gender, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={gender}
                    checked={selectedFilters.gender.includes(gender)}
                    onChange={(e) => toggleFilter("gender", e.target.value)}
                  />
                  {gender}
                </label>
              ))}
            </div>
            <div className="filter-section">
              <h3>Price</h3>
              {["0-250", "251-450"].map((priceRange, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={priceRange}
                    checked={selectedFilters.price.includes(priceRange)}
                    onChange={(e) => toggleFilter("price", e.target.value)}
                  />
                  {priceRange}
                </label>
              ))}
            </div>
            <div className="filter-section">
              <h3>Type</h3>
              {Array.from(new Set(data.map((product) => product.type))).map((type, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedFilters.type.includes(type)}
                    onChange={(e) => toggleFilter("type", e.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div className="filter-buttons">
              <button className="btn btn-clear" onClick={clearFilters}>
                Clear Filters
              </button>
              <button className="btn btn-apply" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {filter.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={product.imageURL}
                    className="card-img-top"
                    alt={product.name}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.name}</h5>
                    <p className="card-text lead fw-bold">
                      {product.price} {product.currency}
                    </p>
                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
