import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

function App() {
  return (
    <div className="container">
      <h1>Η Ακαδημία των Μαθηματικών Ηρώων</h1>
      <p>Καλωσήρθες στην interactive πλατφόρμα Μαθηματικών Α’ Γυμνασίου.</p>

      <div className="cards">
        <div className="card">📚 Κεφάλαιο 1.1</div>
        <div className="card">🎮 Quiz</div>
        <div className="card">🏆 XP & Levels</div>
      </div>

      <button>Ξεκίνα Περιπέτεια</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
