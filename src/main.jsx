import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BookOpen, Brain, Castle, ChevronDown, ChevronRight, Gamepad2, Home, Lock,
  Menu, Medal, Play, ShieldCheck, Sparkles, Sword, Trophy, Wand2, X,
  GraduationCap, CheckCircle2, RotateCcw
} from 'lucide-react'
import './styles.css'

const curriculum = [
  {
    part: "ΜΕΡΟΣ Α'",
    title: 'Αριθμητική - Άλγεβρα',
    chapters: [
      {
        id: 'A1',
        title: 'Κεφάλαιο 1 — Οι φυσικοί αριθμοί',
        progress: 52,
        lessons: [
          { id: '1.1', title: 'Φυσικοί αριθμοί - Διάταξη - Στρογγυλοποίηση', ready: true },
          { id: '1.2', title: 'Πρόσθεση, αφαίρεση και πολλαπλασιασμός', ready: false },
          { id: '1.3', title: 'Δυνάμεις φυσικών αριθμών', ready: false },
          { id: '1.4', title: 'Ευκλείδεια διαίρεση - Διαιρετότητα', ready: false },
          { id: '1.5', title: 'Χαρακτήρες διαιρετότητας - ΜΚΔ - ΕΚΠ', ready: false },
          { id: 'A1G', title: 'Γενικές Ασκήσεις Κεφαλαίου 1', ready: false },
        ],
      },
      {
        id: 'A2',
        title: 'Κεφάλαιο 2 — Τα κλάσματα',
        progress: 0,
        lessons: [
          { id: '2.1', title: 'Η έννοια του κλάσματος', ready: false },
          { id: '2.2', title: 'Ισοδύναμα κλάσματα', ready: false },
          { id: '2.3', title: 'Σύγκριση κλασμάτων', ready: false },
          { id: '2.4', title: 'Πρόσθεση και αφαίρεση κλασμάτων', ready: false },
          { id: '2.5', title: 'Πολλαπλασιασμός κλασμάτων', ready: false },
          { id: '2.6', title: 'Διαίρεση κλασμάτων', ready: false },
        ],
      },
      {
        id: 'A3',
        title: 'Κεφάλαιο 3 — Δεκαδικοί αριθμοί',
        progress: 0,
        lessons: [
          { id: '3.1', title: 'Δεκαδικοί αριθμοί', ready: false },
          { id: '3.2', title: 'Πράξεις με δεκαδικούς', ready: false },
          { id: '3.3', title: 'Υπολογιστής τσέπης', ready: false },
          { id: '3.4', title: 'Τυποποιημένη μορφή', ready: false },
          { id: '3.5', title: 'Μονάδες μέτρησης', ready: false },
        ],
      },
    ],
  },
  {
    part: "ΜΕΡΟΣ Β'",
    title: 'Γεωμετρία',
    chapters: [
      {
        id: 'B1',
        title: 'Κεφάλαιο 1 — Βασικές γεωμετρικές έννοιες',
        progress: 0,
        lessons: [
          { id: 'Β1.1', title: 'Σημείο - Ευθύγραμμο τμήμα - Ευθεία', ready: false },
          { id: 'Β1.2', title: 'Γωνία - Γραμμή - Επίπεδα σχήματα', ready: false },
          { id: 'Β1.3', title: 'Μέτρηση ευθυγράμμων τμημάτων', ready: false },
        ],
      },
    ],
  },
]

const quiz = [
  {
    question: 'Ποιος από τους αριθμούς είναι φυσικός;',
    options: ['-3', '0', '1,5', '2/3'],
    answer: '0',
    tip: 'Οι φυσικοί αριθμοί είναι 0, 1, 2, 3, ...',
  },
  {
    question: 'Ποια σχέση είναι σωστή;',
    options: ['4578 > 4587', '4587 > 4578', '4587 = 4578', '4578 > 5000'],
    answer: '4587 > 4578',
    tip: 'Συγκρίνουμε από αριστερά προς τα δεξιά.',
  },
  {
    question: 'Το 9.573.842 στρογγυλοποιημένο στις χιλιάδες γίνεται:',
    options: ['9.573.000', '9.574.000', '9.570.000', '10.000.000'],
    answer: '9.574.000',
    tip: 'Κοιτάμε το ψηφίο των εκατοντάδων: είναι 8.',
  },
]

