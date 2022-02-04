import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => (
  <div className="bg-page-background-mobile sm:bg-page-background-desktop min-h-screen bg-fixed bg-cover">
    <Head>
      <title>Enneagram Assessment</title>
    </Head>
    <main className="px-6 xl:px-32">
      {/* logo */}
      <div className="w-full text-center pb-8">
        <div className="border-l-1 border-black h-32 sm:h-64 inline-block">
          <div className="absolute -translate-x-1/2 translate-y-1/2 w-16 sm:w-32">
            <Image
              src="/img/logo.svg"
              width={128}
              height={128}
              layout="responsive"
              sizes="4rem, (min-width: 640px) 8rem"
              alt="logo"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg p-6">
        {/* heading */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl -mt-32 mb-2">
          <span className="font-handwriting text-7xl block">free</span>{' '}
          Enneagram Assessment
        </h1>
        <h2 className="font-sans uppercase tracking-wide text-primary text-lg mb-4">
          Create an Account
        </h2>

        {/* form */}
        <form className="relative pb-12 lg:pb-0 lg:grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>

          <div className="col-span-3">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              I agree to the{' '}
              <Link href="/terms-and-conditions">terms and conditions</Link>.
            </label>
          </div>

          <button
            type="submit"
            className="z-10 block absolute -bottom-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 h-12 w-44 bg-primary font-handwriting"
          >
            <span className="text-6xl relative -top-2">Submit</span>
          </button>
        </form>
      </div>
      <div className="absolute md:relative bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:pt-4 uppercase">
        <Link href="/what-is">What is the Enneagram?</Link>
      </div>
    </main>
  </div>
);

export default Home;
