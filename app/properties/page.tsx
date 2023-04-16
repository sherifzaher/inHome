import EmptyState from '@/app/components/EmptyState';
import PropertiesClient from '@/app/properties/PropertiesClient';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';
import ClientComponent from '@/app/components/ClientComponent';

export const metadata = {
  title: 'inHome | Properties',
};

async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientComponent>
        <EmptyState title="Unauthorized" subTitle="Please login" />;
      </ClientComponent>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientComponent>
        <EmptyState
          title="No properties found"
          subTitle="Looks like you have no properties"
        />
      </ClientComponent>
    );
  }

  return (
    <ClientComponent>
      <PropertiesClient listings={listings} currentUser={currentUser} />;
    </ClientComponent>
  );
}

export default PropertiesPage;
