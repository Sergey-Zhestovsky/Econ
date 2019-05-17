import GoodsConnector from "./GoodsConnector";
import CountriesConnector from "./CountriesConnector";
import ProductTypesConnector from "./ProductTypesConnector";
import StoresConnector from "./StoresConnector";
import UserConnector from "./UserConnector";

let config = require("./defaultConnectorConfig.json"),
  goodsConnector = new GoodsConnector(config.goodsConnector),
  countriesConnector = new CountriesConnector(config.countriesConnector),
  productTypesConnector = new ProductTypesConnector(config.productTypesConnector),
  storesConnector = new StoresConnector(config.storesConnector),
  userConnector = new UserConnector(config.userConnector);

export default {
  goodsConnector,
  countriesConnector,
  productTypesConnector,
  storesConnector,
  userConnector
};