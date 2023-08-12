import {
  array,
  boolean,
  number,
  object,
  string,
  withDefault,
  type Output,
} from "valibot"

export const discoverMovieValidator = object({
  isAdult: withDefault(string(), "false"),
  language: withDefault(string(), "en-US"),
  genres: array(string()),
  page: withDefault(number(), 1),
})

export type discoverMovieType = Output<typeof discoverMovieValidator>
