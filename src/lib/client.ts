import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/index";

const client = hc<AppType>("http://localhost:5000/");

export { client };
