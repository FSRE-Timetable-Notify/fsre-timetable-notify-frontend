import { useCallback, useEffect, useState } from "react";

interface SetOptions {
  replace?: boolean;
}

export function useQueryParams() {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const updateSearchParams = useCallback(
    (params: URLSearchParams, options?: SetOptions) => {
      const url = new URL(window.location.href);
      url.search = params.toString();
      if (options?.replace) {
        window.history.replaceState(null, "", url);
      } else {
        window.history.pushState(null, "", url);
      }
      setSearchParams(new URLSearchParams(window.location.search));
    },
    []
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: null | string | undefined, options?: SetOptions) => {
      const params = new URLSearchParams(searchParams);
      if (value == null) params.delete(key);
      else params.set(key, value);
      updateSearchParams(params, options);
    },
    [searchParams, updateSearchParams]
  );

  return {
    getParam,
    searchParams,
    setParam,
    setSearchParams: updateSearchParams,
  } as const;
}
