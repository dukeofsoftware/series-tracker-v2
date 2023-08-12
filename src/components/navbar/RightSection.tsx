import AuthButtons from "./AuthButtons"
import LanguageSelector from "./LanguageSelector"
import ThemeToggler from "./ThemeToggler"
import UserDropdown from "./UserDropdown"

const RightSection = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      <UserDropdown />
      <AuthButtons />
      <ThemeToggler />
      <LanguageSelector />
    </div>
  )
}

export default RightSection
