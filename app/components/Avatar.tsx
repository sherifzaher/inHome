'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}
function Avatar({ src }: AvatarProps) {
  return (
    <Image
      src={src || '/images/placeholder.jpg'}
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
    />
  );
}

export default Avatar;
