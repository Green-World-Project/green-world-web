import { Dispatch, SetStateAction } from "react";

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

export interface PlantInfo {
  name: string;
  condition: string;
}

export interface Plant {
  _id: string;
  photo: string;
  info: PlantInfo;
  createAt: string;
}

export interface IdentifiedPlantCardProps {
  plantResult?: PlantInfo | null;
  image?: string;
  handleRemoveImage?: () => void;
  setSelectedPlantId?: (id: string) => void;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  isModalOpen?: boolean;
  maxWidth?: string;
  height: string;
  plant?: Plant;
  iconSize?: number;
}

export interface pcsDataTypes {
  plantName: string;
  wateringTime: number;
  watering?: boolean;
}
