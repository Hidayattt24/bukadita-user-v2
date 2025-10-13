import { useState, useCallback, useEffect, useRef } from "react";

export interface ApiFetchError {
  message: string;
  status: number;
  code?: string;
  retryable: boolean;
  raw?: unknown;
}

export interface UseApiFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiFetchError | null;
  refetch: (...args: unknown[]) => Promise<T | null>;
}

/**
 * Reusable hook for API fetching with proper error handling and debug logging
 * @param fn - API service function to call (can accept parameters)
 * @param autoFetch - Whether to fetch on mount (default: false for parameterized functions)
 */
export function useApiFetch<T>(
  fn: (...args: unknown[]) => Promise<T>,
  autoFetch: boolean = false
): UseApiFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiFetchError | null>(null);

  // Use ref to store the function to avoid dependency issues
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const fetcher = useCallback(async (...args: unknown[]): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await fnRef.current(...args);
      setData(result);
      return result;
    } catch (err: unknown) {
      const apiError = err as {
        message?: string;
        status?: number;
        code?: string;
        payload?: unknown;
      };

      const normalizedError: ApiFetchError = {
        message: apiError.message || "Network error occurred",
        status: apiError.status || 0,
        code: apiError.code,
        retryable:
          (apiError.status || 0) >= 500 || (apiError.status || 0) === 0,
        raw: apiError.payload || err,
      };

      setError(normalizedError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array because we use ref

  // Auto-fetch on mount if enabled (only for no-parameter functions)
  useEffect(() => {
    if (autoFetch) {
      fetcher();
    }
  }, [fetcher, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetcher,
  };
}

/**
 * Variant hook for manual fetching (no auto-fetch on mount)
 */
export function useApiCall<T>(fn: () => Promise<T>): UseApiFetchResult<T> {
  return useApiFetch(fn, false);
}
