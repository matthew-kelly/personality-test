import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { groupBy, sumBy } from 'lodash';
import { useEffect, useState } from 'react';
import Auth from '../components/Auth';
import Diagram from '../components/Diagram';
import Page from '../components/Page';
import { useUser } from '../hooks/User';

const TYPE_QUERY = gql`
  query TYPES_QUERY($type: Int!) {
    types(where: { type: { equals: $type } }) {
      id
      type
      subheading
      description
    }
  }
`;

const ANSWERS_QUERY = gql`
  query ANSWERS_QUERY($id: ID!) {
    answers(where: { user: { id: { equals: $id } } }) {
      id
      answer
      question {
        type {
          type
        }
      }
    }
  }
`;

export default function ResultsPage() {
  const user = useUser();
  const [result, setResult] = useState(0);

  const numberSpelledOut = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];

  const gradeQuiz = (groupedAnswers) => {
    let highestGrade = 0;
    let typeWithHighestGrade = 0;
    // loop over each item in object (grouped by type)
    for (const [key, value] of Object.entries(groupedAnswers)) {
      // add up all answers
      const typeSum = sumBy(value, (item) => item.answer);
      if (typeSum > highestGrade) {
        highestGrade = typeSum;
        typeWithHighestGrade = Number(key);
      }
    }
    return typeWithHighestGrade;
  };

  const [
    getUserAnswers,
    { data: answerData, loading: answerLoading, error: answerError },
  ] = useLazyQuery(ANSWERS_QUERY, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
    onCompleted: () => {
      // FIXME: answerData is undefined on first visit without refresh - apollo query cache issue?
      const groupedAnswers = groupBy(
        answerData.answers,
        (item) => item.question.type.type
      );
      const res = gradeQuiz(groupedAnswers);
      setResult(res);
    },
  });

  useEffect(() => {
    if (user?.id) {
      getUserAnswers({
        variables: {
          id: user.id,
        },
      });
    }
  }, [user]);

  const [
    getTypeDetails,
    { data: typeData, loading: typeLoading, error: typeError },
  ] = useLazyQuery(TYPE_QUERY);

  useEffect(() => {
    if (result) {
      getTypeDetails({
        variables: {
          type: result,
        },
      });
    }
  }, [result]);

  return (
    <Auth>
      <Page>
        <div className="box">
          <div className="content text-center">
            <div className="page-title leading-none -mt-28">
              <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">
                Hello
              </div>
              {typeData?.types[0] && numberSpelledOut[typeData.types[0].type]}
              <br />
              {typeData?.types[0] && typeData.types[0].subheading}
            </div>
            <div className="max-w-md mx-auto my-5">
              <Diagram result={result} />
            </div>
            <p className="text-left mb-0">
              {typeData?.types[0] && typeData.types[0].description}
            </p>
          </div>
        </div>
      </Page>
    </Auth>
  );
}
