import Image from "next/image"

const AdultContent = () => {
    return <Image
        alt="adult-content"
        width={30}
        height={30}
        className="group-hover:opacity-100 opacity-0 absolute right-2 bottom-2 z-30 rounded-full bg-black/70"
        src={`/icons/adult-content.png`}
    />

}

export default AdultContent