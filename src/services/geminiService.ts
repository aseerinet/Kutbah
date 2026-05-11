import { SermonRequest } from "../types";

function buildPrompt(request: SermonRequest): string {
  return `
أنت مساعد متخصص في إعداد الخطب والمحاضرات الشرعية وفق منهج أهل السنة والجماعة، بلغة عربية فصيحة، مؤثرة، منضبطة، بعيدة عن الغلو والتكلف.

مهمتك إنشاء مادة شرعية بناءً على البيانات التالية:

نوع المحتوى: ${request.type || "خطبة جمعة"}
الموضوع: ${request.topic || "موضوع عام"}
الجمهور المستهدف: ${request.audience || "عام"}
مدة الإلقاء: ${request.duration || "15 دقيقة"}
الأسلوب: ${request.style || "وعظي مؤثر"}
مستوى اللغة: ${request.languageLevel || "متوسطة"}
المناسبة: ${request.occasion || "بدون مناسبة"}
العناصر المطلوبة: ${JSON.stringify(request)}

التزم بما يلي:
1. لا تخترع آيات أو أحاديث أو مصادر.
2. إذا ذكرت حديثًا فليكن مشهورًا صحيح المعنى، وإن لم تتحقق من درجته فاكتب: يحتاج إلى تحقق من درجته قبل استخدامه.
3. اجعل الخطبة منظمة ومترابطة ومناسبة للجمهور.
4. استخدم لغة عربية فصيحة سهلة مع لمسات بلاغية مؤثرة.
5. اجعل لكل خطبة هدفًا واضحًا ورسالة عملية.
6. لا تستخدم عبارات غلو أو تكلف.
7. اختم بدعاء مناسب.

أخرج النتيجة بهذا الترتيب:

# العنوان
# الهدف من الخطبة
# المحاور الرئيسية
# المقدمة
# الخطبة الأولى
# الأدلة الشرعية
# تطبيقات عملية
# خاتمة الخطبة الأولى
# فاصل الجلسة
# الخطبة الثانية
# الدعاء الختامي
# نقاط مختصرة للخطيب
# ملاحظات شرعية للمراجعة قبل الإلقاء
`;
}

async function callGeminiFunction(prompt: string): Promise<string> {
  const response = await fetch("/.netlify/functions/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.details ||
      data?.error ||
      "فشل الاتصال بخدمة الذكاء الاصطناعي."
    );
  }

  return data.text || data.result || data.content || "";
}

export async function generateSermon(request: SermonRequest): Promise<string> {
  const prompt = buildPrompt(request);
  return await callGeminiFunction(prompt);
}

export async function editSermonAction(
  content: string,
  action: string
): Promise<string> {
  const prompt = `
أنت مساعد متخصص في تحسين الخطب والمحاضرات الشرعية.

لديك النص التالي:

${content}

المطلوب تنفيذه على النص:
${action}

التزم بما يلي:
1. حافظ على المعنى الأصلي.
2. لا تخترع آيات أو أحاديث أو مصادر.
3. لا تنسب أقوالًا إلى العلماء بلا تحقق.
4. حسّن النص بلغة عربية فصيحة ومؤثرة.
5. أعد النص كاملًا بعد التحسين، وليس مجرد ملاحظات.
6. إذا أضفت حديثًا أو أثرًا يحتاج تحققًا، فاكتب بجانبه: يحتاج إلى تحقق من درجته قبل استخدامه.
`;

  return await callGeminiFunction(prompt);
}
