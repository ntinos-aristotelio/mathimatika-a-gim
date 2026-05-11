# Η Ακαδημία των Μαθηματικών Ηρώων — v17 stable restore

Ασφαλής επαναφορά της 2.4 σε έκδοση που ανοίγει κανονικά:
- 2.4 ενεργή στο μενού
- Quiz Αστραπή
- Extra Quiz Καθηγητή με τις ασκήσεις 47–65
- Χωρίς το broken rewrite που προκάλεσε λευκή σελίδα

Σημείωση: πρώτα σταθεροποιούμε την εφαρμογή, μετά συνεχίζουμε με μικρές visual βελτιώσεις.


## Deploy note
This build includes a prebuilt `dist/` folder.
GitHub Actions deploys `dist/` directly and does not run `npm install` or `npm run build`.
