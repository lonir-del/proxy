export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Resposta para OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const targetUrl =
    "https://script.google.com/macros/s/AKfycbzNhe2UFbZpk3iamLvYBUSyQ2lfEOdJ3HlIVvVJ9Ub5eOHoSjLF4whlxZskilvJkcFg/exec"; // Seu Apps Script ou outra API

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body) // Passando os dados recebidos pela requisição para o Apps Script
    });

    const data = await response.json(); // Supondo que o Apps Script retorne JSON

    res.status(200).json(data); // Envia a resposta de volta para o Bubble
  } catch (err) {
    res.status(500).json({
      error: "Erro ao fazer a chamada da API",
      details: err.message
    });
  }
}
