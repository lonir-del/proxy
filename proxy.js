export default async function handler(req, res) {
  // 🔹 CORS headers SEMPRE no início
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔹 Preflight do Bubble (OBRIGATÓRIO)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const targetUrl =
    "https://script.google.com/macros/s/AKfycbzNhe2UFbZpk3iamLvYBUSyQ2lfEOdJ3HlIVvVJ9Ub5eOHoSjLF4whlxZskilvJkcFg/exec";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({
      error: "Erro no proxy",
      details: err.message
    });
  }
}
