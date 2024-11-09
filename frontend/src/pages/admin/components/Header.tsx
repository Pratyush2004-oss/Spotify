import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Link to="/" className="rounded-lg">
          <img src="/spotify.svg" className="text-black size-10" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Music Manager</h1>
          <p className="mt-1 text-zinc-400">Manage your music catalog</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
