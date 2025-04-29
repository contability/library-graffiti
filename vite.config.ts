import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.svg"],
  resolve: {
    alias: {
      "file-saver": path.resolve(
        __dirname,
        "node_modules/file-saver/dist/FileSaver.min.js"
      ),
    },
  },
});
