import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 rounded-lg bg-zinc-900/75 backdrop-blur-lg">
      <div className="flex items-center">
        <img src="/spotify.svg" className="size-8" />
        <span className="font-bold text-green-400">Spotify</span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            hrefLang="en"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                className: "text-white",
              })
            )}
          >
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
