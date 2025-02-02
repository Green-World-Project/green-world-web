export interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
