import { gql, useQuery } from '@apollo/client';
import { shuffle } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Answers from '../components/Answers';
import Page from '../components/Page';

const QUESTIONS_QUERY = gql`
  query QUESTIONS_QUERY {
    questions(
      where: {
        answer: {
          none: {
            AND: [{ user: { id: { equals: "ckzd4rz8a0028g4pgxjdhmbiy" } } }]
          }
        }
      }
    ) {
      id
      question
    }
    questionsCount
  }
`;

export default function QuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const { data, loading, error } = useQuery(QUESTIONS_QUERY, {
    onCompleted: (res) => {
      // check to see if there are any questions left
      if (res.questions && res.questions.length > 0) {
        setQuestions(shuffle(res.questions));
      } else {
        router.push('/results');
      }
    },
  });
  useEffect(() => {
    if (data?.questionsCount) {
      setQuestionNumber(data.questionsCount - data.questions.length + 1);
    }
  }, [data]);
  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="font-display text-10xl leading-none -mt-28">
            <Image src="/img/number-sign.svg" width={72} height={109} />
            {questionNumber !== 0 && questionNumber}
          </div>
          <h1 className="page-title">It's Easy.</h1>
          <p>{questions.length && questions[0].question}</p>
          <Answers className="bottom-4 p-2" />
        </div>
      </div>
    </Page>
  );
}
