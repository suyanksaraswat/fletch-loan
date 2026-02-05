import { useQuery } from '@tanstack/react-query';

import { CAR_BRANDS } from '@/utils/constants';

export const useGetBrands = () => {
  const getBrands = async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return CAR_BRANDS;
  };

  return useQuery({
    queryKey: ['get-brands'],
    queryFn: () => getBrands(),
  });
};
