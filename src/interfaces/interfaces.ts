import { Dispatch, SetStateAction } from "react";

export interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormToggleProps {
  setPlants: React.Dispatch<React.SetStateAction<pcPlant[]>>;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  handleCloseBottomNav: () => void;
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
  currentPassword?: string;
  newPassword?: string;
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

type PcPlantInfo = {
  category: string;
  ideal_soil_moisture_percentage: number;
  optimal_temperature_celsius: number;
  light_exposure_hours: number;
  optimal_soil_ph_level: string;
  recommended_npk_ratio: string;
  water_duration_days: number;
  daily_water_requirement_liters_per_m2: number;
  humidity_percentage: number;
  plant_description: string;
};

export interface pcPlant {
  _id: string;
  plant_name: string;
  waterNeed: number;
  groundArea: number;
  isWatered: boolean;
  nextWateringDate: string;
  info: PcPlantInfo;
  updatedAt: string;
}

export interface plantOption {
  _id: string;
  plant_name: string;
}

type PlantLog = {
  wateringDate: string;
};

export interface selectedPlant extends pcPlant {
  info: PcPlantInfo;
  updatedAt: string;
  logs?: PlantLog[];
}
