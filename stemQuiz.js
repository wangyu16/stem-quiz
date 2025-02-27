export async function startStemQuiz(containerId, initialQuestionUrl) {
  const container = document.getElementById(containerId);
  if (!container) return console.error("Container not found!");

  // Basic HTML structure
  container.innerHTML = `
    <div id="question-display"></div>
    <input type="text" id="user-answer" placeholder="Your answer">
    <button id="submit-answer">Submit</button>
    <button id="new-question" style="display:none;">New Question</button>
    <p id="feedback"></p>
  `;

  const questionDisplay = container.querySelector("#question-display");
  const userAnswer = container.querySelector("#user-answer");
  const submitButton = container.querySelector("#submit-answer");
  const newQuestionButton = container.querySelector("#new-question");
  const feedback = container.querySelector("#feedback");

  let currentQuestion = null;

  // Fetch and display a question
  async function loadQuestion(url) {
    try {
      const response = await fetch(url);
      currentQuestion = await response.json();
      questionDisplay.innerHTML = currentQuestion.question;
      userAnswer.value = "";
      feedback.textContent = "";
      submitButton.style.display = "block";
      newQuestionButton.style.display = "none";
    } catch (error) {
      feedback.textContent = "Error loading question!";
      console.error(error);
    }
  }

  // Check user answer
  function checkAnswer() {
    const answer = userAnswer.value.trim();
    if (answer === currentQuestion.answer) {
      feedback.textContent = "Correct!";
      newQuestionButton.style.display = "block";
      submitButton.style.display = "none";
    } else {
      feedback.textContent = "Try again!";
    }
  }

  // Load initial question
  await loadQuestion(initialQuestionUrl);

  // Event listeners
  submitButton.addEventListener("click", checkAnswer);
  newQuestionButton.addEventListener("click", async () => {
    // For simplicity, fetch a random question from a predefined list or generate one
    const newUrl = "https://raw.githubusercontent.com/your-repo/questions/main/question" + Math.floor(Math.random() * 5 + 1) + ".json";
    await loadQuestion(newUrl);
  });
}

