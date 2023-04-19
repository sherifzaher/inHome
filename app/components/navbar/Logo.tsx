'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Logo() {
  const router = useRouter();
  return (
    // <Image
    //   onClick={() => router.push('/')}
    //   src="/images/logo.png"
    //   alt="Logo"
    //   className="hidden cursor-pointer md:block"
    //   height={100}
    //   width={100}
    // />
    <Link href="/" className="text-lg font-bold md:text-lg lg:text-3xl">
      inHome
    </Link>
  );
}

export default Logo;
