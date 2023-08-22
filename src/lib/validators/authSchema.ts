import {
  email,
  minLength,
  object,
  string,
  ValiError,
  type Output,
} from "valibot"

/*  */

export const reAuthSchema = object({
  password: string([minLength(8)]),
})

export type ReAuthType = Output<typeof reAuthSchema>

export const LoginSchema = object({
  email: string([email()]),
  password: string([minLength(8)]),
})

export type LoginType = Output<typeof LoginSchema>

export const RegisterSchema = object(
  {
    email: string([
      minLength(1, "Please enter your email."),
      email("The email address is badly formatted."),
    ]),
    password: string([
      minLength(1, "Please enter your password."),
      minLength(8, "You password must have 8 characters or more."),
    ]),
    confirmPassword: string([
      minLength(1, "Please enter your password."),
      minLength(8, "You password must have 8 characters or more."),
    ]),
  },
  [
    /* check */
    (input) => {
      if (input.password !== input.confirmPassword) {
        throw new ValiError([
          {
            reason: "string",
            validation: "custom",
            origin: "value",
            message: "Passwords do not match.",
            input: input.confirmPassword,
            path: [
              {
                schema: "object",
                input: input,
                key: "confirmPassword",
                value: input.confirmPassword,
              },
            ],
          },
        ])
      }
      return input
    },
  ]
)
export type RegisterType = Output<typeof RegisterSchema>
