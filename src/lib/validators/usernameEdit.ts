import { minLength, object, string, type Output } from "valibot"

export const ChangeUsernameValidator = object({
  username: string([minLength(3)]),
})
export type ChangeUsernameType = Output<typeof ChangeUsernameValidator>
