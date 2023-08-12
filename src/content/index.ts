import { english } from "./english"
import { german } from "./german"
import { turkish } from "./turkish"

export interface DictionaryEntry {
  trendingTitle: string
  toast:{
    error: string
    success: string
  }
  themes: {
    darkMode: string
    lightMode: string
  }
  accountDropdown: {
    dropdownTitle: string
    logout: string
    favorites: string
    myLists: string
    profile: string
    settings: string
  }
  settings: {
    title: string
    accountTab: {
      profilePhoto: {
        title: string
        description: string
        buttonLabel: string
      }
      profileName: {
        title: string
        description: string
        inputLabel: string
        inputDescription: string
        buttonLabel: string
        currentName: string
        toastDescription: string
      }
    }
    emailTab: {
      changeEmail: {
        title: string
        description: string
        inputLabel: string
        inputDescription: string
        confirmInputLabel: string
        confirmInputDescription: string
        buttonLabel: string
      }
      verifyEmail: {
        toastDescription:string
        toastTitle:string
        title: string
        description: string
        verified: string
        verifiedMail:string
        verifyButton:string
      }
    }
    passwordTab: {
      title: string
      description: string
      inputLabel: string
      confirmInputLabel: string
      confirmInputDescription: string
      buttonLabel: string
      toastDescription: string
    }
  }
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: english,
  tr: turkish,
  de: german,
}
