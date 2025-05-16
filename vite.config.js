import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compression from "vite-plugin-compression";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3002,
    },
    build: {
        outDir: "public",
    },
    compression: {
        algorithm: "gzip",
        ext: ".gz",
    },
});
