import React from "react";
import "./ShopPage.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroCarousel from "./HeroCarousel";
import VehicleAccessories from "./VehicleAccessories";
import modelS from "../../Assets/images/modelS.avif";
import model3 from "../../Assets/images/model3.avif";
import modelX from "../../Assets/images/modelX.avif";
import modelY from "../../Assets/images/modelY.avif";
import charging from "../../Assets/images/charging.avif";
import lifestyle from "../../Assets/images/lifestyle.avif";
import ShopAccessories from "./ShopAccessories";
import Tesfayedev from "./Tesfayedev";

const ShopPage = () => {
  return (
    <div className="shop-page-component">
      <HeroCarousel />
      <Tesfayedev />
      <VehicleAccessories image={modelS} title={"Model S Accessories"} />
      <VehicleAccessories
        image={model3}
        title={"Model 3 Accessories"}
        color={"black"}
      />
      <VehicleAccessories image={modelX} title={"Model X Accessories"} />
      <VehicleAccessories
        image={modelY}
        title={"Model Y Accessories"}
        color={"black"}
      />
      <VehicleAccessories image={charging} title={"Charging"} />
      <ShopAccessories />
      <VehicleAccessories
        button={true}
        image={lifestyle}
        title={"Lifestyle"}
        color={"black"}
      />
    </div>
  );
};

export default ShopPage;
