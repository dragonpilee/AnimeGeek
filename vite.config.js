import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    // Expose env variables to the client
    define: {
      'process.env': {}
    },
  };
});
