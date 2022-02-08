export default function Answers({ className, disabled = false, submitAnswer }) {
  const handleSubmit = (event, value) => {
    event.preventDefault();
    submitAnswer(value);
  };

  return (
    <div
      className={`${className} flex justify-between absolute sm:relative sm:max-w-md sm:mx-auto w-full left-0 px-2`}
    >
      <button
        className="answer"
        disabled={disabled}
        onClick={(event) => {
          handleSubmit(event, 1);
        }}
        type="button"
      >
        Never
      </button>
      <button
        className="answer"
        disabled={disabled}
        onClick={(event) => {
          handleSubmit(event, 2);
        }}
        type="button"
      >
        Meh
      </button>
      <button
        className="answer"
        disabled={disabled}
        onClick={(event) => {
          handleSubmit(event, 3);
        }}
        type="button"
      >
        50/50
      </button>
      <button
        className="answer"
        disabled={disabled}
        onClick={(event) => {
          handleSubmit(event, 4);
        }}
        type="button"
      >
        Sure
      </button>
      <button
        className="answer"
        disabled={disabled}
        onClick={(event) => {
          handleSubmit(event, 5);
        }}
        type="button"
      >
        100%
      </button>
    </div>
  );
}
