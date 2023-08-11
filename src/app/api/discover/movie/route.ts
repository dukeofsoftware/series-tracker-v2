import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens"

import { authConfig } from "@/config/server-config"

export async function GET(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig)

  if (!tokens) {
    throw new Error("Cannot update custom claims of unauthenticated user")
  }
  if(tokens){
    return NextResponse.json("user logged in")
  }
  return
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  }

  const movies = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=tr-TR&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
  return NextResponse.json(movies, {
    status: 200,
  })
}
