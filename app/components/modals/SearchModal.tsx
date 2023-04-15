'use client';

import qs from 'query-string';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { formatISO } from 'date-fns';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';

import useSearchModal from '@/app/hooks/useSearchModal';
import CountrySelect, {
  CountrySelectValue,
} from '@/app/components/inputs/CountrySelect';
import Calendar from '@/app/components/inputs/Calendar';
import Counter from '@/app/components/inputs/Counter';
import Loader from '@/app/components/Loader';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      bathroomCount,
      roomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  // const onSubmit = useCallback(async () => {
  //   if (step !== STEPS.INFO) {
  //     return onNext();
  //   }
  //
  //   let currentQuery = {};
  //
  //   if (params) {
  //     currentQuery = qs.parse(params.toString());
  //   }
  //
  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     locationValue: location?.value,
  //     guestCount,
  //     roomCount,
  //     bathroomCount,
  //   };
  //
  //   if (dateRange.startDate) {
  //     updatedQuery.startDate = formatISO(dateRange.startDate);
  //   }
  //
  //   if (dateRange.endDate) {
  //     updatedQuery.endDate = formatISO(dateRange.endDate);
  //   }
  //
  //   const url = qs.stringifyUrl(
  //     {
  //       url: '/',
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );
  //
  //   setStep(STEPS.LOCATION);
  //   searchModal.onClose();
  //   router.push(url);
  // }, [
  //   bathroomCount,
  //   dateRange.endDate,
  //   dateRange.startDate,
  //   guestCount,
  //   location?.value,
  //   onNext,
  //   params,
  //   roomCount,
  //   router,
  //   searchModal,
  //   step,
  // ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="find the perfect location!"
      />
      <CountrySelect
        onChange={(value) => setLocation(value as CountrySelectValue)}
        value={location}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={setGuestCount}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={setRoomCount}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={setBathroomCount}
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <Modal
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        title="Filters"
        body={bodyContent}
        isOpen={searchModal.isOpen}
      />
    </Suspense>
  );
}

export default SearchModal;
