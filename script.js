let subjectCount = 0;

function addSubject() {
    subjectCount++;
    const container = document.getElementById('inputFields');

    const div = document.createElement('div')
    div.innerHTML = 
    <label>Subject ${subjectCount} GPA: <input type = "number" step = "0.01" min="0" max="10" name="gpa${subjectCount}" required></input></label>
    container.appendChild(div);
}

document.getElementById('cgpaForm').addEventListener('submit', function(e) {
    e.preventDefault();

 let total = 0;
  for (let i = 1; i <= subjectCount; i++) {
    const value = parseFloat(document.querySelector(`[name=gpa${i}]`).value);
    total += value;
  }

  const cgpa = total / subjectCount;
  document.getElementById('result').innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;
});