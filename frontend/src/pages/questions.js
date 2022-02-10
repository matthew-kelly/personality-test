import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { shuffle } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Answers from '../components/Answers';
import Auth from '../components/Auth';
import Page from '../components/Page';
import { useUser } from '../hooks/User';

const QUESTIONS_QUERY = gql`
  query QUESTIONS_QUERY($id: ID!) {
    questions(
      where: { answer: { none: { AND: [{ user: { id: { equals: $id } } }] } } }
    ) {
      id
      question
    }
    questionsCount
  }
`;

const CREATE_ANSWER_MUTATION = gql`
  mutation CREATE_ANSWER_MUTATION(
    $userId: ID!
    $questionId: ID!
    $answer: Int!
  ) {
    createAnswer(
      data: {
        answer: $answer
        user: { connect: { id: $userId } }
        question: { connect: { id: $questionId } }
      }
    ) {
      id
    }
  }
`;

export default function QuestionsPage() {
  const router = useRouter();
  const user = useUser();
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [getQuestions, { data, loading, error }] = useLazyQuery(
    QUESTIONS_QUERY,
    {
      onCompleted: (res) => {
        // check to see if there are any questions left
        if (res.questions && res.questions.length > 0) {
          setQuestions(shuffle(res.questions));
        } else {
          router.push('/results');
        }
      },
    }
  );

  useEffect(() => {
    if (user?.id) {
      getQuestions({
        variables: {
          id: user.id,
        },
      });
    }
  }, [user]);

  const [createAnswer, createAnswerMutationResults] = useMutation(
    CREATE_ANSWER_MUTATION,
    {
      onCompleted: () => {
        const newPosition = currentPosition + 1;
        if (newPosition < data.questions.length) {
          setCurrentPosition(newPosition);
          setQuestionNumber((prevValue) => prevValue + 1);
        } else {
          router.push('/results');
        }
      },
    }
  );

  useEffect(() => {
    if (data?.questionsCount) {
      setQuestionNumber(data.questionsCount - data.questions.length + 1);
    }
  }, [data]);

  const submitAnswer = (answer) => {
    console.log('submitting answer', answer);
    createAnswer({
      variables: {
        userId: user.id,
        questionId: questions[currentPosition].id,
        answer,
      },
    });
  };

  return (
    <Auth>
      <Page>
        <div className="box">
          <div className="content text-center">
            <div className="font-display text-10xl leading-none -mt-28">
              <Image src="/img/number-sign.svg" width={72} height={109} />
              {questionNumber !== 0 && questionNumber}
            </div>
            {/* <h1 className="page-title">It's Easy.</h1> */}
            <p className="text-2xl">
              {questions.length && questions[currentPosition].question}
            </p>
            <Answers submitAnswer={submitAnswer} className="bottom-4 p-2" />
          </div>
        </div>
      </Page>
    </Auth>
  );
}
