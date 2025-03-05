export interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormToggleProps {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface userDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
}

export interface pcsDataTypes {
  plantName: string;
  wateringTime: number;
  watering?: boolean;
}
