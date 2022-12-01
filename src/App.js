import { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export default function App() {
  const question_json = [
    {
      question: "What does HTML stand for?",
      option: [
        "Home Tool Markup Language",
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Who is making the Web standards?",
      option: [
        "Google",
        "Microsoft",
        "Mozilla",
        "The World Wide Web Consortium"
      ],
      answer: "The World Wide Web Consortium"
    },
    {
      question: "Choose the correct HTML element for the largest heading:",
      option: ["<h6>", "<heading>", "<h1>", "<head>"],
      answer: "<h1>"
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      option: ["<br>", "<lb>", "<break>"],
      answer: "<br>"
    },
    {
      question: "What is the correct HTML for adding a background color?",
      option: [
        "<body bg='yellow'>",
        "<body style='background-color:yellow;'>",
        "<background>yellow</background>"
      ],
      answer: "<body style='background-color:yellow;'>"
    },
    {
      question: "Choose the correct HTML element to define important text",
      option: ["<i>", "<strong>", "<b>", "<important>"],
      answer: "<b>"
    },
    {
      question: "Choose the correct HTML element to define emphasized text",
      option: ["<i>", "<italic>", "<em>"],
      answer: "<i>"
    },
    {
      question: "What is the correct HTML for creating a hyperlink?",
      option: [
        "<a href='http://www.w3schools.com'>W3Schools</a>",
        "<a>http://www.w3schools.com</a>",
        "<a url='http://www.w3schools.com'>W3Schools.com</a>",
        "<a name='http://www.w3schools.com'>W3Schools.com</a>"
      ],
      answer: "<a href='http://www.w3schools.com'>W3Schools</a>"
    },
    {
      question: "Which character is used to indicate an end tag?",
      option: ["<", "*", "^", "/"],
      answer: "/"
    },
    {
      question: "How can you open a link in a new tab/browser window?",
      option: [
        "<a href='url' target='_blank'>",
        "<a href='url' target='new'>",
        "<a href='url' new>"
      ],
      answer: "<a href='url' target='_blank'>"
    }
  ];
  const form = useForm();
  console.log(form.getValues());
  const total_question = question_json.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userScore, setUserScore] = useState(0);

  const handleNext = () => {
    if (total_question > currentIndex + 1) {
      console.log("yyy");
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("no more question");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      alert("no more question");
    }
  };

  const handleFirst = () => {
    setCurrentIndex(0);
  };

  const handleLast = () => {
    console.log(currentIndex, total_question);
    setCurrentIndex(total_question - 1);
  };

  const handleOnChangeOption = (e, value, index) => {
    form.setValue(`answer[qstn_${currentIndex}]`, value);
    console.log(value, index, "option", e);
    setAnswers([
      ...answers,
      ...[{ qstn_no: index + 1, selected_option: value }]
    ]);
  };

  const handleSubmit = () => {
    const values = form.getValues();
    if (values.length > 0) {
    }
    setUserScore();
  };

  return (
    <div className="App">
      <div className="quiz-title">Quiz Application</div>
      <div className="quiz-header">ASP .NET QuiZ</div>
      <div className="question-section">
        <div className="question-tag">Question no: {currentIndex + 1}</div>
        <div className="question-card">
          <div>{question_json[currentIndex].question}</div>

          {question_json[currentIndex].option.map((f) => {
            return (
              <div className="option-render" key={f}>
                <div className="options">
                  <input
                    type="checkbox"
                    checked={
                      form.getValues(`answer[qstn_${currentIndex}]`) === f
                    }
                    {...form.register(`answer[qstn_${currentIndex}]`)}
                    value={f}
                    onChange={(e) => handleOnChangeOption(e, f, currentIndex)}
                  />
                  <span className="option-text">{f}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="end-line"></div>
        <div className="action-cta">
          <button onClick={() => handleFirst()}>First</button>
          <button
            disabled={form.getValues(`answer[qstn_${currentIndex}]`)}
            onClick={() => handlePrev()}
          >
            Prev
          </button>
          <button onClick={() => handleNext()}>Next</button>
          <button onClick={() => handleLast()}>Last</button>
        </div>
        <div className="pagination">
          {[...Array(total_question)].map((x, i) => (
            <button
              disabled={form.getValues(`answer[qstn_${i}]`)}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="end-line"></div>
        <div className="submit-quiz">
          <button>QuiZ</button>
          <button>Review</button>
          <button onClick={() => handleSubmit()}>Submit Quiz</button>
        </div>
      </div>
    </div>
  );
}
