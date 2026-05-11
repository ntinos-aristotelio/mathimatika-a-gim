import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Για GitHub Pages, αν το repo λέγεται mathimatika-a-gim, άφησέ το έτσι.
  // Αν αλλάξεις όνομα repo, άλλαξε και το base.
  base: '/mathimatika-a-gim/'
});
