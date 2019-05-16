export function setProduct(product, cb = () => { }) {
  return (dispatch, getState, { goodsConnector }) => {
    dispatch({ type: "LOADING_GOODS" });

    goodsConnector.setProduct(product)
      .then((result) => {
        cb(result);

        return dispatch({
          type: "CREATE_GOODS",
          result
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_GOODS",
          error
        });
      });
  }
}

export function getGoods() {
  return (dispatch, getState, { goodsConnector }) => {
    goodsConnector.getGoods()
      .then((result) => {
        return dispatch({
          type: "GET_GOODS",
          result
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_GOODS",
          error
        });
      });
  }
}

export function editProduct(product, cb = () => { }) {
  return (dispatch, getState, { goodsConnector }) => {
    dispatch({ type: "LOADING_GOODS" });

    goodsConnector.updateProduct(product)
      .then((result) => {
        cb(result);

        return dispatch({
          type: "EDIT_GOODS",
          result
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_GOODS",
          error
        });
      });
  }
}

export function deleteProduct(id) {
  return (dispatch, getState, { goodsConnector }) => {
    goodsConnector.deleteProduct(id)
      .then((result) => {
        return dispatch({
          type: "DELETE_GOODS",
          result
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_GOODS",
          error
        });
      });
  }
}
