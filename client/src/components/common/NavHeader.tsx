import { ChevronLeft, X } from "lucide-react";

interface NavHeaderProps {
  chevronClick: () => void;
  xClick: () => void;
  label: string;
}

const NavHeader: React.FC<NavHeaderProps> = ({
  chevronClick,
  xClick,
  label,
}) => {
  return (
    <div className="flex justify-between p-4">
      <ChevronLeft
        onClick={chevronClick}
        className="text-gray-400 hover:cursor-pointer hover:text-primary transition-all duration-200"
      />
      <h4 className="text-sm font-semibold text-primary mt-1">{label}</h4>
      <X
        onClick={xClick}
        className="text-gray-400 hover:cursor-pointer hover:text-primary transition-all duration-200"
      />
    </div>
  );
};

export default NavHeader;
