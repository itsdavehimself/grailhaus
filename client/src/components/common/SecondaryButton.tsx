interface SecondaryButtonProps {
  label: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ring-1 ring-primary text-primary w-full rounded-lg h-10 hover:cursor-pointer hover:bg-gray-50 transition-all duration-200"
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
