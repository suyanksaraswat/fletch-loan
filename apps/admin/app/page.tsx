'use client';

import { Button } from '@workspace/ui/components/button';
import { ChevronLeft } from 'lucide-react';

import { useLoanStore } from '@/store/loan';
import { CAR_BRANDS } from '@/utils/constants';

import SelectBrand from './_components/select-brand';
import SelectCar from './_components/select-car';
import SelectHouseType from './_components/select-house-type';
import Address from './_components/address';
import Offer from './_components/offer';

export default function LandingPage() {
  const { currentStep, updateCurrentStep } = useLoanStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectBrand />;
      case 2:
        return <SelectCar />;
      case 3:
        return <SelectHouseType />;
      case 4:
        return <Address />;
      case 5:
        return <Offer />;

      default:
        <SelectBrand />;
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="mb-10">
        {currentStep > 1 && (
          <Button variant="outline" onClick={() => updateCurrentStep(currentStep - 1)}>
            <ChevronLeft />
            Previous
          </Button>
        )}
      </div>

      <div className="mt-10">{renderStep()}</div>
    </div>
  );
}
