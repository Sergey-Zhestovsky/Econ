export function getCountries() {
  return (dispatch, getState, { countriesConnector }) => {
    countriesConnector.getCountries()
      .then((result) => {
        return dispatch({
          type: "GET_COUNTRIES",
          result
        });
      })
      .catch(error => console.error(error))
  }
}