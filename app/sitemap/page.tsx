import Link from "next/link";
const pages = [
  {
    "title": "Home",
    "href": "/"
  },
  {
    "title": "Who We Are",
    "href": "/about"
  },
  {
    "title": "Operations",
    "href": "/operations"
  },
  {
    "title": "Sustainability",
    "href": "/sustainability"
  },
  {
    "title": "Partners",
    "href": "/partners"
  },
  {
    "title": "Gallery",
    "href": "/gallery"
  },
  {
    "title": "News & Insights",
    "href": "/news"
  },
  {
    "title": "Contact Us",
    "href": "/contact"
  }
];
export default function SiteMap() {
  return <main className="mx-auto max-w-5xl px-6 py-24"><h1 className="text-4xl font-bold mb-10">Site Map</h1><ul className="space-y-5">{pages.map((page) => <li key={page.href}><Link className="text-[#14874f] underline" href={page.href}>{page.title}</Link></li>)}</ul></main>;
}
