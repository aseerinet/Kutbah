const { GoogleGenerativeAI } = require("@google/generative-ai");

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

    const genAI = new GoogleGenerativeAI(apiKey);
model: "gemini-3.1-flash-lite-preview",
    const model = genAI.getGenerativeModel({
      
      model: "gemini-3.1-flash-lite-preview",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text,
      }),
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
