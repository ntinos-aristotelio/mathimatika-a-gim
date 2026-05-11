# Μαθηματικά Α' Γυμνασίου - Ακαδημία Μαθηματικών Ηρώων

Διαδραστική διαδικτυακή εφαρμογή για το μάθημα Μαθηματικά Α' Γυμνασίου.

## Περιέχει

- Χάρτη ενοτήτων
- Mini quiz
- XP, επίπεδα, badges και σερί σωστών απαντήσεων
- Βοήθειες για τον μαθητή
- Παιχνιδιάρικο αλλά καθαρό εκπαιδευτικό περιβάλλον

## Τοπική εκτέλεση

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Ανέβασμα στο GitHub

```bash
git init
git add .
git commit -m "Initial math app"
git branch -M main
git remote add origin https://github.com/USERNAME/mathimatika-a-gim.git
git push -u origin main
```

## GitHub Pages

1. Στο `vite.config.js` πρόσθεσε `base: '/mathimatika-a-gim/'` αν το repo λέγεται `mathimatika-a-gim`.
2. Τρέξε:

```bash
npm run build
npm run deploy
```

## Επόμενες ιδέες

- Teacher dashboard
- Τράπεζα ασκήσεων ανά κεφάλαιο
- Αποθήκευση προόδου μαθητή
- Περισσότερα mini games
- Ελληνικά badges και τίτλοι μαθηματικών ηρώων
