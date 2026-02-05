import { Button } from '@workspace/ui/components/button';
import { Spinner } from '@workspace/ui/components/spinner';
import { Input } from '@workspace/ui/components/input';
import { Switch } from '@workspace/ui/components/switch';

import { useLoanStore } from '@/store/loan';
import { useGetScore } from '@/services/loans/useGetScore';

export default function Address() {
  const { form, setForm, updateCurrentStep } = useLoanStore();
  const { street, city, state, zipCode, fireAlarm, ssn } = form;

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
      setForm({ street: value });
    } else if (key === 'city') {
      setForm({ city: value });
    } else if (key === 'state') {
      setForm({
        state: value,
        fireAlarm: value === 'FL' ? true : fireAlarm,
      });
    } else if (key === 'zipCode') {
      setForm({ zipCode: value });
    } else if (key === 'ssn') {
      const currentMasked = maskSsn(ssn);

      if (
        value.length > currentMasked.length &&
        value.startsWith(currentMasked) &&
        value.length <= 10
      ) {
        const newChar = value[value.length - 1];

        if (/^\d$/.test(newChar ?? '')) {
          const nextRaw = (ssn + newChar).slice(0, 10);
          setForm({ ssn: nextRaw });
        }
      } else if (value.length < currentMasked.length && currentMasked.startsWith(value)) {
        const nextRaw = ssn.slice(0, -1);
        setForm({ ssn: nextRaw });
      }
    }
  };


  return (
    <div>
      <div className="mb-4 flex justify-center gap-4">
        <Input
          placeholder="Street"
          value={street}
          onChange={(e) => handleChange('street', e.target.value)}
        />
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <Input
          placeholder="State"
          value={state}
          onChange={(e) => handleChange('state', e.target.value)}
        />
        <Input
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h4>SSN</h4>
        <Input
          placeholder="SSN"
          value={maskSsn(ssn)}
          maxLength={10}
          onChange={(e) => handleChange('ssn', e.target.value)}
        />
      </div>

      {state === 'FL' && (
        <div>
          <div>
            <h4>Fire Alarm</h4>
            <Switch checked={fireAlarm} onCheckedChange={(checked) => setForm({ fireAlarm: checked })} />
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Button
          disabled={!street || !city || !state || !zipCode || isCheckingScore}
          onClick={async () => {
            if (street && city && state && zipCode && ssn) {
              try {
                const { score } = await getScore({ ssn });
                setForm({ score });
              } catch (error) {
                console.error('Error while checking bureau score', error);
                setForm({ score: null });
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
