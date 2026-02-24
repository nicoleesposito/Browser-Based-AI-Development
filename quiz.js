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

const results = {
  classic: {
    label: 'The Classic',
    description: 'You value precision and consistency. Your style is polished, put-together, and always works for you.',
    service: "Women's Haircut & Blowout",
    serviceDesc: 'Consultation, shampoo, precision cut, and styled finish — from $75',
    link: 'services.html#cuts-styling'
  },
  bold: {
    label: 'The Bold',
    description: "You love colour and aren't afraid to turn heads. You're ready for a real transformation.",
    service: 'Single Process Colour',
    serviceDesc: 'All-over colour application with premium dyes — from $95',
    link: 'services.html#colour'
  },
  natural: {
    label: 'The Natural',
    description: 'Effortless and sun-kissed is your sweet spot. You want dimension that looks like it happened on its own.',
    service: 'Balayage / Ombré',
    serviceDesc: 'Hand-painted highlights for a natural, sun-kissed effect — from $150',
    link: 'services.html#colour'
  },
  healthy: {
    label: 'The Nurturer',
    description: 'Your hair health comes first. You want strength, softness, and to undo the damage.',
    service: 'Deep Conditioning Treatment',
    serviceDesc: 'Intensive moisture and repair for dry or damaged hair — from $40',
    link: 'services.html#treatments'
  }
};

function showResults() {
  const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const result = results[winner];
  const container = document.getElementById('quiz-container');
  if (!container) return;
  container.innerHTML = `
    <div class="quiz-result">
      <p class="quiz-result-eyebrow">Your style is</p>
      <h2 class="quiz-result-title">${result.label}</h2>
      <p class="quiz-result-desc">${result.description}</p>
      <div class="quiz-result-service">
        <p class="quiz-result-service-label">We recommend</p>
        <p class="quiz-result-service-name">${result.service}</p>
        <p class="quiz-result-service-desc">${result.serviceDesc}</p>
        <a href="${result.link}" class="btn btn-primary">See All Services</a>
      </div>
      <button type="button" class="btn btn-secondary" id="retake-btn">Retake Quiz</button>
    </div>
  `;

  document.getElementById('retake-btn').addEventListener('click', () => {
    Object.keys(scores).forEach(key => { scores[key] = 0; });
    currentQuestion = 0;
    renderQuestion(0);
  });
}

function renderQuestion(index) {
  const container = document.getElementById('quiz-container');
  if (!container) return;

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
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuestion(0);

  document.getElementById('quiz-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-answer-btn');
    if (!btn) return;
    const style = btn.dataset.style;
    if (style in scores) {
      scores[style]++;
    }
    currentQuestion++;
    if (currentQuestion >= quizData.length) {
      showResults();
      return;
    }
    renderQuestion(currentQuestion);
  });
});
