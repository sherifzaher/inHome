import EmptyState from '@/app/components/EmptyState';
import FavoritesClient from '@/app/favorites/FavoritesClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getFavoriteListings from '@/app/actions/getFavoriteListings';
import ClientComponent from '@/app/components/ClientComponent';

export const metadata = {
  title: 'inHome | Favorites',
};

async function FavoritesPage() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientComponent>
        <EmptyState
          title="No favorites found"
          subTitle="Looks like you have no favorite listings."
        />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientComponent>
  );
}

export default FavoritesPage;
