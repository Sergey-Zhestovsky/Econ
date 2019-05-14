import GoodsConnector from "./GoodsConnector";

let config = require("./defaultConnectorConfig.json"),
  goodsConnector = new GoodsConnector(config.goodsConnector);

export default {
  goodsConnector
};