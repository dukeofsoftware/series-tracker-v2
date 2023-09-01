import { FaSpinner } from "react-icons/fa"

const loading = async () => {
  return (
    <div className="grid min-h-screen w-full place-items-center">
      <div className="flex flex-col items-center gap-2">
        <FaSpinner className="mr-2 h-16 w-16 animate-spin" />
        <span className="text-lg text-sky-500">Loading...</span>
      </div>
    </div>
  )
}

export default loading
