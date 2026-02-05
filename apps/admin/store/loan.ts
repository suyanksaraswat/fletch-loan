import { create } from 'zustand';

type CarBrand = 'KIA' | 'TOYOTA';

interface Loan {
  currentStep: number;
  brand: CarBrand | null;
  car: string | null;
  houseType: 'Own' | 'Mortgage' | 'Rented' | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  fireAlarm: boolean | null;
  ssn: string | null;
  score: number | null;

  updateCurrentStep: (step: number) => void;

  updateBrand: (brand: CarBrand) => void;
  updateCar: (car: string) => void;
  updateHouseType: (houseType: 'Own' | 'Mortgage' | 'Rented') => void;
  updateAddress: (street: string, city: string, state: string, zipCode: string) => void;
  updateFireAlarm: (fireAlarm: boolean) => void;
  updateSSN: (ssn: string) => void;
  updateScore: (score: number | null) => void;
}

export const useLoanStore = create<Loan>((set) => ({
  currentStep: 1,
  brand: null,
  car: null,
  houseType: null,
  street: null,
  city: null,
  state: null,
  zipCode: null,
  fireAlarm: null,
  ssn: null,
  score: null,
  updateCurrentStep: (step: number) => set({ currentStep: step }),

  updateBrand: (brand: CarBrand) => set({ brand, car: null }),
  updateCar: (car: string) => set({ car }),
  updateHouseType: (houseType: 'Own' | 'Mortgage' | 'Rented') => set({ houseType }),
  updateAddress: (street: string, city: string, state: string, zipCode: string) =>
    set({
      street,
      city,
      state,
      zipCode,
    }),
  updateFireAlarm: (fireAlarm: boolean) => set({ fireAlarm }),
  updateSSN: (ssn: string) => set({ ssn }),
   updateScore: (score: number | null) => set({ score }),
}));
