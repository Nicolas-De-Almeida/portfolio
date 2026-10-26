// Vercel Function: GET /api/wakatime?range=last_7_days
import { handleWakaTime } from "./_wakatime.js";

export default function handler(req, res) {
  return handleWakaTime(req, res, process.env);
}