import { t } from "./init"

export const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    next({
      ctx: {
        user: null,
      },
    })
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  })
})
