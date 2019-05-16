export function getProductTypes() {
  return (dispatch, getState, { productTypesConnector }) => {
    productTypesConnector.getProductTypes()
      .then((result) => {
        return dispatch({
          type: "GET_TYPES",
          result
        });
      })
      .catch(error => console.error(error))
  }
}