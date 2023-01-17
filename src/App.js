import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [picking, setPicking] = useState("default");
  const [pickedStudents, setPickedStudents] = useState([]);

  // List of all the students
  let studentsList = [
    "Alexandre A.",
    "André L.",
    "Assebe K.",
    "Caio M.",
    "Caroline K.",
    "Duarte F.",
    "Déborah L.",
    "Erika G.",
    "Eveline C.",
    "Farid C.",
    "Francisco P.",
    "Gabriel G.",
    "Joana G.",
    "José L.",
    "João C.",
    "João R.",
    "Maria C.",
    "Mariana F.",
    "Marisha D.",
    "Miguel J.",
    "Miguel L.",
    "Paulo C.",
    "Pedro L.",
    "Rafaela U.",
    "Tiago R.",
    "Tomás B.",
    "Vanessa V.",
  ];

  // Flip the card and assing a pair to the picking student
  const pickFunction = async (e) => {
    let randomStudent;
    if (
      !e.target.classList.contains("flippedCard") &&
      picking !== "default" &&
      !pickedStudents.includes(randomStudent) &&
      !pickedStudents.includes(picking)
    ) {
      do {
        randomStudent =
          studentsList[Math.floor(Math.random() * studentsList.length)];
      } while (pickedStudents.includes(randomStudent));

      setPickedStudents([randomStudent, picking, ...pickedStudents]);
      e.target.classList.add("flippedCard");
      e.target.textContent = randomStudent;

      results();
    }
  };

  // Keep track of pairs already assigned
  const results = () => {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML += `<li>${pickedStudents[1]} <--> ${pickedStudents[0]}</li>`;
  };

  return (
    <>
      <div className="pickingStudent">
        <img
          src="https://www.datocms-assets.com/14946/1661408107-logo-ironhack-blue.png?auto=format&fit=max&w=1200"
          alt="ironhack logo"
        />

        <select onClick={(e) => setPicking(e.target.value)}>
          <option key="default" value="default">
            Select your name
          </option>
          {studentsList.map((student) => {
            return (
              <option key={student} value={student}>
                {student}
              </option>
            );
          })}
        </select>

        <button
          onClick={() => {
            console.log(pickedStudents);
            console.log(studentsList);
            console.log(picking);
          }}
        >
          console
        </button>
      </div>

      <div className="App">
        {studentsList.map((student) => {
          return (
            <div
              key={student}
              className="card"
              onClick={(e) => pickFunction(e)}
            ></div>
          );
        })}
      </div>

      <ul id="results"></ul>
    </>
  );
}

export default App;
