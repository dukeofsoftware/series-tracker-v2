import Image from "next/image"

const AdultContent = () => {
  return (
    <Image
      alt="adult-content"
      width={30}
      height={30}
      className="absolute bottom-2 right-2 z-30 rounded-full bg-black/70 opacity-0 group-hover:opacity-100"
      src={`/icons/adult-content.png`}
    />
  )
}

export default AdultContent
