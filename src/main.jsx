import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BookOpen, Trophy, Flame, Heart, Star, Gamepad2, CheckCircle2, Lock, Menu, X, Sparkles, Target, Brain, Map, Compass, RotateCcw, Award, ArrowRight, ListChecks } from 'lucide-react'
import './styles.css'

const curriculum = [
  {
    part: 'Μέρος Α — Αριθμητική / Άλγεβρα',
    chapters: [
      {
        title: 'Κεφάλαιο 1 — Οι φυσικοί αριθμοί',
        lessons: [
          { id: '1.1', title: 'Φυσικοί αριθμοί - Διάταξη - Στρογγυλοποίηση', status: 'active', progress: 35 },
          { id: '1.2', title: 'Πρόσθεση, αφαίρεση και πολλαπλασιασμός', status: 'soon', progress: 0 },
          { id: '1.3', title: 'Δυνάμεις φυσικών αριθμών', status: 'soon', progress: 0 },
          { id: '1.4', title: 'Ευκλείδεια διαίρεση - Διαιρετότητα', status: 'soon', progress: 0 },
          { id: '1.5', title: 'Χαρακτήρες διαιρετότητας - ΜΚΔ - ΕΚΠ', status: 'soon', progress: 0 },
          { id: '1.R', title: 'Γενικές Ασκήσεις Κεφ. 1', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 2 — Τα κλάσματα',
        lessons: [
          { id: '2.1', title: 'Η έννοια του κλάσματος', status: 'soon', progress: 0 },
          { id: '2.2', title: 'Ισοδύναμα κλάσματα', status: 'soon', progress: 0 },
          { id: '2.3', title: 'Σύγκριση κλασμάτων', status: 'soon', progress: 0 },
          { id: '2.4', title: 'Πρόσθεση και αφαίρεση κλασμάτων', status: 'soon', progress: 0 },
          { id: '2.5', title: 'Πολλαπλασιασμός κλασμάτων', status: 'soon', progress: 0 },
          { id: '2.6', title: 'Διαίρεση κλασμάτων', status: 'soon', progress: 0 },
          { id: '2.R', title: 'Γενικές Ασκήσεις Κεφ. 2', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 3 — Δεκαδικοί αριθμοί',
        lessons: [
          { id: '3.1', title: 'Δεκαδικά κλάσματα - Δεκαδικοί αριθμοί', status: 'soon', progress: 0 },
          { id: '3.2', title: 'Πράξεις με δεκαδικούς αριθμούς', status: 'soon', progress: 0 },
          { id: '3.3', title: 'Υπολογισμοί με αριθμομηχανή', status: 'soon', progress: 0 },
          { id: '3.4', title: 'Τυποποιημένη μορφή μεγάλων αριθμών', status: 'soon', progress: 0 },
          { id: '3.5', title: 'Μονάδες μέτρησης', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 4 — Εξισώσεις και προβλήματα',
        lessons: [
          { id: '4.1', title: 'Η έννοια της εξίσωσης', status: 'soon', progress: 0 },
          { id: '4.2', title: 'Επίλυση προβλημάτων', status: 'soon', progress: 0 },
          { id: '4.3', title: 'Παραδείγματα επίλυσης προβλημάτων', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 5 — Ποσοστά',
        lessons: [
          { id: '5.1', title: 'Ποσοστά', status: 'soon', progress: 0 },
          { id: '5.2', title: 'Προβλήματα με ποσοστά', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 6 — Ανάλογα ποσά - Αντιστρόφως ανάλογα ποσά',
        lessons: [
          { id: '6.1', title: 'Παράσταση σημείων στο επίπεδο', status: 'soon', progress: 0 },
          { id: '6.2', title: 'Λόγος δύο αριθμών - Αναλογία', status: 'soon', progress: 0 },
          { id: '6.3', title: 'Ανάλογα ποσά', status: 'soon', progress: 0 },
          { id: '6.4', title: 'Γραφική παράσταση σχέσης αναλογίας', status: 'soon', progress: 0 },
          { id: '6.5', title: 'Προβλήματα αναλογιών', status: 'soon', progress: 0 },
          { id: '6.6', title: 'Αντιστρόφως ανάλογα ποσά', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 7 — Θετικοί και αρνητικοί αριθμοί',
        lessons: [
          { id: '7.1', title: 'Θετικοί και αρνητικοί αριθμοί', status: 'soon', progress: 0 },
          { id: '7.2', title: 'Απόλυτη τιμή - Αντίθετοι - Σύγκριση', status: 'soon', progress: 0 },
          { id: '7.3', title: 'Πρόσθεση ρητών αριθμών', status: 'soon', progress: 0 },
          { id: '7.4', title: 'Αφαίρεση ρητών αριθμών', status: 'soon', progress: 0 },
          { id: '7.5', title: 'Πολλαπλασιασμός ρητών αριθμών', status: 'soon', progress: 0 },
          { id: '7.6', title: 'Διαίρεση ρητών αριθμών', status: 'soon', progress: 0 },
          { id: '7.7', title: 'Δεκαδική μορφή ρητών', status: 'soon', progress: 0 },
          { id: '7.8', title: 'Δυνάμεις ρητών με εκθέτη φυσικό', status: 'soon', progress: 0 },
        ],
      },
    ],
  },
  {
    part: 'Μέρος Β — Γεωμετρία',
    chapters: [
      {
        title: 'Κεφάλαιο 1 — Βασικές γεωμετρικές έννοιες',
        lessons: [
          { id: 'Β1.1', title: 'Σημείο - Ευθύγραμμο τμήμα - Ευθεία', status: 'soon', progress: 0 },
          { id: 'Β1.2', title: 'Γωνία - Γραμμή - Επίπεδα σχήματα', status: 'soon', progress: 0 },
          { id: 'Β1.3', title: 'Μέτρηση και σύγκριση τμημάτων', status: 'soon', progress: 0 },
          { id: 'Β1.4', title: 'Πρόσθεση και αφαίρεση τμημάτων', status: 'soon', progress: 0 },
          { id: 'Β1.5', title: 'Μέτρηση και σύγκριση γωνιών', status: 'soon', progress: 0 },
          { id: 'Β1.6', title: 'Είδη γωνιών - Κάθετες ευθείες', status: 'soon', progress: 0 },
          { id: 'Β1.11', title: 'Κύκλος και στοιχεία κύκλου', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 2 — Συμμετρία',
        lessons: [
          { id: 'Β2.1', title: 'Συμμετρία ως προς άξονα', status: 'soon', progress: 0 },
          { id: 'Β2.2', title: 'Άξονας συμμετρίας', status: 'soon', progress: 0 },
          { id: 'Β2.3', title: 'Μεσοκάθετος ευθύγραμμου τμήματος', status: 'soon', progress: 0 },
          { id: 'Β2.4', title: 'Συμμετρία ως προς σημείο', status: 'soon', progress: 0 },
        ],
      },
      {
        title: 'Κεφάλαιο 3 — Τρίγωνα - Παραλληλόγραμμα - Τραπέζια',
        lessons: [
          { id: 'Β3.1', title: 'Στοιχεία και είδη τριγώνων', status: 'soon', progress: 0 },
          { id: 'Β3.2', title: 'Άθροισμα γωνιών τριγώνου', status: 'soon', progress: 0 },
          { id: 'Β3.3', title: 'Παραλληλόγραμμα - Τραπέζια', status: 'soon', progress: 0 },
          { id: 'Β3.4', title: 'Ιδιότητες σχημάτων', status: 'soon', progress: 0 },
        ],
      },
    ],
  },
]

const quiz = [
  {
    question: 'Ποιοι είναι οι φυσικοί αριθμοί;',
    options: ['0, 1, 2, 3, 4, ...', 'Μόνο οι αριθμοί 1, 2, 3, ...', 'Μόνο οι άρτιοι αριθμοί', 'Οι αριθμοί με κόμμα'],
    answer: '0, 1, 2, 3, 4, ...',
    hint: 'Στο βιβλίο οι φυσικοί ξεκινούν από το 0.',
  },
  {
    question: 'Ποια είναι η σωστή αύξουσα σειρά;',
    options: ['3.508, 3.515, 3.620, 4.800', '4.800, 3.620, 3.515, 3.508', '3.620, 3.508, 4.800, 3.515', '3.515, 3.508, 4.800, 3.620'],
    answer: '3.508, 3.515, 3.620, 4.800',
    hint: 'Αύξουσα σημαίνει από τον μικρότερο προς τον μεγαλύτερο.',
  },
  {
    question: 'Στρογγυλοποίησε το 9.573.842 στις χιλιάδες.',
    options: ['9.573.000', '9.574.000', '9.570.000', '10.000.000'],
    answer: '9.574.000',
    hint: 'Κοιτάμε τις εκατοντάδες. Το 8 είναι μεγαλύτερο από 5, άρα οι χιλιάδες ανεβαίνουν.',
  },
  {
    question: 'Ποια πρόταση είναι σωστή;',
    options: ['7.568 > 7.586', '4.801 > 4.800', '345 = 354', '0 έχει προηγούμενο φυσικό αριθμό'],
    answer: '4.801 > 4.800',
    hint: 'Σύγκρινε τα ψηφία από αριστερά προς τα δεξιά.',
  },
]

const roundingTargets = [
  { number: '7.568.349', ask: 'στις δεκάδες', answer: '7.568.350' },
  { number: '7.568.349', ask: 'στις εκατοντάδες', answer: '7.568.300' },
  { number: '7.568.349', ask: 'στις χιλιάδες', answer: '7.568.000' },
  { number: '7.568.349', ask: 'στις δεκάδες χιλιάδες', answer: '7.570.000' },
]

function App() {
  const [selectedLesson, setSelectedLesson] = useState('1.1')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [tab, setTab] = useState('theory')
  const [xp, setXp] = useState(175)
  const [hearts, setHearts] = useState(5)
  const [streak, setStreak] = useState(3)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [roundIndex, setRoundIndex] = useState(0)
  const [roundInput, setRoundInput] = useState('')
  const [roundMessage, setRoundMessage] = useState('')

  const current = quiz[questionIndex]
  const round = roundingTargets[roundIndex]
  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp])
  const levelProgress = xp % 100
  const activeLesson = selectedLesson === '1.1'

  function answer(option) {
    if (choice) return
    setChoice(option)
    if (option === current.answer) setXp((v) => v + 25)
    else setHearts((v) => Math.max(0, v - 1))
  }

  function nextQuestion() {
    setChoice(null)
    setShowHint(false)
    setQuestionIndex((v) => (v + 1) % quiz.length)
  }

  function checkRounding() {
    const clean = roundInput.trim().replaceAll(' ', '')
    if (clean === round.answer) {
      setRoundMessage('✅ Σωστά! Κέρδισες 30 XP και ο φύλακας ζαλίστηκε!')
      setXp((v) => v + 30)
      setRoundIndex((v) => (v + 1) % roundingTargets.length)
      setRoundInput('')
    } else {
      setRoundMessage(`💡 Όχι ακόμα. Θυμήσου: κοιτάμε το αμέσως δεξιά ψηφίο. Σωστή απάντηση εδώ: ${round.answer}`)
      setHearts((v) => Math.max(0, v - 1))
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'open' : ''}`}>
        <div className="brand">
          <div className="logo"><Sparkles size={22} /></div>
          <div>
            <strong>Math Heroes</strong>
            <span>Α' Γυμνασίου</span>
          </div>
          <button className="close-menu" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        </div>

        <div className="sidebar-scroll">
          {curriculum.map((part) => (
            <div key={part.part} className="part-block">
              <p className="part-title">{part.part}</p>
              {part.chapters.map((chapter) => (
                <details key={chapter.title} open={chapter.title.includes('Κεφάλαιο 1') && part.part.includes('Αριθμητική')}>
                  <summary>{chapter.title}</summary>
                  <div className="lesson-list">
                    {chapter.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`lesson-button ${selectedLesson === lesson.id ? 'selected' : ''}`}
                        onClick={() => { setSelectedLesson(lesson.id); setTab('theory'); setMobileMenu(false) }}
                      >
                        <span className="lesson-id">{lesson.id}</span>
                        <span className="lesson-text">{lesson.title}</span>
                        {lesson.status === 'soon' ? <Lock size={14} /> : <CheckCircle2 size={14} />}
                      </button>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div>
            <p className="eyebrow">Ψηφιακό βιβλίο - παιχνίδι</p>
            <h1>{activeLesson ? '1.1 Φυσικοί αριθμοί - Διάταξη - Στρογγυλοποίηση' : 'Η ενότητα ετοιμάζεται'}</h1>
          </div>
          <div className="stats">
            <span><Flame size={18} /> {streak}</span>
            <span><Heart size={18} /> {hearts}</span>
            <span><Trophy size={18} /> L{level}</span>
          </div>
        </header>

        {!activeLesson ? (
          <section className="hero-card empty-lesson">
            <div>
              <div className="pill"><Lock size={16} /> Προσεχώς</div>
              <h2>Αυτή η παράγραφος θα ξεκλειδώσει σύντομα.</h2>
              <p>Πρώτα χτίζουμε ολοκληρωμένα την 1.1 και μετά τη χρησιμοποιούμε ως πρότυπο για τις επόμενες ενότητες.</p>
            </div>
          </section>
        ) : (
          <>
            <section className="hero-card">
              <div>
                <div className="pill"><BookOpen size={16} /> Μάθημα 1.1</div>
                <h2>Από το “μετράω” στο “σκέφτομαι μαθηματικά”</h2>
                <p>
                  Μαθαίνουμε τους φυσικούς αριθμούς, πώς τους συγκρίνουμε, πώς τους βάζουμε σε σειρά
                  και πότε χρησιμοποιούμε στρογγυλοποίηση στην καθημερινή ζωή.
                </p>
                <div className="lesson-goals">
                  <span><CheckCircle2 size={16} /> Κατανοώ φυσικούς αριθμούς</span>
                  <span><CheckCircle2 size={16} /> Συγκρίνω και διατάσσω</span>
                  <span><CheckCircle2 size={16} /> Στρογγυλοποιώ</span>
                </div>
              </div>
              <div className="level-card">
                <span>XP επιπέδου</span>
                <strong>{xp} XP</strong>
                <div className="bar"><i style={{ width: `${levelProgress}%` }} /></div>
                <small>{100 - levelProgress} XP για το επόμενο επίπεδο</small>
              </div>
            </section>

            <nav className="lesson-tabs">
              <button onClick={() => setTab('theory')} className={tab === 'theory' ? 'active' : ''}><Brain size={17}/> Θεωρία</button>
              <button onClick={() => setTab('examples')} className={tab === 'examples' ? 'active' : ''}><Map size={17}/> Παραδείγματα</button>
              <button onClick={() => setTab('practice')} className={tab === 'practice' ? 'active' : ''}><Gamepad2 size={17}/> Quiz</button>
              <button onClick={() => setTab('boss')} className={tab === 'boss' ? 'active' : ''}><Trophy size={17}/> Boss</button>
            </nav>

            {tab === 'theory' && <TheorySection />}
            {tab === 'examples' && <ExamplesSection />}
            {tab === 'practice' && (
              <PracticeSection
                current={current}
                choice={choice}
                answer={answer}
                showHint={showHint}
                setShowHint={setShowHint}
                nextQuestion={nextQuestion}
              />
            )}
            {tab === 'boss' && (
              <BossSection
                round={round}
                roundInput={roundInput}
                setRoundInput={setRoundInput}
                checkRounding={checkRounding}
                roundMessage={roundMessage}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

function TheorySection() {
  return (
    <>
      <section className="grid three">
        <article className="card theory-card blue">
          <div className="icon-bubble">🔢</div>
          <h3>Φυσικοί αριθμοί</h3>
          <p>Οι αριθμοί <b>0, 1, 2, 3, 4, ...</b> ονομάζονται φυσικοί αριθμοί.</p>
          <p>Κάθε φυσικός έχει επόμενο. Το <b>0</b> έχει μόνο επόμενο, το 1.</p>
        </article>
        <article className="card theory-card green">
          <div className="icon-bubble">⚖️</div>
          <h3>Σύγκριση</h3>
          <p>Χρησιμοποιούμε τα σύμβολα <b>=</b>, <b>&lt;</b>, <b>&gt;</b>.</p>
          <p>Παράδειγμα: <b>456 &lt; 465</b> και <b>8.970 &gt; 8.765</b>.</p>
        </article>
        <article className="card theory-card orange">
          <div className="icon-bubble">🎯</div>
          <h3>Στρογγυλοποίηση</h3>
          <p>Αντικαθιστούμε έναν αριθμό με έναν κοντινό, όταν δεν χρειάζεται απόλυτη ακρίβεια.</p>
          <p>Κανόνας: κοιτάμε το αμέσως δεξιά ψηφίο.</p>
        </article>
      </section>

      <section className="card number-line-card">
        <div className="card-title"><Compass /> Άξονας φυσικών αριθμών</div>
        <p>Βάζουμε τους φυσικούς αριθμούς σε μια ευθεία με ίσες αποστάσεις. Όσο πιο δεξιά, τόσο μεγαλύτερος ο αριθμός.</p>
        <div className="number-line">
          {[0,1,2,3,4,5,6,7,8,9,10].map((n) => <span key={n}><i />{n}</span>)}
        </div>
      </section>

      <section className="grid two">
        <article className="card rule-card">
          <div className="card-title"><ListChecks /> Κανόνας στρογγυλοποίησης</div>
          <ol>
            <li>Βρίσκω την τάξη στην οποία θέλω να στρογγυλοποιήσω.</li>
            <li>Κοιτάζω το ψηφίο της αμέσως μικρότερης τάξης.</li>
            <li>Αν είναι 0, 1, 2, 3, 4 → μηδενίζω τα δεξιά ψηφία.</li>
            <li>Αν είναι 5, 6, 7, 8, 9 → ανεβάζω κατά 1 και μηδενίζω τα δεξιά ψηφία.</li>
          </ol>
        </article>
        <article className="card when-card">
          <div className="card-title"><Target /> Πότε το χρησιμοποιώ;</div>
          <div className="mini-list">
            <span>✅ Πληθυσμός μιας πόλης</span>
            <span>✅ Ύψος ενός βουνού</span>
            <span>❌ Αριθμός τηλεφώνου</span>
            <span>❌ Ταχυδρομικός κωδικός</span>
          </div>
        </article>
      </section>
    </>
  )
}

function ExamplesSection() {
  const comparisons = [
    ['45', '=', '45'],
    ['38', '>', '36'],
    ['456', '<', '465'],
    ['8.765', '<', '8.970'],
  ]
  return (
    <>
      <section className="grid two">
        <article className="card example-card">
          <div className="card-title"><Map /> Διάταξη αριθμών</div>
          <p>Βάλε σε αύξουσα σειρά:</p>
          <div className="number-chips"><span>3.515</span><span>4.800</span><span>3.620</span><span>3.508</span><span>4.801</span></div>
          <div className="answer-strip"><ArrowRight size={18}/> 3.508 &lt; 3.515 &lt; 3.620 &lt; 4.800 &lt; 4.801</div>
        </article>

        <article className="card example-card">
          <div className="card-title"><RotateCcw /> Στρογγυλοποίηση</div>
          <p className="big-number">9.573.842</p>
          <div className="steps">
            <p><b>Στις εκατοντάδες:</b> 9.573.800</p>
            <p><b>Στις χιλιάδες:</b> 9.574.000</p>
            <p><b>Στα εκατομμύρια:</b> 10.000.000</p>
          </div>
        </article>
      </section>

      <section className="card compare-card">
        <div className="card-title"><Brain /> Γρήγορες συγκρίσεις</div>
        <div className="compare-grid">
          {comparisons.map(([a, sign, b]) => <div key={a+b}><span>{a}</span><strong>{sign}</strong><span>{b}</span></div>)}
        </div>
      </section>
    </>
  )
}

function PracticeSection({ current, choice, answer, showHint, setShowHint, nextQuestion }) {
  return (
    <section className="grid two">
      <article className="card quiz-card">
        <div className="card-title"><Gamepad2 /> Quiz Αστραπή</div>
        <h3>{current.question}</h3>
        <div className="answers">
          {current.options.map((option) => {
            const selected = choice === option
            const correct = choice && option === current.answer
            const wrong = selected && option !== current.answer
            return (
              <button key={option} onClick={() => answer(option)} className={`${selected ? 'picked' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}>
                {option}
              </button>
            )
          })}
        </div>
        {choice && <div className="feedback">{choice === current.answer ? '✅ Μπράβο! +25 XP' : '❌ Όχι ακόμα. Πάτα βοήθεια και συνέχισε.'}</div>}
        {showHint && <div className="hint">💡 {current.hint}</div>}
        <div className="actions">
          <button className="secondary" onClick={() => setShowHint(true)}>Θέλω βοήθεια</button>
          <button className="primary" onClick={nextQuestion}>Επόμενη</button>
        </div>
      </article>

      <article className="card mission-card">
        <div className="card-title"><Award /> Achievement</div>
        <h3>Στόχος ενότητας</h3>
        <p>Μόλις απαντήσεις σωστά στα quiz και στο boss challenge, ξεκλειδώνεις το badge:</p>
        <div className="badge-preview">🏅</div>
        <p className="badge-name">“Φρουρός των Φυσικών Αριθμών”</p>
      </article>
    </section>
  )
}

function BossSection({ round, roundInput, setRoundInput, checkRounding, roundMessage }) {
  return (
    <section className="grid two">
      <article className="card boss-card">
        <div className="card-title"><Trophy /> Boss Challenge</div>
        <h3>Ο Φύλακας της Στρογγυλοποίησης 🐉</h3>
        <p>Στρογγυλοποίησε τον αριθμό:</p>
        <div className="boss-number">{round.number}</div>
        <p>Ζητείται: <b>{round.ask}</b></p>
        <input value={roundInput} onChange={(e) => setRoundInput(e.target.value)} placeholder="π.χ. 7.568.350" />
        <button className="primary wide" onClick={checkRounding}>Έλεγχος απάντησης</button>
        {roundMessage && <div className="hint boss-hint">{roundMessage}</div>}
      </article>
      <article className="card boss-help">
        <div className="card-title"><Brain /> Μυστικό όπλο</div>
        <p>Για να νικήσεις το boss:</p>
        <ol>
          <li>Βρες την τάξη στρογγυλοποίησης.</li>
          <li>Κοίτα το ψηφίο ακριβώς δεξιά.</li>
          <li>Αν είναι 5 ή μεγαλύτερο, ανεβαίνεις.</li>
          <li>Όλα τα δεξιά ψηφία γίνονται 0.</li>
        </ol>
      </article>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
