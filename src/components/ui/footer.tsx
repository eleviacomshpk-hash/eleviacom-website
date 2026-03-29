import Link from "next/link";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-black rounded-sm rotate-45" />
              </div>
              <span className="font-bold text-lg tracking-tight">ELEVIACOM</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Studio di Architettura AI per PMI Italiane.
              <br />
              Chatbot, Automazioni e Agenti AI su Misura.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:info@eleviacom.com" className="text-neutral-400 hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://wa.me/39" className="text-neutral-400 hover:text-white transition-colors" aria-label="WhatsApp">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Legale</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/termini" className="hover:text-white transition-colors">Termini e Condizioni</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Contatti</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="mailto:info@eleviacom.com" className="hover:text-white transition-colors">info@eleviacom.com</a>
              </li>
              <li>
                <a href="tel:+39" className="hover:text-white transition-colors">+39 ...</a>
              </li>
              <li className="pt-2 text-xs text-neutral-500 leading-relaxed">
                ELEVIACOM ShPK
                <br />
                Shoq&euml;ri me P&euml;rgj&euml;gj&euml;si t&euml; Kufizuar
                <br />
                NUIS/NIPT: [da inserire]
              </li>
              <li className="text-xs text-neutral-500">
                Rappresentante UE (Art. 27 GDPR): [da nominare]
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} ELEVIACOM ShPK. Tutti i diritti riservati.</p>
          <p>GDPR Compliant &middot; AI Act Ready &middot; EU Representative in Italia</p>
        </div>
      </div>
    </footer>
  );
}
