import serverURI from "./config.js";

export const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);
    const responseJSON = await response.json()

    if (!response.ok)
        throw new Error(responseJSON.message || 'Failed to fetch data');

    return responseJSON;
}

export const getMealImage = (mealImage) => {
    return [serverURI, mealImage].join('/')
}