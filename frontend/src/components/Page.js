import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ children }) => (
  <div className="bg-page-background-mobile sm:bg-page-background-desktop min-h-screen bg-fixed bg-cover">
    <Head>
      <title>Enneagram Assessment</title>
    </Head>
    <main className="px-6 xl:px-32">
      {/* logo */}
      <div className="w-full text-center pb-8">
        <div className="border-l-1 border-black h-32 sm:h-64 inline-block">
          <div className="absolute -translate-x-1/2 translate-y-1/2 w-16 sm:w-32">
            <Link href="/">
              <a>
                <Image
                  src="/img/logo.svg"
                  width={128}
                  height={128}
                  layout="responsive"
                  sizes="4rem, (min-width: 640px) 8rem"
                  alt="logo"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      {children}
    </main>
  </div>
);

export default Page;
