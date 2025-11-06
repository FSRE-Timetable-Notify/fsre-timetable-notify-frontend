import ThemeModeToggle from "./theme-mode-toggle";

import logoUrl from "/logo.png";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b-2 border-b-border py-2">
      <div className="mx-8 flex h-full items-center justify-between">
        <a
          className="text-foreground"
          href="/">
          <img
            alt="Logo"
            height="40"
            src={logoUrl}
            width="40"
          />
        </a>
        <ol className="flex items-center space-x-4">
          <ThemeModeToggle />
        </ol>
      </div>
    </nav>
  );
};

export default Navbar;
