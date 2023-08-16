import { create } from "zustand"

interface IStore {
  username: string | null
  setUsername: (username: string | null) => void
}

export const useUsernameStore = create<IStore>()(
    /* start */
    (set, get) => ({
      
      username: null,
      setUsername: (username: string | null) => set({ username }),
    }),
    /* end */
  
)
