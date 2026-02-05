import { useLoanStore } from '@/store/loan';

const isEligibleForLoan = (params: {
  brand: string | null;
  car: string | null;
  houseType: string | null;
  state: string;
  fireAlarm: boolean;
  score: number | null;
}) => {
  const { brand, car, houseType, state, fireAlarm, score } = params;

  const eligibleCar =
    (brand === 'TOYOTA' && (car === 'Land Cruiser' || car === 'Fortuner')) ||
    (brand === 'KIA' && (car === 'Seltos' || car === 'Carens'));

  const eligibleHouse = houseType === 'Own' || houseType === 'Mortgage';

  const eligibleFire = state === 'FL' && fireAlarm === true;

  const eligibleScore = typeof score === 'number' && score > 650;

  return eligibleCar && eligibleHouse && eligibleFire && eligibleScore;
};

export default function Offer() {
  const { form } = useLoanStore();
  const { brand, car, houseType, state, fireAlarm, score } = form;

  const isEligible = isEligibleForLoan({
    brand,
    car,
    houseType,
    state,
    fireAlarm,
    score,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-semibold">Loan Offer</h2>
      <p className="text-lg">
        {isEligible
          ? 'You are eligible for pre-own car loan'
          : 'Your application is not eligible for loan'}
      </p>
      <p className="text-sm text-muted-foreground">
        Bureau score: {typeof score === 'number' ? score : 'Not available'}
      </p>
    </div>
  );
}

