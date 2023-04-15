'use client';

import { SafeUser } from '@/app/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '@/app/hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

function HeartButton({ listingId, currentUser }: HeartButtonProps) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
}

export default HeartButton;
