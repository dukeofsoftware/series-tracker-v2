import { create } from "zustand"

interface NavbarStore {
  isNavbarOpen: boolean
  toggleNavbar: () => void
  closeNavbar: () => void
  isNavbarOpenSelector: () => boolean
}
export const useNavbarStore = create<NavbarStore>((set, get) => ({
  // State
  isNavbarOpen: false,
  // Actions
  toggleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen })),
  closeNavbar: () => set({ isNavbarOpen: false }),
  // Selectors
  isNavbarOpenSelector: () => get().isNavbarOpen,
}))
