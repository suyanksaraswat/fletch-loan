'use client';

import { Button } from '@workspace/ui/components/button';

import { useGetBrands } from '@/services/loans/useGetBrands';
import { useLoanStore } from '@/store/loan';

export default function SelectBrand() {
  const { form, setForm, updateCurrentStep } = useLoanStore();
  const { brand } = form;

  const { data: brands, isLoading: isLoadingBrands } = useGetBrands();

  return (
    <div>
      {isLoadingBrands ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center gap-4">
          {brands &&
            brands.map((b) => (
              <Button
                key={b.id}
                variant={b.value === brand ? 'default' : 'outline'}
                onClick={() =>
                  setForm({
                    brand: b.value as 'KIA' | 'TOYOTA',
                    car: null,
                  })
                }
              >
                {b.name}
              </Button>
            ))}
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button disabled={isLoadingBrands || !brand} onClick={() => updateCurrentStep(2)}>
          Next
        </Button>
      </div>
    </div>
  );
}
