import {
  githubIcon,
  instagramIcon,
  discordIcon,
  xIcon,
} from "@/assets/icons/all-social";
import linksMetadata from "@/metadata/links";

const linksCards = [
  {
    title: "Github",
    href: "https://github.com/GitCodeMischer",
    className: "dark:bg-white p-2",
    icon: githubIcon,
  },
  {
    title: "Discord",
    className: "bg-dark dark:bg-white p-4",
    href: "https://discord.gg/Et9fVCed",
    icon: discordIcon,
  },
  {
    title: "Instagram",
    className: "!bg-transparent",
    href: "https://www.instagram.com/ludrepelosoyc_nft/",
    icon: instagramIcon,
  },
  {
    title: "X",
    className: "p-4 bg-dark dark:bg-white",
    href: "https://twitter.com/ludrepelosoyc",
    icon: xIcon,
  }
];

export default linksCards;
