import {useEffect, useState} from "react";

export default function useFetch(fetchFunction, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState(initialValue);

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            try {
                const places = await fetchFunction();
                setData(places);
            } catch (error) {
                setError({message: error.message || 'Failed to fetch data.'});
            }

            setIsFetching(false);
        })();
    }, [fetchFunction]);

    return {isFetching, error, data, setData};
}