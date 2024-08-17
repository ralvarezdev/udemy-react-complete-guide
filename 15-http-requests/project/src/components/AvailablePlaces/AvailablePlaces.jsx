import Places from '../Places/Places.jsx';
import {useEffect, useState} from "react";
import serverURI from "../../config.js";
import ErrorWarning from "../ErrorWarning/ErrorWarning.jsx";
import {sortPlacesByDistance} from "../../loc.js";
import {fetchAvailablePlaces} from "../../https.js";

export default function AvailablePlaces({onSelectPlace}) {
    const [isFetching, setIsFetching] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);

        (async () => {
            try {
                const responseJSON = await fetchAvailablePlaces()

                navigator.geolocation.getCurrentPosition(position => {
                    const {latitude, longitude} = position.coords;
                    const sortedPlaces = sortPlacesByDistance(responseJSON.places, latitude, longitude);
                    setAvailablePlaces(sortedPlaces);
                    setIsFetching(false)
                })
            } catch (error) {
                setError({message: error.message || "Could not fetch places, please try again later"});
                setIsFetching(false)
            }
        })()
    }, [serverURI]);

    return (
        <>
            {error === null ? (
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    isLoading={isFetching}
                    loadingText="Fetching place data..."
                    fallbackText="No places available."
                    onSelectPlace={onSelectPlace}
                />) : (
                <ErrorWarning title="An error ocurred!" message={error.message} onConfirm={() => setError(null)}/>
            )}
        </>
    );
}
