import Image from 'next/image';
import Answers from '../components/Answers';
import Page from '../components/Page';

export default function QuestionsPage() {
  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="font-display text-10xl leading-none -mt-28">
            <Image src="/img/number-sign.svg" width={72} height={109} />1
          </div>
          <h1 className="page-title">It's Easy.</h1>
          <p>
            I am very perceptive and I often find myself acting as a guardian,
            vigilant about keeping myself and others safe.
          </p>
          <Answers className="bottom-4 p-2" />
        </div>
      </div>
    </Page>
  );
}
