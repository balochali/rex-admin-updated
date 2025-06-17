import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsArticle from "./ProductsArticle";
import config from "../../../libs/config.json";
import axios from "axios";

const ProductSlider = ({ setProductCount }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get(`${config.BASE_URL}/api/products`);
      console.log("Products", products.data);
      setProducts(products.data.data);
      setProductCount(products.data.data.length);
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="w-[97%] mt-3 gap-5">
        <Slider {...settings}>
          {products?.map((item, index) => {
            return <ProductsArticle products={item} key={index} />;
          })}
        </Slider>
      </div>
    </>
  );
};

export default ProductSlider;
