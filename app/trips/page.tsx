import EmptyState from '@/app/components/EmptyState';
import TripsClient from '@/app/trips/TripsClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

export const metadata = {
  title: 'inHome | Trips',
};

async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle={"Looks like you haven't any trips"}
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}

export default TripsPage;
