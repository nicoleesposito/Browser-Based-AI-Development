const quizData = [
  {
    question: "What's your hair goal right now?",
    answers: [
      { text: "A clean, polished cut that works every day", style: "classic" },
      { text: "A colour transformation I've been dreaming about", style: "bold" },
      { text: "A soft, effortless look that feels like me", style: "natural" },
      { text: "Healthier, stronger hair from the inside out", style: "healthy" }
    ]
  },
  {
    question: "How much time do you spend styling your hair each morning?",
    answers: [
      { text: "Under 5 minutes — I keep it simple", style: "classic" },
      { text: "20+ minutes — styling is part of my routine", style: "bold" },
      { text: "About 10 minutes — quick but intentional", style: "natural" },
      { text: "I'm trying to spend less time with heat tools", style: "healthy" }
    ]
  },
  {
    question: "Pick the vibe that feels most like you:",
    answers: [
      { text: "Polished and put-together", style: "classic" },
      { text: "Expressive and head-turning", style: "bold" },
      { text: "Effortless and sun-kissed", style: "natural" },
      { text: "Grounded and low-maintenance", style: "healthy" }
    ]
  },
  {
    question: "When you look in the mirror, what would make you happiest?",
    answers: [
      { text: "A sharp, well-shaped cut", style: "classic" },
      { text: "Vibrant, eye-catching colour", style: "bold" },
      { text: "Soft, blended dimension", style: "natural" },
      { text: "Silky, frizz-free texture", style: "healthy" }
    ]
  },
  {
    question: "Which word describes your relationship with your hair?",
    answers: [
      { text: "Structured", style: "classic" },
      { text: "Adventurous", style: "bold" },
      { text: "Relaxed", style: "natural" },
      { text: "Nurturing", style: "healthy" }
    ]
  }
];

const scores = { classic: 0, bold: 0, natural: 0, healthy: 0 };
let currentQuestion = 0;

function renderQuestion(index) {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  if (index >= quizData.length) return;

  const { question, answers } = quizData[index];

  container.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = question;
  container.appendChild(h2);

  const answerList = document.createElement('div');
  answerList.className = 'quiz-answers';

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-answer-btn';
    btn.textContent = answer.text;
    btn.dataset.style = answer.style;
    answerList.appendChild(btn);
  });

  container.appendChild(answerList);

  answerList.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-answer-btn');
    if (!btn) return;
    const style = btn.dataset.style;
    if (style in scores) {
      scores[style]++;
    }
    console.log(scores);
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
      container.innerHTML = '<p>Quiz complete!</p>';
      return;
    }
    renderQuestion(currentQuestion);
  });
}

document.addEventListener('DOMContentLoaded', () => renderQuestion(0));
