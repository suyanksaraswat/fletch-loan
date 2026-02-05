import { useLoanStore } from '@/store/loan';

export default function Offer() {
  const { brand, car, houseType, state, fireAlarm, score } = useLoanStore();

  const eligibleCar =
    (brand === 'TOYOTA' && (car === 'Land Cruiser' || car === 'Fortuner')) ||
    (brand === 'KIA' && (car === 'Seltos' || car === 'Carens'));

  const eligibleHouse = houseType === 'Own' || houseType === 'Mortgage';

  const eligibleFire = state === 'FL' && fireAlarm === true;

  const eligibleScore = typeof score === 'number' && score > 650;

  const isEligible = eligibleCar && eligibleHouse && eligibleFire && eligibleScore;

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

