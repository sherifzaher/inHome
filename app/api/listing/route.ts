import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const data = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    bathroomCount,
    price,
    roomCount,
    guestCount,
    location,
  } = data;

  Object.keys(data).forEach((value: any) => {
    if (!data[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
