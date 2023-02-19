import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//lol
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
