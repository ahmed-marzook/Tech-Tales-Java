import { useRef, useState, useEffect, useCallback } from "react";
import axios, { isCancel } from "axios";
import API_CONFIG from "../configs/axiosConfig";

function useAuthorApi() {
    const [error, setError] = useState(null); // Stores any API errors
    const [isLoading, setIsLoading] = useState(true); // Tracks loading state
    const [authorList, setAuthorList] = useState([]);

    const abortControllerRef = useRef(null);

    const getAuthors = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setIsLoading(true);
            const response = await axios.get(API_CONFIG.ENDPOINTS.AUTHORS, {
                signal: abortControllerRef.current.signal,
            });
            setAuthorList(response.data);
        } catch (err) {
            if (isCancel(err)) {
                console.log("Request aborted:", err.message);
                return;
            }
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getAuthors();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [getAuthors]);

    return { authorList, isLoading, error, refetch: getAuthors }
}

export default useAuthorApi;