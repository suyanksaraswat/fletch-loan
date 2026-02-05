import { useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import { Spinner } from '@workspace/ui/components/spinner';
import { Input } from '@workspace/ui/components/input';
import { Switch } from '@workspace/ui/components/switch';

import { useLoanStore } from '@/store/loan';
import { useGetScore } from '@/services/loans/useGetScore';

export default function Address() {
  const {
    street,
    city,
    state,
    zipCode,
    fireAlarm,
    updateAddress,
    updateCurrentStep,
    updateFireAlarm,
    ssn,
    updateSSN,
    updateScore,
  } = useLoanStore();

  const [streetForm, setStreetForm] = useState(street || '');
  const [cityForm, setCityForm] = useState(city || '');
  const [stateForm, setStateForm] = useState(state || '');
  const [zipCodeForm, setZipCodeForm] = useState(zipCode || '');
  const [fireAlarmForm, setFireAlarmForm] = useState(fireAlarm ?? false);
  const [ssnForm, setSSNForm] = useState(ssn || '');

  const { mutateAsync: getScore, isPending: isCheckingScore } = useGetScore();

  const maskSsn = (raw: string) => {
    if (!raw) return '';

    if (raw.length <= 7) {
      return 'X'.repeat(raw.length);
    }

    return 'X'.repeat(7) + raw.slice(7);
  };

  const handleChange = (key: string, value: string) => {
    if (key === 'street') {
      setStreetForm(value);
    } else if (key === 'city') {
      setCityForm(value);
    } else if (key === 'state') {
      setStateForm(value);

      if (value === 'FL' && fireAlarmForm === false) {
        setFireAlarmForm(true);
      }
    } else if (key === 'zipCode') {
      setZipCodeForm(value);
    } else if (key === 'ssn') {
      const currentMasked = maskSsn(ssnForm);

      if (
        value.length > currentMasked.length &&
        value.startsWith(currentMasked) &&
        value.length <= 10
      ) {
        const newChar = value[value.length - 1];

        if (/^\d$/.test(newChar ?? '')) {
          const nextRaw = (ssnForm + newChar).slice(0, 10);
          setSSNForm(nextRaw);
        }
      } else if (value.length < currentMasked.length && currentMasked.startsWith(value)) {
        const nextRaw = ssnForm.slice(0, -1);
        setSSNForm(nextRaw);
      }
    }
  };


  return (
    <div>
      <div className="mb-4 flex justify-center gap-4">
        <Input
          placeholder="Street"
          value={streetForm}
          onChange={(e) => handleChange('street', e.target.value)}
        />
        <Input
          placeholder="City"
          value={cityForm}
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <Input
          placeholder="State"
          value={stateForm}
          onChange={(e) => handleChange('state', e.target.value)}
        />
        <Input
          placeholder="Zip Code"
          value={zipCodeForm}
          onChange={(e) => handleChange('zipCode', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h4>SSN</h4>
        <Input
          placeholder="SSN"
          value={maskSsn(ssnForm)}
          maxLength={10}
          onChange={(e) => handleChange('ssn', e.target.value)}
        />
      </div>

      {stateForm === 'FL' && (
        <div>
          <div>
            <h4>Fire Alarm</h4>
            <Switch checked={fireAlarmForm} onCheckedChange={setFireAlarmForm} />
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button
          disabled={!streetForm || !cityForm || !stateForm || !zipCodeForm || isCheckingScore}
          onClick={async () => {
            if (streetForm && cityForm && stateForm && zipCodeForm && ssnForm) {
              try {
                updateAddress(streetForm, cityForm, stateForm, zipCodeForm);
                updateSSN(ssnForm);
                updateFireAlarm(fireAlarmForm);

                const { score } = await getScore({ ssn: ssnForm });
                updateScore(score);
              } catch (error) {
                console.error('Error while checking bureau score', error);
                updateScore(null);
              } finally {
                updateCurrentStep(5);
              }
            }
          }}
        >
          {isCheckingScore ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Checking...
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );
}
