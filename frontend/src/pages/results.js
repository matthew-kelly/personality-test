import { gql, useQuery } from '@apollo/client';
import Diagram from '../components/Diagram';
import Page from '../components/Page';

const TYPES_QUERY = gql`
  query TYPES_QUERY {
    types {
      id
      type
      subheading
    }
  }
`;

export default function ResultsPage() {
  const { data, loading, error } = useQuery(TYPES_QUERY);
  console.log({ data });
  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="page-title leading-none -mt-28">
            <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">
              Hello
            </div>
            Three
          </div>
          <div className="max-w-md mx-auto mb-5">
            <Diagram />
          </div>
          <p className="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            metus lectus, condimentum eget tempus quis, vestibulum at libero.
            Donec aliquam erat eget risus interdum, nec tincidunt sapien
            posuere. In suscipit et quam eu pretium. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </div>
      </div>
    </Page>
  );
}
