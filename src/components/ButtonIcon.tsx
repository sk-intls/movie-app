import type { ComponentType, SVGProps } from "react";
interface IButtonIcon {
  isActive: boolean;
  handleClick: (event: React.MouseEvent) => void;
  ActiveIcon: ComponentType<SVGProps<SVGSVGElement>>;
  InactiveIcon: ComponentType<SVGProps<SVGSVGElement>>;
  entity: string;
  className?: string;
}
function ButtonIcon({
  isActive,
  ActiveIcon,
  InactiveIcon,
  handleClick,
  entity,
  className,
}: IButtonIcon) {
  return (
    <button
      onClick={handleClick}
      className={`absolute ${className} left-2 p-2  rounded-full
          bg-transparent border-0 outline-none ring-0
          hover:bg-transparent hover:border-0 hover:outline-none hover:ring-0
          focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0
          active:bg-transparent active:border-0 active:outline-none active:ring-0
          active:scale-120 transition-transform duration-700 ease-out cursor-pointer`}
      aria-label={isActive ? `Remove from ${entity}` : `Add to ${entity}`}
    >
      {isActive ? (
        <ActiveIcon className="h-5 w-5 text-white" />
      ) : (
        <InactiveIcon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}

export default ButtonIcon;
