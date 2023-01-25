import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Original list with all the students
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
    "Paulo C.",
    "Pedro L.",
    "Rafaela U.",
    "Tiago R.",
    "Tomás B.",
    "Vanessa V.",
  ];

  // Array of already picked students
  const [pickedStudents, setPickedStudents] = useState([]);
  // Array of students waiting to be pick (select dropdown)
  const [queue, setQueue] = useState([...studentsList]);

  // Targeting resultsBox to keep track of pairs
  const resultsList = document.getElementById("results");
  // Targeting <p> to display alert message if student already picked
  const alertMsg = document.getElementById("selectAlert");

  // Get half of the cards
  const numOfCards = studentsList.length / 2;

  // Add picking student to the pickedStudents array
  const selectStudent = (e) => {
    if (e.target.value !== "default") {
      let picking = e.target.value;
      setPickedStudents([picking, ...pickedStudents]);
      alertMsg.innerHTML = "";
    }
  };

  const pickFunction = (e) => {
    // Assign a random person to the picking student
    let randomStudent;
    if (
      !e.target.classList.contains("flippedCard") &&
      document.getElementById("selectStudents").value !== "default" &&
      document.getElementById("selectStudents").value !== pickedStudents[1]
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
    if (
      pickedStudents.length > 1 &&
      pickedStudents.length % 2 === 0 &&
      pickedStudents[0] !== pickedStudents[1]
    ) {
      resultsList.innerHTML += `<li>${pickedStudents[1]} 🤝 ${pickedStudents[0]}</li>`;
    } else if (
      pickedStudents.length > 2 &&
      pickedStudents[0] === pickedStudents[1]
    ) {
      alertMsg.innerHTML = "Student already picked!";
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

        {/* IRONHACK LOGO */}
        <div className="pickingStudent">
          <img src="ironhackLogo.png" alt="ironhack logo" />

          {/* SELECT DROPDOWN TO CHOOSE THE PICKING STUDENT */}
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

          {/* ALERT MESSAGE IF STUDENT ALREADY HAS A PAIR */}
          <p id="selectAlert"></p>
        </div>

        {/* ALL CARDS WITH STUDENTS NAMES */}
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

          {/* BOX WITH STUDENT PAIRS ALREADY ASSIGNED */}
          <div className="resultsBox">
            <p>Pairs:</p>
            <ul id="results"></ul>
          </div>
        </div>

        {/* CONSOLE LOGS FOR TESTING - COMMENT BEFORE DEPLOY */}
        {/* <button
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
    </>
  );
}

export default App;
