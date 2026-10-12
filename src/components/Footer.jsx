import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const socials = [
  { label: "GitHub", href: "https://github.com/Nicolas-De-Almeida", icon: FaGithub, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nicolasdealmeida", icon: FaLinkedinIn, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-16">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />

      <div className="mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <p className="text-sm text-slate-300">
            © {year} Nícolas De Almeida. Programar é vida.
          </p>
          <p className="text-xs text-slate-500">
            📚 Studying(as always...)
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a href={href} aria-label={label} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a33] bg-[#14141e]/90 text-slate-400 transition-colors hover:border-violet-400/40 hover:text-white">
              <Icon size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}