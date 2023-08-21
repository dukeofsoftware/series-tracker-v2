import AuthButtons from "./AuthButtons"
import LanguageSelector from "./LanguageSelector"
import ThemeToggler from "./ThemeToggler"
import ToggleNavbar from "./ToggleNavbar"
import UserDropdown from "./UserDropdown"

const RightSection = () => {
  return (
    <div className="items-center justify-end gap-2 sm:flex">
      <UserDropdown />
      <AuthButtons />
      <ThemeToggler />
      <div className="hidden sm:block">
        <LanguageSelector />
      </div>
      <ToggleNavbar />
    </div>
  )
}

export default RightSection
