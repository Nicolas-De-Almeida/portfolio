import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv  } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { handleWakaTime, WAKATIME_PATH } from "./api/_wakatime.js";
import { handleCodando, CODANDO_PATH } from "./api/_codando.js";



// Serve /api/wakatime e /api/codando no npm run dev e no npm run preview
function wakatimeApi(mode) {
  const env = loadEnv(mode, process.cwd(), ""); // lê o .env
  const routes = {
    [WAKATIME_PATH]: handleWakaTime,
    [CODANDO_PATH]: handleCodando,
  };

  const middleware = (req, res, next) => {
    const handler = routes[(req.url ?? "").split("?")[0]];
    return handler ? handler(req, res, env) : next();
  };

  return {
    name: "wakatime-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}



// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), wakatimeApi(mode)],
}));
