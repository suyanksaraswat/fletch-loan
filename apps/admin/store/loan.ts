import { create } from 'zustand';

type CarBrand = 'KIA' | 'TOYOTA';

type HouseType = 'Own' | 'Mortgage' | 'Rented';

interface LoanForm {
  brand: CarBrand | null;
  car: string | null;
  houseType: HouseType | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  fireAlarm: boolean;
  ssn: string;
  score: number | null;
}

interface LoanState {
  currentStep: number;
  form: LoanForm;

  updateCurrentStep: (step: number) => void;
  setForm: (partial: Partial<LoanForm>) => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  currentStep: 1,
  form: {
    brand: null,
    car: null,
    houseType: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fireAlarm: false,
    ssn: '',
    score: null,
  },

  updateCurrentStep: (step: number) => set({ currentStep: step }),

  setForm: (partial: Partial<LoanForm>) =>
    set((state) => ({
      form: {
        ...state.form,
        ...partial,
      },
    })),
}));
