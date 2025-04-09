import React from "react";

function Footer() {
  return (
    <footer className="relative z-10 py-4 px-6 text-center text-neutral-500 border-t border-zinc-800">
      <p>© {new Date().getFullYear()} Lira. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
