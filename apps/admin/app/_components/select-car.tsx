'use client';

import { useMemo } from 'react';

import { Button } from '@workspace/ui/components/button';

import { useGetCars } from '@/services/loans/useGetCars';
import { useLoanStore } from '@/store/loan';
import { CAR_BRANDS, KIA_CARS, TOYOTA_CARS } from '@/utils/constants';

export default function SelectCar() {
  const { form, setForm, updateCurrentStep } = useLoanStore();
  const { brand, car } = form;

  const { data: cars, isLoading: isLoadingCars } = useGetCars({
    brand: brand as 'KIA' | 'TOYOTA',
    enabled: Boolean(brand),
  });

  return (
    <div>
      {isLoadingCars ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center gap-4">
          {cars &&
            cars.map((b) => (
              <Button
                key={b.id}
                variant={b.value === car ? 'default' : 'outline'}
                onClick={() => setForm({ car: b.value })}
              >
                {b.name}
              </Button>
            ))}
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button disabled={!car} onClick={() => updateCurrentStep(3)}>
          Next
        </Button>
      </div>
    </div>
  );
}
