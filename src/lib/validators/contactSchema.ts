import { email, minLength, object, string, type Output } from "valibot"

export const ContactValidator = object({
  name: string([minLength(3)]),
  email: string([email()]),
  message: string([minLength(10)]),
})
export type ContactType = Output<typeof ContactValidator>
