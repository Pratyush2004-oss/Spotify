import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";

const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-zinc-900/75 backdrop-blur-lg">
      <div className="flex items-center">
        <img src="/spotify.svg" className="size-8" />
        <span className="font-bold text-green-400">Spotify</span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" hrefLang="en">
            <LayoutDashboard className="size-4 " />
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
