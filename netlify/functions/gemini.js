exports.handler = async function (event) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    }

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "GEMINI_API_KEY غير موجود في Netlify Environment Variables",
        }),
      };
    }

    let body = {};
    try {
      body = JSON.parse(event.body || "{}");
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "صيغة الطلب غير صحيحة",
          details: error.message,
        }),
      };
    }

    const prompt = body.prompt || body.message || body.text;

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "لم يصل نص الطلب إلى دالة Gemini",
          receivedBody: body,
        }),
      };
    }

    const modelName = "gemini-2.5-flash";

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent` +
      `?key=${apiKey}`;

    const geminiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
  temperature: 0.65,
  maxOutputTokens: 8192,
},
      }),
    });

    const data = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      return {
        statusCode: geminiResponse.status,
        headers,
        body: JSON.stringify({
          error: "فشل الاتصال بخدمة Gemini",
          status: geminiResponse.status,
          details:
            data?.error?.message ||
            data?.error ||
            data ||
            "خطأ غير معروف من Gemini",
        }),
      };
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("\n")
        .trim() || "";

    if (!text) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "وصل رد من Gemini لكنه لا يحتوي على نص",
          raw: data,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error("Gemini function error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "فشل الاتصال بخدمة الذكاء الاصطناعي",
        details: error.message || String(error),
      }),
    };
  }
};
