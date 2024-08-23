import React from "react";
import serverURI from "../../config.js";
import MealItem from "../MealItem/MealItem.jsx";
import useHttp from "../../hooks/useHttp.js";
import Error from "../Error/Error.jsx";

const requestConfig = {}

export default function Meals() {
    const {data: loadedMeals, error, isLoading} = useHttp(serverURI + "/meals", requestConfig, true)

    return (
        <>
            {error && (<Error title="Failed to fetch meals" message={error}/>)}
            {!error && <ul id="meals">
                {isLoading ? (<p className="center">Fetching meals...</p>) : (
                    loadedMeals.map(meal => (
                        <MealItem key={meal.id} meal={meal}/>
                    )))}
            </ul>}
        </>
    )
}