import { minLength, object, string, type Output } from "valibot"

export const changeProfileName = object({
  profileName: string([minLength(3)]),
})
export type ChangeProfileNameType = Output<typeof changeProfileName>
