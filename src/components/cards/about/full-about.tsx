import { about } from "@/constants/strings";
import cardStyle from "@/shared/styles/card";
import Image from "next/image";

export default function FullAboutCard() {
  return (
    <div className={cardStyle + "!py-12 !px-4"}>
      <div className="w-full flex flex-col items-center justify-center text-center gap-3">
        <Image
          src="/me/ctlabs-logo.png"
          alt="ctlogo"
          width={150}
          height={150}
        />
        <p className="text-xl font-bold py-4">
          <a className="opacity-70">Comtreak Labs</a>
        </p>
        <p className="opacity-95 text-3xl font-bold">
          Transforming Technology into
          <br></br>
          <a href="/work" className="underline underline-offset-4">
          Solutions
          </a>
          .
        </p>
        <p className="text-lg text-neutral-500 py-3">          
          Founded in <a className="font-semibold text-dark dark:text-light/90">
          2018 in South Tyrol, Italy,
          </a>{" "} Comtreak Labs pioneers digital innovation.
           Our interdisciplinary team merges IT, 
           finance, and AI, 
           shaping the future of technology.
        </p>
        <p className="text-[17px] text-neutral-500 2xs:px-2 xs:px-5 leading-relaxed">
        Comtreak Labs was born from a collective vision to innovate the digital realm. Founded by seasoned professionals, we merge IT, finance, and AI to deliver cutting-edge solutions, redefining the future of technology.
        </p>
      </div>
    </div>
  );
}
