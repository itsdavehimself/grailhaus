import { Watch } from "lucide-react";
import { Home } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Gem } from "lucide-react";
import { UserRound } from "lucide-react";
import { Link } from "react-router";

interface MobileNavProps {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ setShowAddModal }) => {
  return (
    <nav className="flex justify-between items-center w-full h-18 border-t-1 border-gray-100 px-4">
      <Link to="/dashboard">
        <div className="flex justify-center items-center h-12 w-12 text-gray-400 hover:text-primary transition-colors duration-200">
          <Home />
        </div>
      </Link>
      <Link to="/collection">
        <div className="flex justify-center items-center h-12 w-12 text-gray-400 hover:text-primary transition-colors duration-200">
          <Watch />
        </div>
      </Link>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex justify-center items-center h-12 w-12 text-gray-400 hover:text-primary transition-colors duration-200 hover:cursor-pointer"
      >
        <CirclePlus />
      </button>
      <Link to="/grails">
        <div className="flex justify-center items-center h-12 w-12 text-gray-400 hover:text-primary transition-colors duration-200">
          <Gem />
        </div>
      </Link>
      <Link to="/profile">
        <div className="flex justify-center items-center h-12 w-12 text-gray-400 hover:text-primary transition-colors duration-200">
          <UserRound />
        </div>
      </Link>
    </nav>
  );
};

export default MobileNav;
