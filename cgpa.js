// Mapping grade letters to grade points
const gradeMap = {
  "A++": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "D": 0
};

// Dynamically generate subject input fields
function generateSubjects() {
  const count = parseInt(document.getElementById("subjectCount").value);
  const container = document.getElementById("subjectFields");
  container.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.classList.add("subject-box");
    div.innerHTML = `
      <h4>Subject #${i}</h4>
      <label for="grade${i}">Grade:</label>
      <select name="grade${i}" id="grade${i}">
        <option value="A++">A++</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <label>Credit:
        <input type="number" name="credit${i}" step="0.1" min="0" max="10" required>
      </label>
    `;
    container.appendChild(div);
  }
}

// Handle CGPA calculation on form submit
document.getElementById("cgpaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const errorBox = document.getElementById("errorMessage");
  const resultBox = document.getElementById("cgpaResult");
  errorBox.innerText = "";
  resultBox.innerText = "";

  const count = parseInt(document.getElementById("subjectCount").value);
  if (!count || document.getElementById("subjectFields").children.length === 0) {
    errorBox.innerText = "⚠️ Please generate subjects before calculating CGPA.";
    return;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= count; i++) {
    const gradeSelect = document.querySelector(`[name=grade${i}]`);
    const creditInput = document.querySelector(`[name=credit${i}]`);

    if (!gradeSelect || !creditInput) {
      errorBox.innerText = `⚠️ Missing inputs for Subject #${i}`;
      return;
    }

    const gradeLetter = gradeSelect.value;
    const grade = gradeMap[gradeLetter];
    const credit = parseFloat(creditInput.value);

    if (isNaN(grade) || isNaN(credit)) {
      errorBox.innerText = `⚠️ Please enter valid grade and credit for Subject #${i}`;
      return;
    }

    totalPoints += grade * credit;
    totalCredits += credit;
  }

  const prevCgpa = parseFloat(document.getElementById("prevCgpa").value);
  const prevCredits = parseFloat(document.getElementById("prevCredits").value);

  const totalOverallCredits = totalCredits + prevCredits;
  const totalOverallPoints = totalPoints + (prevCgpa * prevCredits);

  const newCgpa = totalOverallCredits === 0 ? 0 : (totalOverallPoints / totalOverallCredits).toFixed(2);

  resultBox.innerText = `🎉 Your CGPA is: ${newCgpa}`;
});
