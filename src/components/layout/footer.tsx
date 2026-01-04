import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg mb-4 md:mb-0">
            <Image src="/logo.png" alt="Euro Star Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="font-headline">Euro Star Electromechanical</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook page">
              <Facebook className="h-6 w-6 hover:text-accent transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter profile">
              <Twitter className="h-6 w-6 hover:text-accent transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn profile">
              <Linkedin className="h-6 w-6 hover:text-accent transition-colors" />
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} Euro Star Electromechanical Cont. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
