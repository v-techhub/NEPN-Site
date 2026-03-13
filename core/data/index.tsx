import { Icons } from "@/core/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Network E&P Nigeria Limited",
  initials: "NEPN",
  url: "https://google.com",
  location: "Lagos Nigeria",
  locationLink:
    "https://www.google.com/maps/place/Alimosho,+Ipaja+South+102213,+Lagos",
  description:
    "Network E&P Nigeria Limited (NEPN) is a fully Nigerian-owned oil and gas company dedicated to promoting sustainable energy solutions throughout Nigeria.",
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "victoradeshina922@gmail.com",
    tel: "+2349135409822",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/v-techhub",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/victor-adeshina-a40191304",
        icon: Icons.linkedin,

        navbar: true,
      },
      // X: {
      //   name: "X",
      //   url: "https://dub.sh/victor-adeshina",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      Email: {
        name: "Send Email",
        url: "mailto:victoradeshina922@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },
} as const;
