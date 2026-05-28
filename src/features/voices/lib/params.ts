import { createSearchParamsCache, parseAsString } from "nuqs/server";

// react client component
export const voicesSearchParams = {
  query: parseAsString.withDefault(""),
};

// react server component
export const voicesSearchParamsCache =
  createSearchParamsCache(voicesSearchParams);
