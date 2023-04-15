'use client';

import { useEffect } from 'react';
import EmptyState from '@/app/components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

function Error({ error }: ErrorStateProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh oh" subTitle="Something went wrong!" />;
}

export default Error;
