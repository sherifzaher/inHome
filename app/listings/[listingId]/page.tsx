import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from '@/app/listings/[listingId]/ListingClient';
import ClientComponent from '@/app/components/ClientComponent';

interface IParams {
  listingId?: string;
}

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientComponent>
        <EmptyState />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientComponent>
  );
}

export default ListingPage;
