import { useMemo, useState } from 'react';
import { BookOpen, Brain, Gamepad2, Medal, Star, Sparkles, Target, Trophy } from 'lucide-react';

const chapters = [
  {
    id: 'numbers',
    title: 'Φυσικοί αριθμοί',
    subtitle: 'Πράξεις, προτεραιότητα πράξεων, δυνάμεις',
    icon: '🔢',
    progress: 72,
    missions: ['Κυνήγι προτεραιότητας', 'Μονομαχία δυνάμεων', 'Σπαζοκεφαλιές πράξεων']
  },
  {
    id: 'fractions',
    title: 'Κλάσματα',
    subtitle: 'Ισοδύναμα κλάσματα, σύγκριση, πράξεις',
    icon: '🍕',
    progress: 45,
    missions: ['Πίτσα κλασμάτων', 'Σύγκρινε και κέρδισε', 'Εργαστήριο ισοδυναμίας']
  },
  {
    id: 'decimals',
    title: 'Δεκαδικοί αριθμοί',
    subtitle: 'Μετατροπές, πράξεις και προβλήματα',
    icon: '💰',
    progress: 35,
    missions: ['Το ταμείο του ήρωα', 'Δεκαδικό sprint', 'Αποστολή μετατροπών']
  },
  {
    id: 'geometry',
    title: 'Γεωμετρία',
    subtitle: 'Ευθείες, γωνίες, τρίγωνα, περίμετρος, εμβαδό',
    icon: '📐',
    progress: 28,
    missions: ['Γωνιο-ντετέκτιβ', 'Χτίσε το σχήμα', 'Escape room περιμέτρου']
  },
  {
    id: 'equations',
    title: 'Εξισώσεις',
    subtitle: 'Ο άγνωστος x και η λογική της λύσης',
    icon: '⚖️',
    progress: 12,
    missions: ['Βρες τον x', 'Η ζυγαριά των εξισώσεων', 'Boss fight: το άγνωστο']
  }
];

const questions = [
  {
    chapter: 'numbers',
    q: 'Ποιο είναι το αποτέλεσμα της παράστασης 3 + 2 · 5;',
    options: ['25', '13', '17', '10'],
    answer: '13',
    hint: 'Πρώτα κάνουμε τον πολλαπλασιασμό και μετά την πρόσθεση.'
  },
  {
    chapter: 'fractions',
    q: 'Ποιο κλάσμα είναι ισοδύναμο με το 1/2;',
    options: ['2/3', '3/6', '4/10', '5/8'],
    answer: '3/6',
    hint: 'Πολλαπλασιάζουμε αριθμητή και παρονομαστή με τον ίδιο αριθμό.'
  },
  {
    chapter: 'geometry',
    q: 'Το άθροισμα των γωνιών ενός τριγώνου είναι:',
    options: ['90°', '180°', '270°', '360°'],
    answer: '180°',
    hint: 'Είναι βασική ιδιότητα κάθε τριγώνου.'
  },
  {
    chapter: 'equations',
    q: 'Αν x + 7 = 12, τότε το x είναι:',
    options: ['3', '4', '5', '19'],
    answer: '5',
    hint: 'Αφαιρούμε 7 και από τα δύο μέλη.'
  }
];

function ProgressBar({ value }) {
  return (
    <div className="progress-shell" aria-label={`Πρόοδος ${value}%`}>
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function App() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [xp, setXp] = useState(240);
  const [streak, setStreak] = useState(3);

  const currentQuestion = questions[questionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;
  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);

  function chooseAnswer(option) {
    setSelectedAnswer(option);
    if (option === currentQuestion.answer && selectedAnswer !== option) {
      setXp((current) => current + 20);
      setStreak((current) => current + 1);
    }
    if (option !== currentQuestion.answer) {
      setStreak(0);
    }
  }

  function nextQuestion() {
    const next = (questionIndex + 1) % questions.length;
    setQuestionIndex(next);
    const chapter = chapters.find((item) => item.id === questions[next].chapter);
    if (chapter) setSelectedChapter(chapter);
    setSelectedAnswer(null);
    setShowHint(false);
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={16} /> Μαθηματικά Α' Γυμνασίου</span>
          <h1>Η Ακαδημία των Μαθηματικών Ηρώων</h1>
          <p>
            Ένα διαδικτυακό περιβάλλον όπου οι μαθητές μαθαίνουν με αποστολές,
            quiz, βοήθειες, XP και μικρές νίκες. Σοβαρό στην ύλη, παιχνιδιάρικο στην εμπειρία.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#quiz"><Gamepad2 size={18} /> Ξεκίνα αποστολή</a>
            <a className="secondary-button" href="#chapters"><BookOpen size={18} /> Δες ενότητες</a>
          </div>
        </div>

        <aside className="profile-card" aria-label="Προφίλ μαθητή">
          <div className="profile-top">
            <div>
              <span>Προφίλ μαθητή</span>
              <h2>Επίπεδο {level}</h2>
            </div>
            <Medal size={34} />
          </div>
          <ProgressBar value={xp % 100} />
          <div className="stats-grid">
            <div><Star /> <strong>{xp}</strong><span>XP</span></div>
            <div><Brain /> <strong>{streak}</strong><span>σερί</span></div>
            <div><Trophy /> <strong>5</strong><span>badges</span></div>
          </div>
        </aside>
      </section>

      <section className="layout-grid">
        <div id="chapters" className="panel">
          <div className="section-heading">
            <Target />
            <div>
              <h2>Χάρτης ενοτήτων</h2>
              <p>Κάθε κεφάλαιο γίνεται σειρά από μικρές αποστολές.</p>
            </div>
          </div>

          <div className="chapter-list">
            {chapters.map((chapter) => (
              <button
                className={`chapter-card ${selectedChapter.id === chapter.id ? 'active' : ''}`}
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
              >
                <span className="chapter-icon">{chapter.icon}</span>
                <div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.subtitle}</p>
                  <ProgressBar value={chapter.progress} />
                </div>
                <strong>{chapter.progress}%</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="right-column">
          <section className="panel mission-panel">
            <span className="eyebrow small">Επιλεγμένη ενότητα</span>
            <h2>{selectedChapter.icon} {selectedChapter.title}</h2>
            <p>{selectedChapter.subtitle}</p>
            <div className="mission-grid">
              {selectedChapter.missions.map((mission) => (
                <article className="mission-card" key={mission}>🎯 {mission}</article>
              ))}
            </div>
          </section>

          <section id="quiz" className="panel quiz-panel">
            <div className="section-heading">
              <Gamepad2 />
              <div>
                <h2>Quiz Αστραπή</h2>
                <p>Απάντησε, πάρε βοήθεια και κέρδισε XP.</p>
              </div>
            </div>

            <div className="question-box">
              <h3>{currentQuestion.q}</h3>
              <div className="answers-grid">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => chooseAnswer(option)}
                    className={`answer-button ${selectedAnswer === option ? 'chosen' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedAnswer && (
                <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? '✅ Μπράβο! Κέρδισες 20 XP.' : '❌ Όχι ακόμα. Δοκίμασε ξανά ή πάρε βοήθεια.'}
                </div>
              )}

              {showHint && <div className="hint">💡 {currentQuestion.hint}</div>}

              <div className="quiz-actions">
                <button className="secondary-button button-reset" onClick={() => setShowHint(true)}>Θέλω βοήθεια</button>
                <button className="primary-button button-reset" onClick={nextQuestion}>Επόμενη ερώτηση</button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
