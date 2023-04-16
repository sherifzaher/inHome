import EmptyState from '@/app/components/EmptyState';
import ClientComponent from '@/app/components/ClientComponent';
import TripsClient from '@/app/trips/TripsClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

export const metadata = {
  title: 'inHome | Trips',
};

async function TripsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientComponent>
        <EmptyState title="Unauthorized" subTitle="Please login" />
      </ClientComponent>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientComponent>
        <EmptyState
          title="No trips found"
          subTitle={"Looks like you haven't any trips"}
        />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientComponent>
  );
}

export default TripsPage;
