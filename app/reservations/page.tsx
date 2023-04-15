import EmptyState from '@/app/components/EmptyState';
import ReservationsClient from '@/app/reservations/ReservationsClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

export const metadata = {
  title: 'inHome | Reservations',
};

async function ReservationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="looks like you have no reservations on your property"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}

export default ReservationsPage;
