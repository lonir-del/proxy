export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const targetUrl =
    "https://script.google.com/macros/s/AKfycbzNhe2UFbZpk3iamLvYBUSyQ2lfEOdJ3HlIVvVJ9Ub5eOHoSjLF4whlxZskilvJkcFg/exec";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    // Repassa exatamente o que a API respondeu
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({
      error: "Erro no proxy",
      details: err.message,
    });
  }
}
