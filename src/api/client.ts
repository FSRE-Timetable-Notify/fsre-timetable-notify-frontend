import { Api } from "./api";

export const client = new Api({
  baseUrl: import.meta.env.PROD
    ? "http://204.216.216.141:5000"
    : "http://localhost:5000",
});
