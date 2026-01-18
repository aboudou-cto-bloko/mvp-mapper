const STORAGE_KEYS = {
  idea: "mvp-mapper-idea",
  answers: "mvp-mapper-answers",
};

export function saveAnswer(questionId, answer) {
  const answers = getAllAnswers();
  answers[questionId] = answer;
  localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers));
}

export function getAnswer(questionId) {
  const answers = getAllAnswers();
  return answers[questionId] || "";
}

export function getAllAnswers() {
  const stored = localStorage.getItem(STORAGE_KEYS.answers);
  return stored ? JSON.parse(stored) : {};
}

export function getIdea() {
  return localStorage.getItem(STORAGE_KEYS.idea) || "";
}

export function saveIdea(idea) {
  localStorage.setItem(STORAGE_KEYS.idea, idea);
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.idea);
  localStorage.removeItem(STORAGE_KEYS.answers);
}

export function isFlowComplete() {
  const answers = getAllAnswers();
  return Object.keys(answers).length === 5;
}
