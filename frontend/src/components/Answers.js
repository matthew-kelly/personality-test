export default function Answers({ className }) {
  return (
    <div
      className={`${className} flex justify-between absolute sm:relative sm:max-w-md sm:mx-auto w-full left-0 px-2`}
    >
      <button className="answer" type="button">
        Never
      </button>
      <button className="answer" type="button">
        Meh
      </button>
      <button className="answer" type="button">
        50/50
      </button>
      <button className="answer" type="button">
        Sure
      </button>
      <button className="answer" type="button">
        100%
      </button>
    </div>
  );
}