const comparisons = [
  { left: '763', right: '836', answer: '<' },
  { left: '6542', right: '6452', answer: '>' },
  { left: '1890', right: '1980', answer: '<' },
  { left: '7020', right: '7020', answer: '=' },
  { left: '9999', right: '10000', answer: '<' },
  { left: '4506', right: '4056', answer: '>' },
]

const descendingNumbers = ['423', '243', '324', '234', '342', '432']
const descendingAnswer = ['432', '423', '342', '324', '243', '234']

const rounding = [
  { number: '345', place: 'πλησιέστερη εκατοντάδα', answer: '300' },
  { number: '761', place: 'πλησιέστερη εκατοντάδα', answer: '800' },
  { number: '659', place: 'πλησιέστερη εκατοντάδα', answer: '700' },
  { number: '2.567', place: 'πλησιέστερη εκατοντάδα', answer: '2.600' },
  { number: '9.532', place: 'πλησιέστερη εκατοντάδα', answer: '9.500' },
  { number: '7.568.349', place: 'δεκάδες', answer: '7.568.350' },
  { number: '7.568.349', place: 'εκατοντάδες', answer: '7.568.300' },
  { number: '7.568.349', place: 'χιλιάδες', answer: '7.568.000' },
]

function ProgressBar({ value }) {
  return <div className="progress"><span style={{ width: `${value}%` }} /></div>
}

function HomePage({ onStart }) {
  return (
    <div className="home">
      <nav className="topbar">
        <div className="brand"><span className="brandIcon">π</span> Math Heroes Academy</div>
        <button className="ghostBtn" onClick={onStart}>Δες τα μαθήματα</button>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="pill"><Sparkles size={16}/> Μαθηματικά Α' Γυμνασίου</div>
          <h1>Η Ακαδημία των Μαθηματικών Ηρώων</h1>
          <p>Μια παιχνιδιάρικη αλλά σοβαρή πλατφόρμα όπου κάθε παράγραφος γίνεται αποστολή και κάθε σωστή απάντηση δίνει XP.</p>
          <div className="heroActions">
            <button className="primaryBtn" onClick={onStart}><Play size={18}/> Ξεκίνα περιπέτεια</button>
            <button className="secondaryBtn" onClick={onStart}><BookOpen size={18}/> Άνοιξε τα κεφάλαια</button>
          </div>
        </div>

        <div className="heroCard">
          <div className="questCard">
            <div className="questTop"><Castle/> Πρώτη αποστολή</div>
            <h2>1.1 Φυσικοί αριθμοί</h2>
            <p>Κατανόησε, σύγκρινε και στρογγυλοποίησε αριθμούς.</p>
            <ProgressBar value={52} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature"><Gamepad2/><h3>Quiz</h3><p>Άμεση ανατροφοδότηση και XP.</p></div>
        <div className="feature"><GraduationCap/><h3>Extra Ασκήσεις</h3><p>Οι ασκήσεις καθηγητή μπαίνουν μέσα στην εφαρμογή.</p></div>
        <div className="feature"><Sword/><h3>Boss Challenge</h3><p>Τελική πρόκληση κάθε ενότητας.</p></div>
        <div className="feature"><Brain/><h3>Σχολική ύλη</h3><p>Δομή βασισμένη στο βιβλίο.</p></div>
      </section>
    </div>
  )
}

