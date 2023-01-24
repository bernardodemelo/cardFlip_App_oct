import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Original list of all the students
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

  const [pickedStudents, setPickedStudents] = useState([]);
  const [queue, setQueue] = useState([...studentsList]);

  // Get half of the cards
  const numOfCards = studentsList.length / 2 + 1;

  // Add picking student to the  pickedStudents array
  const selectStudent = (e) => {
    if (e.target.value !== "default") {
      let picking = e.target.value;
      setPickedStudents([picking, ...pickedStudents]);
    }
  };

  const pickFunction = (e) => {
    // Assign a random person to the picking student
    let randomStudent;
    if (
      !e.target.classList.contains("flippedCard") &&
      document.getElementById("selectStudents").value !== "default"
    ) {
      do {
        randomStudent = queue[Math.floor(Math.random() * queue.length)];
      } while (pickedStudents.includes(randomStudent));

      // Update the array of already picked students
      setPickedStudents([randomStudent, ...pickedStudents]);

      // Flip the card
      e.target.classList.add("flippedCard");
      e.target.textContent = randomStudent;

      // Reset select dropdown to default option
      document.getElementById("selectStudents").value = "default";

      // Remove already assigned students from the select dropdown
      let remaining = studentsList.filter(
        (student) => !pickedStudents.includes(student)
      );
      setQueue(remaining);
    }
  };

  useEffect(() => {
    // Keep track of pairs already assigned
    const resultsList = document.getElementById("results");
    if (pickedStudents.length > 1 && pickedStudents.length % 2 === 0) {
      resultsList.innerHTML += `<li>${pickedStudents[1]} 🤝 ${pickedStudents[0]}</li>`;
    }
  }, [pickedStudents]);

  return (
    <>
      {/* BACKGROUND ANIMATION */}
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {/* ------------------- */}

        <div className="pickingStudent">
          <img
            src="https://www.datocms-assets.com/14946/1661408107-logo-ironhack-blue.png?auto=format&fit=max&w=1200"
            alt="ironhack logo"
          />

          <select
            id="selectStudents"
            className="classic"
            onClick={(e) => selectStudent(e)}
          >
            <option key="default" value="default">
              Select your name
            </option>
            {queue.map((student) => {
              return (
                <option key={student} value={student}>
                  {student}
                </option>
              );
            })}
          </select>

          {/*         <button
          onClick={() => {
            console.log(`-----------------------`);
            console.log(
              `Picked Students ${pickedStudents.length}  >>>  ${pickedStudents}`
            );
            console.log(
              `Remaining Students ${studentsList.length}  >>>  ${studentsList}`
            );
            console.log(`Students in queue ${queue.length}  >>>  ${queue}`);
          }}
        >
          console
        </button> */}
        </div>

        <div className="resultsAndCards">
          <div className="allCards">
            {studentsList.slice(0, numOfCards).map((student) => {
              return (
                <div
                  key={student}
                  className="card"
                  onClick={(e) => pickFunction(e)}
                ></div>
              );
            })}
          </div>

          <div className="resultsBox">
            <ul id="results"></ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
