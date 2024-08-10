import React from 'react';
import Review from './Review'

// don't change the Component name "App"
function App() {
    const [feedback, setFeedback] = React.useState("")
    const [student, setStudent] = React.useState("")

    const textAreaOnChange=event=>setFeedback(event.target.value)
    const inputOnChange=event=>setStudent(event.target.value)

  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea defaultValue={feedback} onChange={textAreaOnChange}/>
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" defaultValue={student} onChange={inputOnChange}/>
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review feedback={feedback} student={student}/>

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

export default App;