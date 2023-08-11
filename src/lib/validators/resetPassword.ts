import {

    minLength,
    object,
    string,
    ValiError,
    type Output,
  } from "valibot"
  

  
  export const resetPasswordValidator = object(
    {
     
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
  export type ResetPasswordType = Output<typeof resetPasswordValidator>
  