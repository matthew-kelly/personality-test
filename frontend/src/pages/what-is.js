import Link from 'next/link';
import Page from '../components/Page';

const WhatIs = () => (
  <Page>
    {/* box */}
    <div className="box">
      {/* heading */}
      <h1 className="page-title -mt-16">What is the Enneagram?</h1>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          metus lectus, condimentum eget tempus quis, vestibulum at libero.
          Donec aliquam erat eget risus interdum, nec tincidunt sapien posuere.
          In suscipit et quam eu pretium. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </div>
    </div>
  </Page>
);

export default WhatIs;
