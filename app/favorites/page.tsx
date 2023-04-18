import EmptyState from '@/app/components/EmptyState';
import FavoritesClient from '@/app/favorites/FavoritesClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getFavoriteListings from '@/app/actions/getFavoriteListings';

export const metadata = {
  title: 'inHome | Favorites',
};

async function FavoritesPage() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}

export default FavoritesPage;
