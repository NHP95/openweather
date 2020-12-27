export const getWeatherByCityNameRequestParams = (cityName, stateCode, countryCode) => {
    /*
    API Key will be appended in each module later
    Please note that searching by states available only for the USA locations.
    */
    let queryString = "";
    queryString = cityName ? queryString.concat(cityName) : queryString;
    queryString = stateCode ? queryString.concat(`,${stateCode}`) : queryString;
    queryString = countryCode ? queryString.concat(`,${countryCode}`) : queryString;
    queryString = queryString.charAt(0) === ',' ? queryString.substring(1) : queryString;
    return {
        params: `q=${queryString}`
    }
}

export const getWeatherByCityIDRequestParams = (cityId) => {
    /*
    API Key will be appended in each module later
    Please note that searching by states available only for the USA locations.
    */
    let queryString = "";
    queryString = cityId ? queryString.concat(cityId) : queryString;
    return {
        params: `id=${queryString}`
    }
}