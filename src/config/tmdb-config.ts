import { env } from "@/env.mjs"

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${env.TMDB_TOKEN}`,
  },
}
