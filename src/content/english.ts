import { DictionaryEntry } from "."

export const english: DictionaryEntry = {
  trendingTitle: "Trends",
  toast: {
    success: "Success",
    error: "Error",
  },
  themes: {
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  },
  accountDropdown: {
    dropdownTitle: "Account",
    logout: "Logout",
    favorites: "Favorites",
    myLists: "My Lists",
    profile: "Profile",
    settings: "Settings",
  },
  settings: {
    title: "Settings",
    accountTab: {
      profilePhoto: {
        title: "Profile Photo",
        description: "Change your profile photo",
        buttonLabel: "Change Photo",
      },
      profileName: {
        toastDescription: "Your profile name has been changed",
        currentName: "Your current name is ",
        title: "Profile Name",
        description: "Change your profile name",
        inputLabel: "New Name",
        inputDescription: "Enter your new profile name",
        buttonLabel: "Change Name",
      },
    },
    emailTab: {
      changeEmail: {
        title: "Change Email",
        description: "Change your email address",
        inputLabel: "New Email Address",
        confirmInputLabel: "Confirm New Email",
        confirmInputDescription: "Re-enter the new email",
        inputDescription: "Enter your new email address",
        buttonLabel: "Change Email",
      },
      verifyEmail: {
        verifiedMail: "Your email address has been verified",
        verifyButton: "Verify Email",
        toastDescription:
          "A verification email has been sent to your new email address",
        toastTitle: "Email Verification",

        title: "Email Verification",
        description: "Your email address has been verified",
        verified: "Verified",
      },
    },
    passwordTab: {
      title: "Change Password",
      description: "Change your account password",
      inputLabel: "New Password",
      confirmInputLabel: "Confirm New Password",
      confirmInputDescription: "Re-enter the new password",
      buttonLabel: "Change Password",
      toastDescription: "Your password has been changed",
    },
  },
}
