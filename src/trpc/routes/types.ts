import {
    array,
    boolean,
    enumType,
    minLength,
    number,
    object,
    optional,
    Output,
    string,
  } from "valibot"
  
  const lang = enumType(["tr-TR", "en-US", "de-DE"])
  
  export const TrpcTmdbPaginateSearchInput = object({
    page: optional(string()),
    lang: optional(lang),
  })
  
  export type TrpcTrendingInputType = Output<typeof TrpcTmdbPaginateSearchInput>
  
  export const TrpcSearchInput = object({
    page: optional(string()),
    lang: optional(lang),
    adult: optional(enumType(["true", "false"])),
    query: string([minLength(1)]),
    type: optional(enumType(["multi", "movie", "tv"])),
    date: optional(string()),
  })
  export type TrpcSearchInputType = Output<typeof TrpcSearchInput>
  
  export const TrpcGetTmdbPageWithIdInput = object({
    id: string([minLength(1)]),
    lang: optional(lang),
  })
  export type TrpcGetTmdbPageWithIdInputType = Output<
    typeof TrpcGetTmdbPageWithIdInput
  >

  
  export const TmdbCard = object({
    id: number(),
    title: string(),
    poster_path: string(),
    original_title: string(),
    overview: string(),
    date: string(),
    media_type: string(),
    adult: boolean(),
  })
  export type TmdbCardType = Output<typeof TmdbCard>
  
  export const TrpcTmdbCardReturn = object({
    page: number(),
    results: array(TmdbCard),
    total_pages: number(),
    total_results: number(),
  })
  export type TrpcTmdbCardReturnType = Output<typeof TrpcTmdbCardReturn>
  
  export const TrpcLocaleInput = object({
    language: enumType(["tr-TR", "en-US", "de-DE"]),
  })
  
  
  
  export const TrpcSendMailInput = object({
    name: string(),
    email: string(),
    message: string(),
  
  })
  export type TrpcSendMailInputType = Output<typeof TrpcSendMailInput>