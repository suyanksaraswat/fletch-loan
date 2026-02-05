import { useQuery } from '@tanstack/react-query';

import {  KIA_CARS, TOYOTA_CARS } from '@/utils/constants';

export const useGetCars = ({ brand, enabled }: { brand: 'KIA' | 'TOYOTA'; enabled: boolean }) => {
  const getCars = async (brand: 'KIA' | 'TOYOTA') => {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    if (brand === 'KIA') {
      return KIA_CARS;
    } else if (brand === 'TOYOTA') {
      return TOYOTA_CARS;
    }

    return [];
  };

  return useQuery({
    queryKey: ['get-cars', brand],
    queryFn: () => getCars(brand),
    enabled,
  });
};
