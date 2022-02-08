export default function Answers({ className, disabled = false }) {
  return (
    <div
      className={`${className} flex justify-between absolute sm:relative sm:max-w-md sm:mx-auto w-full left-0 px-2`}
    >
      <button className="answer" disabled={disabled} type="button">
        Never
      </button>
      <button className="answer" disabled={disabled} type="button">
        Meh
      </button>
      <button className="answer" disabled={disabled} type="button">
        50/50
      </button>
      <button className="answer" disabled={disabled} type="button">
        Sure
      </button>
      <button className="answer" disabled={disabled} type="button">
        100%
      </button>
    </div>
  );
}
