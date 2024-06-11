import wallConnector from "../../Assets/images/feature_wall_connector.avif";
import navChill from "../../Assets/images/feature_nav_chill2.avif";
import giftCard from "../../Assets/images/Tesla_gift_card_0.avif";
import atHome from "../../Assets/images/charging-at-home.avif";
import onTheRoad from "../../Assets/images/charging-on-the-road.avif";
import parts from "../../Assets/images/charging-parts.avif";
import modelS from "../../Assets/images/Model_S.avif";
import model3 from "../../Assets/images/Model_3.avif";
import modelX from "../../Assets/images/Model_X.avif";
import modelY from "../../Assets/images/Model_Y.avif";
import men from "../../Assets/images/mobile_nav_mens.avif";
import women from "../../Assets/images/mobile_nav_womens_chill2.avif";
import kids from "../../Assets/images/mobile_nav_kids_cyber.avif";
import bestSellers from "../../Assets/images/lifestyle-best-sellers.avif";
import miniTeslas from "../../Assets/images/lifestyle-mini-teslas.avif";
import drinkWare from "../../Assets/images/lifestyle-drinkware.avif";
import outdoorTech from "../../Assets/images/lifestyle-outdoor-tech.avif";

export const navList = [
  {
    category: "Charging",
    subCategories: [
      { title: "At Home", image: atHome },
      { title: "On The Road", image: onTheRoad },
      { title: "Parts", image: parts },
    ],
    promo: { title: "Wall Connector", image: wallConnector },
  },
  {
    category: "Vehicle Accessories",
    subCategories: [
      { title: "Model S", image: modelS },
      { title: "Model 3", image: model3 },
      { title: "Model X", image: modelX },
      { title: "Model Y", image: modelY },
    ],
    options: [
      "Best Sellers",
      "Interior",
      "Exterior",
      "Wheels and Tires",
      "Floor Mats",
      "Parts",
      "Keys",
    ],
  },
  {
    category: "Apparel",
    subCategories: [
      { title: "Men", image: men },
      { title: "Women", image: women },
      { title: "Kids", image: kids },
    ],
    options: [
      "Best Sellers",
      "Tees",
      "Sweatshirts and Hoodies",
      "Outerwear",
      "Joggers",
      "Hats",
      "Socks",
    ],
    promo: { title: "Chill Pullover Hoodie", image: navChill },
  },
  {
    category: "Lifestyle",
    subCategories: [
      { title: "Best Sellers", image: bestSellers },
      { title: "Mini Teslas", image: miniTeslas },
      { title: "Drinkware", image: drinkWare },
      { title: "Outdoors & Tech", image: outdoorTech },
      { title: "Gift Card", image: giftCard },
    ],
    promo: { title: "Tesla Shop Gift Card", image: giftCard },
  },
];
