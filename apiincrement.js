// api/increment.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Campo 'name' é obrigatório" });
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzNhe2UFbZpk3iamLvYBUSyQ2lfEOdJ3HlIVvVJ9Ub5eOHoSjLF4whlxZskilvJkcFg/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    const data = await response.json();

    // Retorna a resposta para o Bubble
    res.setHeader("Access-Control-Allow-Origin", "*"); // resolve CORS
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao chamar Apps Script", details: err.message });
  }
}