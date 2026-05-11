import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BookOpen,
  Brain,
  Castle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gamepad2,
  Heart,
  Home,
  Lock,
  Medal,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Sword,
  Trophy,
  Wand2,
} from 'lucide-react'
import './styles.css'

const lessonMenu = [
  { id: '1.1', title: 'Φυσικοί αριθμοί - Διάταξη - Στρογγυλοποίηση', ready: true },
  { id: '1.2', title: 'Πρόσθεση, αφαίρεση και πολλαπλασιασμός', ready: false },
  { id: '1.3', title: 'Δυνάμεις φυσικών αριθμών', ready: false },
  { id: '1.4', title: 'Ευκλείδεια διαίρεση - Διαιρετότητα', ready: false },
  { id: '1.5', title: 'Χαρακτήρες διαιρετότητας - ΜΚΔ - ΕΚΠ', ready: false },
  { id: 'general', title: 'Γενικές Ασκήσεις Κεφαλαίου 1', ready: false },
]

const worlds = [
  { icon: '🔢', title: 'Φυσικοί αριθμοί', subtitle: 'Ξεκλείδωτο', progress: 38 },
  { icon: '🍕', title: 'Κλάσματα', subtitle: 'Έρχεται σύντομα', progress: 0 },
  { icon: '💰', title: 'Δεκαδικοί', subtitle: 'Έρχεται σύντομα', progress: 0 },
  { icon: '📐', title: 'Γεωμετρία', subtitle: 'Έρχεται σύντομα', progress: 0 },
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
    tip: 'Κοιτάμε το ψηφίο των εκατοντάδων: είναι 8, άρα ανεβάζουμε τις χιλιάδες.',
  },
]

