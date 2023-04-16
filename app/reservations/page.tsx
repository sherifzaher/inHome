import EmptyState from '@/app/components/EmptyState';
import ReservationsClient from '@/app/reservations/ReservationsClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import ClientComponent from '@/app/components/ClientComponent';

export const metadata = {
  title: 'inHome | Reservations',
};

async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientComponent>
        <EmptyState title="Unauthorized" subTitle="Please login" />
      </ClientComponent>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientComponent>
        <EmptyState
          title="No reservations found"
          subTitle="looks like you have no reservations on your property"
        />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientComponent>
  );
}

export default ReservationsPage;
