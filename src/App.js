import './App.css';
import { useState } from 'react';

function App() {
  // Original list with all the students
  let studentsList = [
    'André G.',
    'Bruno C.',
    'Bruno M.',
    'Caroline V.',
    'Daniel R.',
    'David C.',
    'Fares Q.',
    'Filipe D.',
    'Guilherme S.',
    'Jakob B.',
    'João C.',
    'João S.',
    'João V.',
    'Marcelo M.',
    'Mariana C.',
    'Miguel M.',
    'Vasco G.'
  ];

  // Array of already picked students
  const [pickedStudents, setPickedStudents] = useState([]);
  // Array of pairs already assigned (results box)
  const [studentPairs, setStudentPairs] = useState([]);
  // Student that is picking a card
  const [selectTarget, setSelectTarget] = useState('default');

  // Get half of the cards
  const numOfCards = studentsList.length / 2;

  // Assign a random person to the picking student
  const pickFunction = (e) => {
    let randomStudent;

    // Check if the the picked card is valid
    if (
      !e.target.classList.contains('flippedCard') &&
      selectTarget !== 'default' &&
      !pickedStudents.includes(selectTarget)
    ) {
      // Pick a random student and check if it is valid otherwise pick again
      for (let i = 0; i < 50; i++) {
        randomStudent = studentsList[Math.floor(Math.random() * studentsList.length)];
        if (randomStudent !== selectTarget && !pickedStudents.includes(randomStudent)) {
          break;
        }
      }

      /* ------------------ Condition ------------------ */
      let sArray = [
        undefined,
        // don't leave this students to pick at the end
      ];

      let condition = sArray.includes(randomStudent) && sArray.includes(selectTarget);

      if (condition) {
        let rStudents = studentsList.filter((student) => !pickedStudents.includes(student));

        do {
          console.log(randomStudent);
          let rIndex = Math.floor(Math.random() * (studentsList.length - pickedStudents.length));
          randomStudent = rStudents[rIndex];
        } while (sArray.includes(randomStudent));
      }
      /* ----------------------------------------------- */

      // Update the array of already picked students
      setPickedStudents([randomStudent, selectTarget, ...pickedStudents]);

      // Flip the card
      e.target.classList.add('flippedCard');
      e.target.textContent = randomStudent;

      // Keep track of pairs already assigned
      let emojis = ['🧠', '💻', '💪', '⚙️', '🤖', '⌨️', '💾', '📡', '📱'];
      let index = Math.floor(Math.random() * emojis.length);
      setStudentPairs([...studentPairs, `${selectTarget} ${emojis[index]} ${randomStudent}`]);

      // Reset select dropdown to default after pair is assigned
      setSelectTarget('default');
    }
  };

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
            onChange={(e) => {
              setSelectTarget(e.target.value);
            }}
            value={selectTarget}
          >
            <option key="default" value="default">
              Select your name
            </option>
            {studentsList.map((student, index) => {
              if (!pickedStudents.includes(student))
                return (
                  <option key={index} value={student}>
                    {student}
                  </option>
                );
            })}
          </select>

          {/* ALERT MESSAGE IF STUDENT ALREADY HAS A PAIR */}
          {pickedStudents.length > 1 && pickedStudents.includes(selectTarget) ? (
            <p id="selectAlert">Student already picked!</p>
          ) : (
            <p></p>
          )}
        </div>

        {/* ALL CARDS WITH STUDENTS NAMES */}
        <div className={'resultsAndCards'}>
          <div className="allCards">
            {studentsList.slice(0, numOfCards).map((student, index) => {
              return <div key={index} className="card" onClick={(e) => pickFunction(e)}></div>;
            })}
          </div>

          {/* BOX WITH STUDENT PAIRS ALREADY ASSIGNED */}
          <div className="resultsBox">
            <p>Pairs:</p>
            <ul id={'results'}>
              {studentPairs.map((pair, index) => {
                return <li key={index}>{pair}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