function ProgressBar({ value, dark = false }) {
  return (
    <div className={`progress ${dark ? 'progressDark' : ''}`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat">
      <div>{icon}</div>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

function HomePage({ onStart }) {
  return (
    <div className="home">
      <nav className="topbar">
        <div className="brand">
          <span className="brandIcon">π</span>
          <span>Math Heroes Academy</span>
        </div>
        <button className="ghostBtn" onClick={onStart}>Δες τα μαθήματα</button>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="pill"><Sparkles size={16}/> Μαθηματικά Α' Γυμνασίου</div>
          <h1>Η Ακαδημία των Μαθηματικών Ηρώων</h1>
          <p>
            Μια παιχνιδιάρικη αλλά σοβαρή πλατφόρμα όπου κάθε παράγραφος γίνεται αποστολή,
            κάθε σωστή απάντηση δίνει XP και κάθε δυσκολία γίνεται βοήθεια.
          </p>
          <div className="heroActions">
            <button className="primaryBtn" onClick={onStart}><Play size={18}/> Ξεκίνα περιπέτεια</button>
            <button className="secondaryBtn" onClick={onStart}><BookOpen size={18}/> Άνοιξε το Κεφ. 1</button>
          </div>
        </div>

        <div className="heroCard">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="questCard">
            <div className="questTop">
              <Castle />
              <span>Πρώτη αποστολή</span>
            </div>
            <h2>1.1 Φυσικοί αριθμοί</h2>
            <p>Κατανόησε, σύγκρινε και στρογγυλοποίησε αριθμούς για να ανοίξεις την πύλη του Κεφαλαίου 1.</p>
            <ProgressBar value={38} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature"><Gamepad2/><h3>Quiz & αποστολές</h3><p>Μικρές δοκιμασίες με άμεση ανατροφοδότηση.</p></div>
        <div className="feature"><Trophy/><h3>XP & επίπεδα</h3><p>Ο μαθητής νιώθει πρόοδο σε κάθε βήμα.</p></div>
        <div className="feature"><Sword/><h3>Boss challenges</h3><p>Τελική πρόκληση για κάθε παράγραφο.</p></div>
        <div className="feature"><Brain/><h3>Σωστή θεωρία</h3><p>Οργάνωση σύμφωνα με τη δομή του σχολικού βιβλίου.</p></div>
      </section>

      <section className="worldMap">
        <div>
          <h2>Χάρτης μαθηματικού κόσμου</h2>
          <p>Ξεκίνα από τους Φυσικούς αριθμούς και προχώρα βήμα-βήμα.</p>
        </div>
        <div className="worldGrid">
          {worlds.map((w) => (
            <button className="world" key={w.title} onClick={w.progress ? onStart : undefined}>
              <span>{w.icon}</span>
              <b>{w.title}</b>
              <small>{w.subtitle}</small>
              <ProgressBar value={w.progress} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function Sidebar({ active, setActive, goHome }) {
  return (
    <aside className="sidebar">
      <button className="homeBtn" onClick={goHome}><Home size={18}/> Αρχική</button>
      <div className="sideTitle">
        <span>ΜΕΡΟΣ Α'</span>
        <b>Κεφάλαιο 1 — Φυσικοί αριθμοί</b>
      </div>
      <div className="lessonList">
        {lessonMenu.map((item) => (
          <button
            key={item.id}
            className={`lessonBtn ${active === item.id ? 'active' : ''}`}
            onClick={() => item.ready && setActive(item.id)}
            title={item.title}
          >
            <span className="lessonId">{item.id === 'general' ? 'Γεν.' : item.id}</span>
            <span>{item.title}</span>
            {item.ready ? <ChevronRight size={16}/> : <Lock size={15}/>}
          </button>
        ))}
      </div>
    </aside>
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

  function choose(option) {
    setPicked(option)
    if (option === current.answer) setXp((v) => v + 15)
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
    if (ok) setXp((v) => v + 20)
  }

  return (
    <main className="appGrid">
      <section className="lessonHero">
        <div>
          <div className="pill blue"><BookOpen size={16}/> Ενότητα 1.1</div>
          <h1>Φυσικοί αριθμοί — Διάταξη — Στρογγυλοποίηση</h1>
          <p>
            Μαθαίνουμε τους φυσικούς αριθμούς, πώς τους συγκρίνουμε και πότε αντικαθιστούμε
            έναν αριθμό με μια κοντινή προσέγγιση.
          </p>
        </div>
        <div className="profileCard">
          <span>Προφίλ μαθητή</span>
          <h2>Επίπεδο {level}</h2>
          <ProgressBar value={xp % 100} dark />
          <div className="statsRow">
            <Stat icon="⭐" value={xp} label="XP" />
            <Stat icon="🔥" value="4" label="σερί" />
            <Stat icon="🏅" value="6" label="badges" />
          </div>
        </div>
      </section>

      <section className="contentPanel">
        <div className="sectionHeader">
          <ShieldCheck />
          <div>
            <h2>Θυμόμαστε — Μαθαίνουμε</h2>
            <p>Η θεωρία σε μικρά βήματα.</p>
          </div>
        </div>

        <div className="theoryGrid">
          <article className="theoryCard">
            <b>1. Φυσικοί αριθμοί</b>
            <p>Οι αριθμοί 0, 1, 2, 3, 4, ... ονομάζονται φυσικοί αριθμοί.</p>
          </article>
          <article className="theoryCard">
            <b>2. Άρτιοι και περιττοί</b>
            <p>Άρτιοι είναι οι φυσικοί που διαιρούνται με το 2. Οι υπόλοιποι λέγονται περιττοί.</p>
          </article>
          <article className="theoryCard">
            <b>3. Διάταξη</b>
            <p>Χρησιμοποιούμε τα σύμβολα =, &lt;, &gt; για να συγκρίνουμε αριθμούς.</p>
          </article>
          <article className="theoryCard">
            <b>4. Στρογγυλοποίηση</b>
            <p>Αν το επόμενο ψηφίο είναι 0–4, μηδενίζουμε. Αν είναι 5–9, ανεβάζουμε κατά 1.</p>
          </article>
        </div>
      </section>

      <section className="contentPanel twoCol">
        <div>
          <div className="sectionHeader small">
            <Wand2 />
            <h2>Παραδείγματα</h2>
          </div>
          <div className="example">
            <b>Σύγκριση</b>
            <p>4587 &gt; 4578, γιατί στις δεκάδες το 8 είναι μεγαλύτερο από το 7.</p>
          </div>
          <div className="example">
            <b>Στρογγυλοποίηση στις χιλιάδες</b>
            <p>9.573.842 ≈ 9.574.000, γιατί το ψηφίο των εκατοντάδων είναι 8.</p>
          </div>
        </div>
        <div className="practiceBox">
          <h3>Mini αποστολή</h3>
          <p>Βάλε τους αριθμούς σε αύξουσα σειρά:</p>
          <div className="numberChips">
            <span>3.515</span><span>4.800</span><span>3.508</span><span>3.620</span>
          </div>
          <div className="answerLine">Σωστή σειρά: 3.508 → 3.515 → 3.620 → 4.800</div>
        </div>
      </section>

      <section className="contentPanel quizPanel">
        <div className="sectionHeader">
          <Gamepad2 />
          <div>
            <h2>Quiz Αστραπή</h2>
            <p>Κάθε σωστή απάντηση δίνει +15 XP.</p>
          </div>
        </div>
        <div className="question">{current.question}</div>
        <div className="optionsGrid">
          {current.options.map((option) => (
            <button
              key={option}
              className={`option ${picked === option ? (correct ? 'good' : 'bad') : ''}`}
              onClick={() => choose(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {picked && (
          <div className={`feedback ${correct ? 'goodText' : 'badText'}`}>
            {correct ? '✅ Μπράβο! Κέρδισες XP.' : `❌ Όχι ακόμα. ${current.tip}`}
          </div>
        )}
        <button className="primaryBtn compact" onClick={next}>Επόμενη ερώτηση</button>
      </section>

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

function ComingSoon() {
  return (
    <main className="contentPanel emptyLesson">
      <h1>Έρχεται σύντομα</h1>
      <p>Η ενότητα αυτή είναι κλειδωμένη για το επόμενο update.</p>
    </main>
  )
}

function Platform({ goHome }) {
  const [active, setActive] = useState('1.1')
  return (
    <div className="platform">
      <Sidebar active={active} setActive={setActive} goHome={goHome} />
      <div className="platformContent">
        {active === '1.1' ? <Lesson11 /> : <ComingSoon />}
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('home')
  return page === 'home'
    ? <HomePage onStart={() => setPage('platform')} />
    : <Platform goHome={() => setPage('home')} />
}

createRoot(document.getElementById('root')).render(<App />)
