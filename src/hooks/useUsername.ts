import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IStore {
  username: string | null
  setUsername: (username: string | null) => void
}

export const useUsernameStore = create<IStore>()(
  persist(
    /* start */
    (set, get) => ({
      username: null,
      setUsername: (username: string | null) => set({ username }),
    }),
    /* end */
    { name: "tracker-username" }
  )
)
