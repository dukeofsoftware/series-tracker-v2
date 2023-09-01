/* eslint-disable no-process-env */
// @ts-check

import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const toggle = z
  .enum(["true", "false", "0", "1"])
  .transform((v) => v === "true" || v === "1")

export const env = createEnv({
  skipValidation: process.env.CI === "true",

  client: {
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_MESSAGING_SENDER_ID: z.string().min(1),
    NEXT_PUBLIC_MEASUREMENT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().min(1),
    NEXT_PUBLIC_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_BUCKET: z.string().min(1),
    NEXT_PUBLIC_APP_ID: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().min(1).default("http://localhost:3000"),
  },

  server: {
    ANALYZE: toggle.default("false"),
    TMDB_TOKEN: z.string().min(1),
    FIREBASE_PRIVATE_KEY: z.string().min(1),
    FIREBASE_CLIENT_EMAIL: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    USE_SECURE_COOKIES: z.enum(["true", "false"]).default("false"),
    FIREBASE_API_KEY: z.string().min(1),
    MAILER_PASSWORD: z.string().min(1),
    MAILER_EMAIL: z.string().min(1).email(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    PWA: toggle.default("false"),
  },

  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL:
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URL,
    NEXT_PUBLIC_BUCKET: process.env.NEXT_PUBLIC_BUCKET,
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    TMDB_TOKEN: process.env.TMDB_TOKEN,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    USE_SECURE_COOKIES: process.env.USE_SECURE_COOKIES,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
    MAILER_EMAIL: process.env.MAILER_EMAIL,

    ANALYZE: process.env.ANALYZE,

    NODE_ENV: process.env.NODE_ENV,

    PWA: process.env.PWA,
  },
})