function CurriculumMenu({ activeLesson, setActiveLesson, closeMenu }) {
  const [openChapters, setOpenChapters] = useState({ A1: true })

  const toggle = (id) => setOpenChapters((current) => ({ ...current, [id]: !current[id] }))

  const chooseLesson = (lesson) => {
    if (!lesson.ready) return
    setActiveLesson(lesson.id)
    closeMenu?.()
  }

  return (
    <div className="curriculumMenu">
      {curriculum.map((part) => (
        <section key={part.part} className="partBlock">
          <div className="partHeader"><span>{part.part}</span><b>{part.title}</b></div>
          {part.chapters.map((chapter) => {
            const open = !!openChapters[chapter.id]
            return (
              <div className="chapterBlock" key={chapter.id}>
                <button className="chapterBtn" onClick={() => toggle(chapter.id)}>
                  {open ? <ChevronDown size={17}/> : <ChevronRight size={17}/>}
                  <span>{chapter.title}</span>
                </button>
                <ProgressBar value={chapter.progress} />
                {open && (
                  <div className="lessonList">
                    {chapter.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`lessonBtn ${activeLesson === lesson.id ? 'active' : ''} ${!lesson.ready ? 'locked' : ''}`}
                        onClick={() => chooseLesson(lesson)}
                      >
                        <span className="lessonId">{lesson.id}</span>
                        <span>{lesson.title}</span>
                        {lesson.ready ? <ChevronRight size={15}/> : <Lock size={14}/>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
}

function Sidebar({ activeLesson, setActiveLesson, goHome }) {
  return (
    <aside className="sidebar desktopSidebar">
      <button className="homeBtn" onClick={goHome}><Home size={18}/> Αρχική</button>
      <CurriculumMenu activeLesson={activeLesson} setActiveLesson={setActiveLesson} />
    </aside>
  )
}

function MobileHeader({ openMenu, goHome }) {
  return (
    <header className="mobileHeader">
      <button onClick={openMenu}><Menu size={20}/> Μαθήματα</button>
      <button onClick={goHome}><Home size={18}/> Αρχική</button>
    </header>
  )
}

function MobileDrawer({ open, close, activeLesson, setActiveLesson, goHome }) {
  if (!open) return null
  return (
    <div className="drawerOverlay" onClick={close}>
      <aside className="mobileDrawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawerTop"><b>Μαθήματα</b><button onClick={close}><X size={20}/></button></div>
        <button className="homeBtn drawerHome" onClick={() => { goHome(); close(); }}><Home size={18}/> Αρχική</button>
        <CurriculumMenu activeLesson={activeLesson} setActiveLesson={setActiveLesson} closeMenu={close} />
      </aside>
    </div>
  )
}

function ComparisonGame({ addXp }) {
  const [answers, setAnswers] = useState({})

  const score = comparisons.filter((item, i) => answers[i] === item.answer).length

  function choose(i, symbol) {
    setAnswers((prev) => ({ ...prev, [i]: symbol }))
    if (symbol === comparisons[i].answer) addXp(5)
  }

  return (
    <div className="teacherExercise">
      <div className="exerciseTop">
        <h3>1. Σύγκριση αριθμών</h3>
        <span>{score}/{comparisons.length}</span>
      </div>
      <p>Διάλεξε το σωστό σύμβολο: &lt;, &gt; ή =.</p>
      <div className="comparisonGrid">
        {comparisons.map((item, i) => {
          const picked = answers[i]
          const isCorrect = picked === item.answer
          return (
            <div className="comparisonRow" key={`${item.left}-${item.right}`}>
              <b>{item.left}</b>
              <div className="symbolBtns">
                {['<', '>', '='].map((s) => (
                  <button
                    key={s}
                    className={picked === s ? (isCorrect ? 'rightPick' : 'wrongPick') : ''}
                    onClick={() => choose(i, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <b>{item.right}</b>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SortingGame({ addXp }) {
  const [order, setOrder] = useState(descendingNumbers)
  const [checked, setChecked] = useState(false)

  const correct = order.join(',') === descendingAnswer.join(',')

  function move(index, dir) {
    const next = [...order]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    const temp = next[index]
    next[index] = next[target]
    next[target] = temp
    setOrder(next)
    setChecked(false)
  }

  function check() {
    setChecked(true)
    if (correct) addXp(25)
  }

  function reset() {
    setOrder(descendingNumbers)
    setChecked(false)
  }

  return (
    <div className="teacherExercise">
      <div className="exerciseTop">
        <h3>2. Φθίνουσα σειρά</h3>
        <span>σειρά αριθμών</span>
      </div>
      <p>Βάλε τους αριθμούς από τον μεγαλύτερο στον μικρότερο. Στον υπολογιστή και στο κινητό χρησιμοποίησε τα βελάκια.</p>
      <div className="sortList">
        {order.map((n, i) => (
          <div className="sortItem" key={n}>
            <strong>{n}</strong>
            <div>
              <button onClick={() => move(i, -1)}>↑</button>
              <button onClick={() => move(i, 1)}>↓</button>
            </div>
          </div>
        ))}
      </div>
      <div className="exerciseActions">
        <button onClick={check}><CheckCircle2 size={16}/> Έλεγχος</button>
        <button onClick={reset}><RotateCcw size={16}/> Επαναφορά</button>
      </div>
      {checked && <div className={correct ? 'okBox' : 'noBox'}>{correct ? '✅ Άριστα! Η σειρά είναι σωστή.' : '❌ Όχι ακόμα. Σωστή σειρά: 432 → 423 → 342 → 324 → 243 → 234'}</div>}
    </div>
  )
}

function RoundingGame({ addXp }) {
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  const score = rounding.filter((item, i) => (answers[i] || '').trim() === item.answer).length

  function check() {
    setChecked(true)
    addXp(score * 3)
  }

  return (
    <div className="teacherExercise">
      <div className="exerciseTop">
        <h3>3. Στρογγυλοποίηση</h3>
        <span>{checked ? `${score}/${rounding.length}` : 'πίνακας'}</span>
      </div>
      <p>Γράψε το αποτέλεσμα της στρογγυλοποίησης.</p>
      <div className="roundingTable">
        <div className="tableHead">Αριθμός</div>
        <div className="tableHead">Στρογγυλοποίηση</div>
        <div className="tableHead">Απάντηση</div>
        {rounding.map((item, i) => {
          const val = answers[i] || ''
          const isCorrect = val.trim() === item.answer
          return (
            <React.Fragment key={`${item.number}-${item.place}`}>
              <div>{item.number}</div>
              <div>{item.place}</div>
              <div>
                <input
                  value={val}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                  placeholder="π.χ. 800"
                  className={checked ? (isCorrect ? 'inputGood' : 'inputBad') : ''}
                />
                {checked && !isCorrect && <small>Σωστό: {item.answer}</small>}
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <button className="primaryBtn compact" onClick={check}>Έλεγχος στρογγυλοποίησης</button>
    </div>
  )
}

function ExtraTeacherExercises({ addXp }) {
  return (
    <section className="contentPanel teacherPanel">
      <div className="sectionHeader">
        <GraduationCap />
        <div>
          <h2>Extra Ασκήσεις Καθηγητή — 1.1</h2>
          <p>Όλες οι ασκήσεις από το φύλλο εργασίας μπαίνουν εδώ ως έξτρα practice mode.</p>
        </div>
      </div>
      <div className="teacherGrid">
        <ComparisonGame addXp={addXp} />
        <SortingGame addXp={addXp} />
        <RoundingGame addXp={addXp} />
      </div>
    </section>
  )
}

function Lesson11() {
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState('')
  const [xp, setXp] = useState(240)
  const [boss, setBoss] = useState({ round: 0, score: 0, done: false })

  const current = quiz[qIndex]
  const correct = picked === current.answer
  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp])
  const addXp = (amount) => setXp((v) => v + amount)

  function choose(option) {
    setPicked(option)
    if (option === current.answer) addXp(15)
  }

  function next() {
    setPicked('')
    setQIndex((qIndex + 1) % quiz.length)
  }

  function bossAnswer(ok) {
    if (boss.done) return
    const nextRound = boss.round + 1
    const nextScore = boss.score + (ok ? 1 : 0)
    setBoss({ round: nextRound, score: nextScore, done: nextRound >= 3 })
    if (ok) addXp(20)
  }

  return (
    <main className="appGrid">
      <section className="lessonHero">
        <div>
          <div className="pill blue"><BookOpen size={16}/> Ενότητα 1.1</div>
          <h1>Φυσικοί αριθμοί — Διάταξη — Στρογγυλοποίηση</h1>
          <p>Μαθαίνουμε τους φυσικούς αριθμούς, πώς τους συγκρίνουμε και πότε αντικαθιστούμε έναν αριθμό με μια κοντινή προσέγγιση.</p>
        </div>
        <div className="profileCard">
          <span>Προφίλ μαθητή</span>
          <h2>Επίπεδο {level}</h2>
          <ProgressBar value={xp % 100} />
          <div className="statsRow">
            <div>⭐ <b>{xp}</b><small>XP</small></div>
            <div>🔥 <b>4</b><small>σερί</small></div>
            <div>🏅 <b>6</b><small>badges</small></div>
          </div>
        </div>
      </section>

      <section className="contentPanel">
        <div className="sectionHeader"><ShieldCheck/><div><h2>Θυμόμαστε — Μαθαίνουμε</h2><p>Η θεωρία σε μικρά βήματα.</p></div></div>
        <div className="theoryGrid">
          <article><b>1. Φυσικοί αριθμοί</b><p>Οι αριθμοί 0, 1, 2, 3, 4, ... ονομάζονται φυσικοί αριθμοί.</p></article>
          <article><b>2. Άρτιοι και περιττοί</b><p>Άρτιοι είναι οι φυσικοί που διαιρούνται με το 2. Οι υπόλοιποι λέγονται περιττοί.</p></article>
          <article><b>3. Διάταξη</b><p>Χρησιμοποιούμε τα σύμβολα =, &lt;, &gt; για να συγκρίνουμε αριθμούς.</p></article>
          <article><b>4. Στρογγυλοποίηση</b><p>Αν το επόμενο ψηφίο είναι 0–4, μηδενίζουμε. Αν είναι 5–9, ανεβάζουμε κατά 1.</p></article>
        </div>
      </section>

      <section className="contentPanel twoCol">
        <div>
          <div className="sectionHeader small"><Wand2/><h2>Παραδείγματα</h2></div>
          <div className="example"><b>Σύγκριση</b><p>4587 &gt; 4578, γιατί στις δεκάδες το 8 είναι μεγαλύτερο από το 7.</p></div>
          <div className="example"><b>Στρογγυλοποίηση</b><p>9.573.842 ≈ 9.574.000, γιατί το ψηφίο των εκατοντάδων είναι 8.</p></div>
        </div>
        <div className="practiceBox">
          <h3>Mini αποστολή</h3>
          <p>Βάλε τους αριθμούς σε αύξουσα σειρά:</p>
          <div className="numberChips"><span>3.515</span><span>4.800</span><span>3.508</span><span>3.620</span></div>
          <div className="answerLine">3.508 → 3.515 → 3.620 → 4.800</div>
        </div>
      </section>

      <section className="contentPanel quizPanel">
        <div className="sectionHeader"><Gamepad2/><div><h2>Quiz Αστραπή</h2><p>Κάθε σωστή απάντηση δίνει +15 XP.</p></div></div>
        <div className="question">{current.question}</div>
        <div className="optionsGrid">
          {current.options.map((option) => (
            <button key={option} className={`option ${picked === option ? (correct ? 'good' : 'bad') : ''}`} onClick={() => choose(option)}>
              {option}
            </button>
          ))}
        </div>
        {picked && <div className={`feedback ${correct ? 'goodText' : 'badText'}`}>{correct ? '✅ Μπράβο! Κέρδισες XP.' : `❌ Όχι ακόμα. ${current.tip}`}</div>}
        <button className="primaryBtn compact" onClick={next}>Επόμενη ερώτηση</button>
      </section>

      <ExtraTeacherExercises addXp={addXp} />

      <section className="bossPanel">
        <div>
          <div className="pill danger"><Sword size={16}/> Boss Challenge</div>
          <h2>Ο Δράκος της Στρογγυλοποίησης 🐉</h2>
          <p>Απάντησε σε 3 γρήγορες προκλήσεις για να κερδίσεις το πρώτο badge.</p>
        </div>
        <div className="bossGame">
          <div className="dragon">🐉</div>
          <p>Πρόκληση {Math.min(boss.round + 1, 3)} / 3</p>
          <h3>{boss.done ? `Τελικό σκορ: ${boss.score}/3` : 'Το 761 στην πλησιέστερη εκατοντάδα είναι 800;'}</h3>
          {!boss.done ? (
            <div className="bossBtns">
              <button onClick={() => bossAnswer(true)}>Σωστό</button>
              <button onClick={() => bossAnswer(false)}>Λάθος</button>
            </div>
          ) : (
            <div className="badgeWin"><Medal/> Κέρδισες: Φύλακας της 1.1</div>
          )}
        </div>
      </section>
    </main>
  )
}

function ComingSoon({ id }) {
  return (
    <main className="contentPanel emptyLesson">
      <h1>{id}</h1>
      <p>Η ενότητα αυτή είναι κλειδωμένη για επόμενο update.</p>
    </main>
  )
}

function Platform({ goHome }) {
  const [activeLesson, setActiveLesson] = useState('1.1')
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="platform">
      <Sidebar activeLesson={activeLesson} setActiveLesson={setActiveLesson} goHome={goHome} />
      <div className="platformContent">
        <MobileHeader openMenu={() => setDrawerOpen(true)} goHome={goHome} />
        {activeLesson === '1.1' ? <Lesson11 /> : <ComingSoon id={activeLesson} />}
      </div>
      <MobileDrawer open={drawerOpen} close={() => setDrawerOpen(false)} activeLesson={activeLesson} setActiveLesson={setActiveLesson} goHome={goHome} />
    </div>
  )
}

function App() {
  const [page, setPage] = useState('home')
  return page === 'home' ? <HomePage onStart={() => setPage('platform')} /> : <Platform goHome={() => setPage('home')} />
}

createRoot(document.getElementById('root')).render(<App />)
