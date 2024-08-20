import {useCallback, useEffect, useState} from "react";
import {sendHttpRequest} from "../https.js";

export default function useHttp(url, config, initialLoading) {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(initialLoading)

    const sendRequest = useCallback(async (data) => {
        console.log({...config, data})
        setIsLoading(true)
        try {
            const responseJSON = await sendHttpRequest(url, {...config, body: data})
            setData(responseJSON)
        } catch (error) {
            setError(error.message || "Something went wrong!")
        }
        setIsLoading(false)
    }, [url, config])

    const clearData = () => setData(null)

    useEffect(() => {
        (async () => {
            if (!config || !config.method || config.method === "GET")
                await sendRequest()
        })()
    }, [sendRequest, config]);

    return {
        data, isLoading, error, sendRequest, clearData
    }
}