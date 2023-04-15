'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

function EmptyState({
  title = 'No exact matches',
  subTitle = 'Try changing or remove some of your filters',
  showReset,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subTitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            label="Remove all filters"
            onClick={() => router.push('/')}
            outline
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;
