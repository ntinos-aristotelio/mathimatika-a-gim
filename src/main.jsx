import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BookOpen, Brain, Castle, ChevronDown, ChevronRight, Gamepad2, Home, Lock,
  Menu, Medal, Play, ShieldCheck, Sparkles, Sword, Wand2, X,
  GraduationCap, RotateCcw, Calculator, Flame
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
        progress: 68,
        lessons: [
          { id: '1.1', title: 'Φυσικοί αριθμοί - Διάταξη - Στρογγυλοποίηση', ready: true },
          { id: '1.2', title: 'Πρόσθεση, αφαίρεση και πολλαπλασιασμός', ready: true },
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

const quiz11 = [
  { question: 'Ποιος από τους αριθμούς είναι φυσικός;', options: ['-3', '0', '1,5', '2/3'], answer: '0', tip: 'Οι φυσικοί αριθμοί είναι 0, 1, 2, 3, ...' },
  { question: 'Ποια σχέση είναι σωστή;', options: ['4578 > 4587', '4587 > 4578', '4587 = 4578', '4578 > 5000'], answer: '4587 > 4578', tip: 'Συγκρίνουμε από αριστερά προς τα δεξιά.' },
  { question: 'Το 9.573.842 στρογγυλοποιημένο στις χιλιάδες γίνεται:', options: ['9.573.000', '9.574.000', '9.570.000', '10.000.000'], answer: '9.574.000', tip: 'Κοιτάμε το ψηφίο των εκατοντάδων: είναι 8.' },
]

const teacherQuiz11 = [
  { tag: 'Σύγκριση', question: 'Συμπλήρωσε σωστά: 763 ___ 836', options: ['<', '>', '='], answer: '<', explanation: 'Το 763 είναι μικρότερο από το 836.' },
  { tag: 'Σύγκριση', question: 'Συμπλήρωσε σωστά: 6542 ___ 6452', options: ['<', '>', '='], answer: '>', explanation: 'Στις εκατοντάδες έχουμε 5 > 4.' },
  { tag: 'Φθίνουσα σειρά', question: 'Ποια είναι η σωστή φθίνουσα σειρά των αριθμών 423, 243, 324, 234, 342, 432;', options: ['432, 423, 342, 324, 243, 234', '234, 243, 324, 342, 423, 432', '432, 342, 423, 324, 243, 234', '423, 432, 342, 324, 243, 234'], answer: '432, 423, 342, 324, 243, 234', explanation: 'Φθίνουσα σημαίνει από τον μεγαλύτερο προς τον μικρότερο.' },
  { tag: 'Στρογγυλοποίηση', question: 'Το 761 στην πλησιέστερη εκατοντάδα γίνεται:', options: ['700', '760', '800', '761'], answer: '800', explanation: 'Το ψηφίο των δεκάδων είναι 6.' },
]

const quiz12 = [
  { question: 'Ποιο είναι το αποτέλεσμα της πράξης 123 + 34 + 65;', options: ['222', '212', '232', '202'], answer: '222', tip: 'Πρώτα 123+34=157 και μετά 157+65=222.' },
  { question: 'Ποιο είναι το αποτέλεσμα της πράξης 245 - 132 + 97;', options: ['190', '210', '220', '200'], answer: '210', tip: '245-132=113 και 113+97=210.' },
  { question: 'Ποια ιδιότητα φαίνεται στην πράξη 3·(5+4)=3·5+3·4;', options: ['Αντιμεταθετική', 'Προσεταιριστική', 'Επιμεριστική', 'Ουδέτερο στοιχείο'], answer: 'Επιμεριστική', tip: 'Ο πολλαπλασιασμός μοιράζεται στην πρόσθεση.' },
  { question: 'Ποιο είναι το αποτέλεσμα της παράστασης 18 - (9 + 5);', options: ['4', '14', '22', '32'], answer: '4', tip: 'Πρώτα η παρένθεση: 9+5=14, μετά 18-14=4.' },
]

const teacherQuiz12 = [
  { tag: 'Άσκηση 5', question: 'Υπολόγισε: 123 + 34 + 65', options: ['222', '212', '232', '202'], answer: '222', explanation: '123+34=157 και 157+65=222.' },
  { tag: 'Άσκηση 5', question: 'Υπολόγισε: 245 - 132 + 97', options: ['200', '210', '220', '190'], answer: '210', explanation: '245-132=113 και 113+97=210.' },
  { tag: 'Άσκηση 5', question: 'Υπολόγισε: 7.645 - 6.739', options: ['906', '916', '806', '996'], answer: '906', explanation: '7.645-6.739=906.' },
  { tag: 'Άσκηση 5', question: 'Υπολόγισε: 9.876 - 567', options: ['9.309', '9.409', '9.209', '9.300'], answer: '9.309', explanation: '9.876-567=9.309.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 23 + 52 - 24', options: ['51', '49', '55', '47'], answer: '51', explanation: '23+52=75 και 75-24=51.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 18 - 11 + 9', options: ['16', '18', '20', '14'], answer: '16', explanation: '18-11=7 και 7+9=16.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 4·13 - 12', options: ['40', '52', '36', '44'], answer: '40', explanation: '4·13=52 και 52-12=40.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 1 + 2·3 - 4', options: ['3', '5', '7', '1'], answer: '3', explanation: 'Πρώτα 2·3=6, άρα 1+6-4=3.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 5·3 + 3·6', options: ['33', '30', '36', '24'], answer: '33', explanation: '15+18=33.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 2·11 - 4·5', options: ['2', '22', '20', '42'], answer: '2', explanation: '22-20=2.' },
  { tag: 'Άσκηση 6', question: 'Υπολόγισε: 6·8 - 4·5 + 3·10', options: ['58', '68', '48', '78'], answer: '58', explanation: '48-20+30=58.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: 18 - (9 + 5)', options: ['4', '14', '22', '32'], answer: '4', explanation: '9+5=14 και 18-14=4.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: 27 - (10 - 4)', options: ['21', '13', '41', '17'], answer: '21', explanation: '10-4=6 και 27-6=21.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: (16 + 8) - 12', options: ['12', '20', '4', '36'], answer: '12', explanation: '16+8=24 και 24-12=12.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: (27 - 13) - 12', options: ['2', '26', '14', '12'], answer: '2', explanation: '27-13=14 και 14-12=2.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: 17 - (8 - 2) + 12', options: ['23', '15', '27', '21'], answer: '23', explanation: '8-2=6, άρα 17-6+12=23.' },
  { tag: 'Άσκηση 7', question: 'Υπολόγισε: (25 - 15) - (7 + 2)', options: ['1', '19', '9', '10'], answer: '1', explanation: '25-15=10 και 7+2=9, άρα 10-9=1.' },
  { tag: 'Άσκηση 8', question: 'Υπολόγισε: 34 - [12 + (8 - 6)]', options: ['20', '22', '24', '18'], answer: '20', explanation: '8-6=2, 12+2=14, 34-14=20.' },
  { tag: 'Άσκηση 8', question: 'Υπολόγισε: 23 - [34 - (20 - 2)]', options: ['7', '5', '9', '3'], answer: '7', explanation: '20-2=18, 34-18=16, 23-16=7.' },
  { tag: 'Άσκηση 8', question: 'Υπολόγισε: (10 + 7 - 2) + (7 + 8 - 6)', options: ['24', '20', '26', '22'], answer: '24', explanation: '15+9=24.' },
  { tag: 'Άσκηση 8', question: 'Υπολόγισε: 94 - [(8+7) - (9-2)] - (11-8)', options: ['83', '80', '86', '89'], answer: '83', explanation: '(8+7)=15, (9-2)=7, 15-7=8, 11-8=3, άρα 94-8-3=83.' },
  { tag: 'Άσκηση 8', question: 'Υπολόγισε: [(13-7+5)-2] - [19-(4+8)]', options: ['2', '4', '6', '0'], answer: '2', explanation: 'Πρώτο μέρος 9, δεύτερο μέρος 7, άρα 2.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 3·(5+4)', options: ['27', '17', '12', '35'], answer: '27', explanation: '3·5 + 3·4 = 15+12=27.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 6·(8-3)', options: ['30', '66', '48', '18'], answer: '30', explanation: '6·8 - 6·3 = 48-18=30.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 2·(8+9)', options: ['34', '19', '36', '30'], answer: '34', explanation: '2·8+2·9=16+18=34.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 7·(6-4)', options: ['14', '42', '10', '28'], answer: '14', explanation: '7·6-7·4=42-28=14.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 5·(10+6)', options: ['80', '50', '30', '16'], answer: '80', explanation: '5·10+5·6=50+30=80.' },
  { tag: 'Άσκηση 9', question: 'Υπολόγισε με επιμεριστική: 11·(10-8)', options: ['22', '110', '88', '18'], answer: '22', explanation: '11·10-11·8=110-88=22.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 13·8 + 13·2', options: ['130', '104', '26', '100'], answer: '130', explanation: '13·(8+2)=13·10=130.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 12·3 + 12·7', options: ['120', '84', '36', '112'], answer: '120', explanation: '12·(3+7)=12·10=120.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 24·13 + 24·7', options: ['480', '312', '168', '240'], answer: '480', explanation: '24·(13+7)=24·20=480.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 16·13 - 16·3', options: ['160', '208', '48', '176'], answer: '160', explanation: '16·(13-3)=16·10=160.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 22·25 - 22·5', options: ['440', '550', '110', '500'], answer: '440', explanation: '22·(25-5)=22·20=440.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 13·93 + 13·7', options: ['1300', '1210', '91', '1393'], answer: '1300', explanation: '13·(93+7)=13·100=1300.' },
  { tag: 'Άσκηση 10', question: 'Υπολόγισε: 16·105 - 16·5', options: ['1600', '1680', '80', '1500'], answer: '1600', explanation: '16·(105-5)=16·100=1600.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 34·13', options: ['442', '340', '102', '476'], answer: '442', explanation: '34·(10+3)=340+102=442.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 45·102', options: ['4590', '4500', '459', '4690'], answer: '4590', explanation: '45·(100+2)=4500+90=4590.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 35·12', options: ['420', '350', '70', '400'], answer: '420', explanation: '35·(10+2)=350+70=420.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 34·101', options: ['3434', '3400', '3344', '3534'], answer: '3434', explanation: '34·(100+1)=3400+34=3434.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 43·9', options: ['387', '430', '344', '397'], answer: '387', explanation: '43·(10-1)=430-43=387.' },
  { tag: 'Άσκηση 11', question: 'Υπολόγισε με επιμεριστική: 56·99', options: ['5544', '5600', '5500', '5644'], answer: '5544', explanation: '56·(100-1)=5600-56=5544.' },
  { tag: 'Άσκηση 12', question: 'Πουκάμισο 29€, παντελόνι 25€, παπούτσια 34€. Πόσα ζήτησε ο ταμίας;', options: ['88€', '78€', '98€', '100€'], answer: '88€', explanation: '29+25+34=88€.' },
  { tag: 'Άσκηση 12', question: 'Αν είχε 100€ και πλήρωσε 88€, πόσα χρήματα του έμειναν;', options: ['12€', '22€', '10€', '18€'], answer: '12€', explanation: '100-88=12€.' },
  { tag: 'Άσκηση 13', question: 'Η Μαρία γεννήθηκε το 1984 και ο Κώστας είναι 13 χρόνια μικρότερος. Πότε γεννήθηκε ο Κώστας;', options: ['1997', '1971', '1987', '1993'], answer: '1997', explanation: 'Μικρότερος σημαίνει γεννήθηκε 13 χρόνια αργότερα: 1984+13=1997.' },
  { tag: 'Άσκηση 13', question: 'Το 2026, πόσο χρονών είναι η Μαρία;', options: ['42', '40', '43', '39'], answer: '42', explanation: '2026-1984=42.' },
  { tag: 'Άσκηση 13', question: 'Το 2026, πόσο χρονών είναι ο Κώστας;', options: ['29', '30', '28', '31'], answer: '29', explanation: '2026-1997=29.' },
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
          <p>Κάθε παράγραφος γίνεται αποστολή, κάθε σωστή απάντηση δίνει XP και κάθε ενότητα οδηγεί σε boss challenge.</p>
          <div className="heroActions">
            <button className="primaryBtn" onClick={onStart}><Play size={18}/> Ξεκίνα περιπέτεια</button>
            <button className="secondaryBtn" onClick={onStart}><BookOpen size={18}/> Άνοιξε τα κεφάλαια</button>
          </div>
        </div>

        <div className="heroCard">
          <div className="questCard">
            <div className="questTop"><Castle/> Νέα αποστολή</div>
            <h2>1.2 Πράξεις φυσικών αριθμών</h2>
            <p>Πρόσθεση, αφαίρεση, πολλαπλασιασμός και επιμεριστική ιδιότητα.</p>
            <ProgressBar value={68} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature"><Gamepad2/><h3>Quiz</h3><p>Άμεση ανατροφοδότηση και XP.</p></div>
        <div className="feature"><GraduationCap/><h3>Extra Quiz</h3><p>Οι ασκήσεις καθηγητή εμφανίζονται μία-μία.</p></div>
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

function StandardQuiz({ title, subtitle, items, addXp }) {
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState('')
  const current = items[qIndex]
  const correct = picked === current.answer

  function choose(option) {
    setPicked(option)
    if (option === current.answer) addXp(15)
  }

  function next() {
    setPicked('')
    setQIndex((qIndex + 1) % items.length)
  }

  return (
    <section className="contentPanel quizPanel">
      <div className="sectionHeader"><Gamepad2/><div><h2>{title}</h2><p>{subtitle}</p></div></div>
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
  )
}

function ExtraTeacherQuiz({ addXp, title, items }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState('')
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const item = items[index]
  const correct = picked === item.answer
  const progress = Math.round(((index + (answered ? 1 : 0)) / items.length) * 100)

  function choose(option) {
    if (answered) return
    setPicked(option)
    setAnswered(true)
    if (option === item.answer) {
      setScore((s) => s + 1)
      addXp(8)
    }
  }

  function next() {
    if (index + 1 >= items.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked('')
    setAnswered(false)
  }

  function restart() {
    setIndex(0)
    setPicked('')
    setAnswered(false)
    setScore(0)
    setFinished(false)
  }

  return (
    <section className="contentPanel teacherQuizPanel">
      <div className="teacherQuizTop">
        <div className="sectionHeader noMargin">
          <GraduationCap />
          <div>
            <h2>{title}</h2>
            <p>Μία ερώτηση κάθε φορά, για να μη γεμίζει η σελίδα.</p>
          </div>
        </div>
        <div className="quizScore">
          <b>{score}/{items.length}</b>
          <span>score</span>
        </div>
      </div>

      <ProgressBar value={finished ? 100 : progress} />

      {!finished ? (
        <div className="compactQuizCard">
          <div className="questionMeta">
            <span>{item.tag}</span>
            <b>Ερώτηση {index + 1} από {items.length}</b>
          </div>
          <h3>{item.question}</h3>

          <div className="compactOptions">
            {item.options.map((option) => (
              <button
                key={option}
                className={
                  answered && option === item.answer
                    ? 'correctChoice'
                    : answered && option === picked && option !== item.answer
                    ? 'wrongChoice'
                    : ''
                }
                onClick={() => choose(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {answered && (
            <div className={correct ? 'okBox' : 'noBox'}>
              {correct ? '✅ Σωστό!' : '❌ Όχι ακόμα.'} {item.explanation}
            </div>
          )}

          <div className="compactActions">
            <button className="primaryBtn compact" onClick={next} disabled={!answered}>
              {index + 1 >= items.length ? 'Ολοκλήρωση' : 'Επόμενη'}
            </button>
          </div>
        </div>
      ) : (
        <div className="quizFinished">
          <div className="bigMedal">🏅</div>
          <h3>Ολοκλήρωσες το Extra Quiz!</h3>
          <p>Σκορ: {score}/{items.length}</p>
          <button className="primaryBtn compact" onClick={restart}><RotateCcw size={16}/> Ξανά προσπάθεια</button>
        </div>
      )}
    </section>
  )
}

function ProfileCard({ xp }) {
  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp])
  return (
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
  )
}

function Lesson11() {
  const [xp, setXp] = useState(240)
  const [boss, setBoss] = useState({ round: 0, score: 0, done: false })
  const addXp = (amount) => setXp((v) => v + amount)

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
        <ProfileCard xp={xp} />
      </section>

      <section className="contentPanel">
        <div className="sectionHeader"><ShieldCheck/><div><h2>Θυμόμαστε — Μαθαίνουμε</h2><p>Η θεωρία σε μικρά βήματα.</p></div></div>
        <div className="theoryGrid">
          <article><b>1. Φυσικοί αριθμοί</b><p>Οι αριθμοί 0, 1, 2, 3, 4, ... ονομάζονται φυσικοί αριθμοί.</p></article>
          <article><b>2. Άρτιοι και περιττοί</b><p>Άρτιοι είναι οι φυσικοί που διαιρούνται με το 2.</p></article>
          <article><b>3. Διάταξη</b><p>Χρησιμοποιούμε τα σύμβολα =, &lt;, &gt;.</p></article>
          <article><b>4. Στρογγυλοποίηση</b><p>Αν το επόμενο ψηφίο είναι 5–9, ανεβάζουμε κατά 1.</p></article>
        </div>
      </section>

      <StandardQuiz title="Quiz Αστραπή" subtitle="Κάθε σωστή απάντηση δίνει +15 XP." items={quiz11} addXp={addXp} />
      <ExtraTeacherQuiz title="Extra Quiz Καθηγητή — 1.1" items={teacherQuiz11} addXp={addXp} />

      <section className="bossPanel">
        <div><div className="pill danger"><Sword size={16}/> Boss Challenge</div><h2>Ο Δράκος της Στρογγυλοποίησης 🐉</h2><p>Απάντησε σε 3 γρήγορες προκλήσεις.</p></div>
        <div className="bossGame">
          <div className="dragon">🐉</div>
          <p>Πρόκληση {Math.min(boss.round + 1, 3)} / 3</p>
          <h3>{boss.done ? `Τελικό σκορ: ${boss.score}/3` : 'Το 761 στην πλησιέστερη εκατοντάδα είναι 800;'}</h3>
          {!boss.done ? <div className="bossBtns"><button onClick={() => bossAnswer(true)}>Σωστό</button><button onClick={() => bossAnswer(false)}>Λάθος</button></div> : <div className="badgeWin"><Medal/> Κέρδισες: Φύλακας της 1.1</div>}
        </div>
      </section>
    </main>
  )
}

function Lesson12() {
  const [xp, setXp] = useState(320)
  const [boss, setBoss] = useState({ round: 0, score: 0, done: false })
  const addXp = (amount) => setXp((v) => v + amount)

  const bossQuestions = [
    { q: '13·93 + 13·7 = 1300;', ok: true },
    { q: '34 - [12 + (8-6)] = 24;', ok: false },
    { q: '56·99 = 5544;', ok: true },
  ]

  function bossAnswer(ok) {
    if (boss.done) return
    const current = bossQuestions[boss.round]
    const nextRound = boss.round + 1
    const nextScore = boss.score + (ok === current.ok ? 1 : 0)
    setBoss({ round: nextRound, score: nextScore, done: nextRound >= bossQuestions.length })
    if (ok === current.ok) addXp(20)
  }

  const bossText = boss.done ? `Τελικό σκορ: ${boss.score}/3` : bossQuestions[boss.round].q

  return (
    <main className="appGrid">
      <section className="lessonHero">
        <div>
          <div className="pill blue"><Calculator size={16}/> Ενότητα 1.2</div>
          <h1>Πρόσθεση — Αφαίρεση — Πολλαπλασιασμός φυσικών αριθμών</h1>
          <p>Μαθαίνουμε να εκτελούμε πράξεις, να σεβόμαστε την προτεραιότητα και να χρησιμοποιούμε έξυπνα την επιμεριστική ιδιότητα.</p>
        </div>
        <ProfileCard xp={xp} />
      </section>

      <section className="contentPanel">
        <div className="sectionHeader"><ShieldCheck/><div><h2>Θυμόμαστε — Μαθαίνουμε</h2><p>Η θεωρία της 1.2 σε μικρά βήματα.</p></div></div>
        <div className="theoryGrid">
          <article><b>1. Πρόσθεση</b><p>Στην πρόσθεση οι αριθμοί λέγονται προσθετέοι και το αποτέλεσμα άθροισμα.</p></article>
          <article><b>2. Αφαίρεση</b><p>Στους φυσικούς αριθμούς ο αφαιρετέος πρέπει να είναι μικρότερος ή ίσος του μειωτέου.</p></article>
          <article><b>3. Πολλαπλασιασμός</b><p>Οι αριθμοί που πολλαπλασιάζονται λέγονται παράγοντες και το αποτέλεσμα γινόμενο.</p></article>
          <article><b>4. Ιδιότητες</b><p>Αντιμεταθετική, προσεταιριστική και επιμεριστική ιδιότητα βοηθούν στους γρήγορους υπολογισμούς.</p></article>
        </div>
      </section>

      <section className="contentPanel twoCol">
        <div>
          <div className="sectionHeader small"><Wand2/><h2>Παραδείγματα</h2></div>
          <div className="example"><b>Προτεραιότητα</b><p>1 + 2·3 - 4 = 1 + 6 - 4 = 3</p></div>
          <div className="example"><b>Επιμεριστική</b><p>13·93 + 13·7 = 13·(93+7) = 13·100 = 1300</p></div>
        </div>
        <div className="practiceBox">
          <h3>Mini αποστολή</h3>
          <p>Κυνήγι γρήγορης πράξης:</p>
          <div className="numberChips"><span>34·13</span><span>45·102</span><span>56·99</span></div>
          <div className="answerLine">Χρησιμοποίησε 10, 100 ή επιμεριστική για πιο γρήγορη λύση.</div>
        </div>
      </section>

      <StandardQuiz title="Quiz Αστραπή — 1.2" subtitle="Πράξεις, παρενθέσεις και ιδιότητες." items={quiz12} addXp={addXp} />
      <ExtraTeacherQuiz title="Extra Quiz Καθηγητή — 1.2" items={teacherQuiz12} addXp={addXp} />

      <section className="bossPanel">
        <div>
          <div className="pill danger"><Sword size={16}/> Boss Challenge</div>
          <h2>Ο Goblin των Πράξεων ⚔️</h2>
          <p>Απάντησε σωστά σε 3 γρήγορες κρίσεις πράξεων για να πάρεις το badge της 1.2.</p>
        </div>
        <div className="bossGame">
          <div className="dragon">🧌</div>
          <p>Πρόκληση {Math.min(boss.round + 1, 3)} / 3</p>
          <h3>{bossText}</h3>
          {!boss.done ? (
            <div className="bossBtns">
              <button onClick={() => bossAnswer(true)}>Σωστό</button>
              <button onClick={() => bossAnswer(false)}>Λάθος</button>
            </div>
          ) : (
            <div className="badgeWin"><Medal/> Κέρδισες: Κυρίαρχος της 1.2</div>
          )}
        </div>
      </section>
    </main>
  )
}

function ComingSoon({ id }) {
  return <main className="contentPanel emptyLesson"><h1>{id}</h1><p>Η ενότητα αυτή είναι κλειδωμένη για επόμενο update.</p></main>
}

function Platform({ goHome }) {
  const [activeLesson, setActiveLesson] = useState('1.2')
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="platform">
      <Sidebar activeLesson={activeLesson} setActiveLesson={setActiveLesson} goHome={goHome} />
      <div className="platformContent">
        <MobileHeader openMenu={() => setDrawerOpen(true)} goHome={goHome} />
        {activeLesson === '1.1' ? <Lesson11 /> : activeLesson === '1.2' ? <Lesson12 /> : <ComingSoon id={activeLesson} />}
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
