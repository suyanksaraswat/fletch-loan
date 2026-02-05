import { Button } from '@workspace/ui/components/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';

import { useLoanStore } from '@/store/loan';

export default function SelectHouseType() {
  const { form, setForm, updateCurrentStep } = useLoanStore();
  const { houseType } = form;

  const handleChange = (houseType: 'Own' | 'Mortgage' | 'Rented') => {
    setForm({ houseType });
  };

  return (
    <div>
      <div className="flex justify-center gap-4">
        <Select
          value={houseType}
          onValueChange={(value) => handleChange(value as 'Own' | 'Mortgage' | 'Rented')}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a house type</SelectLabel>
              <SelectItem value="Own">Own</SelectItem>
              <SelectItem value="Mortgage">Mortgage</SelectItem>
              <SelectItem value="Rented">Rented</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-10 flex justify-end">
        <Button disabled={!houseType} onClick={() => updateCurrentStep(4)}>
          Next
        </Button>
      </div>
    </div>
  );
}
