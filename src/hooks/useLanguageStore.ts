import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IStore {
  language: string
  setLanguage: (language: string) => void
}

export const useLanguageStore = create<IStore>()(
  persist(
    /* start */
    (set, get) => ({
      language: "en-US",
      setLanguage: (language: string) => set({ language }),
    }),
    /* end */
    { name: "tracker-language-strotage" }
  )
)
