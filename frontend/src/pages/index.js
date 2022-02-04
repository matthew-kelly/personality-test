import Link from 'next/link';
import Page from '../components/Page';

const Home = () => (
  <Page>
    {/* box */}
    <div className="box">
      {/* heading */}
      <h1 className="page-title -mt-32">
        <span className="font-handwriting text-7xl block">free</span> Enneagram
        Assessment
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
          className="button z-10 absolute -bottom-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-44"
        >
          <span className="button-text">Submit</span>
        </button>
      </form>
    </div>
    <div className="absolute md:relative bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:pt-4 uppercase">
      <Link href="/what-is">What is the Enneagram?</Link>
    </div>
  </Page>
);

export default Home;
