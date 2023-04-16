import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';

import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import ListingCard from '@/app/components/Listings/ListingCard';
import ClientComponent from '@/app/components/ClientComponent';

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  // check searchParams to fix searchParams.item error in Next.js 13
  const params = Object.keys(searchParams).length === 0 ? {} : searchParams;
  const listings = await getListings(params);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientComponent>
        <EmptyState showReset />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((list) => (
            <ListingCard key={list.id} data={list} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientComponent>
  );
}
