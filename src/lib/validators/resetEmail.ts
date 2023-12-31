import {
  custom,
  email,
  minLength,
  object,
  string,
  ValiError,
  type Output,
} from "valibot"

export const resetEmailValidator = object(
  {
    email: string([
      minLength(1, "Please enter your email."),
      email("The email address is badly formatted."),
    ]),
    confirmEmail: string([
      minLength(1, "Please enter your email."),
      email("The email address is badly formatted."),
    ]),
  },
  [
    (input) => {
      if (input.email !== input.confirmEmail) {
        throw new ValiError([
          {
            reason: "string",
            validation: "custom",
            origin: "value",
            message: "Passwords do not match.",
            input: input.confirmEmail,
            path: [
              {
                schema: "object",
                input: input,
                key: "confirmPassword",
                value: input.confirmEmail,
              },
            ],
          },
        ])
      }
      return input
    },
  ]
)
export type ResetEmailType = Output<typeof resetEmailValidator>
