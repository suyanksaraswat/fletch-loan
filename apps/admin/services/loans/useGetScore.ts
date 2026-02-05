import { useMutation } from '@tanstack/react-query';

type GetScoreVariables = {
  ssn: string;
};

type GetScoreResponse = {
  score: number;
};

const generateRandomScore = () => {
  return Math.floor(Math.random() * 900) + 1;
};

const getScore = async ({ ssn }: GetScoreVariables): Promise<GetScoreResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const score = generateRandomScore();

  return { score };
};

export const useGetScore = () => {
  return useMutation({
    mutationKey: ['get-score'],
    mutationFn: (variables: GetScoreVariables) => getScore(variables),
  });
};
