import { GoogleGenerativeAI } from '@google/generative-ai';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

function json(statusCode, body) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

function buildSermonPrompt(request) {
  const additional = request?.additionalElements
    ? Object.entries(request.additionalElements)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(', ')
    : '';

  return `
أنت خبير شرعي وخطيب مفوه. قم بإعداد ${request.type} بعنوان "${request.topic}" مع مراعاة المعايير التالية:
- الجمهور المستهدف: ${request.audience}
- مدة الإلقاء التقريبية: ${request.duration}
- الأسلوب: ${request.style}
- مستوى اللغة: ${request.language}
- المناسبة: ${request.occasion}
- العناصر المطلوبة: ${additional}

هيكل الخطبة المطلوب:
1. عنوان الخطبة
2. الهدف من الخطبة (بإيجاز)
3. المحاور الرئيسية (نقطتان أو ثلاث)
4. المقدمة الشرعية (تبدأ بالحمد والثناء والشهادتين والوصية بالتقوى)
5. الخطبة الأولى (مفصلة حسب الأسلوب المطلوب)
6. أدلة من القرآن والسنة (يجب أن تكون صحيحة ومخرجة)
7. تطبيقات عملية للمصلين (خطوات محددة للعمل)
8. خاتمة الخطبة الأولى
9. فاصل الجلسة
10. الخطبة الثانية
11. الدعاء الختامي
12. نقاط مختصرة للخطيب (للمراجعة السريعة)
13. ملاحظات شرعية للمراجعة قبل الإلقاء

الضوابط الشرعية الصارمة:
- لا تخترع آيات أو أحاديث.
- لا تنسب أقوالاً إلى العلماء بلا تحقق.
- إذا لم تتحقق من درجة الحديث، اكتب بوضوح: "يحتاج إلى تحقق من درجته قبل استخدامه".
- الالتزام بمنهج أهل السنة والجماعة.
- تجنب الغلو والتكلف والعبارات غير المنضبطة.

قم بتنسيق المخرجات باستخدام Markdown مع عناوين واضحة.
`;
}

function buildEditPrompt(content, action) {
  return `
لديك النص الشرعي التالي:
"${content}"

المطلوب القيام بالإجراء التالي عليه: "${action}"

الالتزامات:
- الحفاظ على الأسلوب الوقور المعتاد للخطباء.
- الحفاظ على الضوابط الشرعية ومنهج أهل السنة والجماعة.
- عدم حذف الأدلة الصحيحة إلا إذا كان المطلوب هو الاختصار الشديد.
- إذا كان الإجراء هو "تحويل لنقاط إلقاء"، فحولها إلى رؤوس أقلام منظمة.

أخرج النتيجة بصيغة Markdown.
`;
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return json(500, { error: 'GEMINI_API_KEY غير موجود في إعدادات Netlify Environment variables.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { mode, request, content, action } = body;

    let prompt = '';
    if (mode === 'generate') {
      if (!request?.topic) return json(400, { error: 'موضوع الخطبة مطلوب.' });
      prompt = buildSermonPrompt(request);
    } else if (mode === 'edit') {
      if (!content || !action) return json(400, { error: 'النص والإجراء مطلوبان.' });
      prompt = buildEditPrompt(content, action);
    } else {
      return json(400, { error: 'وضع غير معروف.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return json(200, { text: response.text() });
  } catch (error) {
    console.error('Gemini function error:', error);
    return json(500, { error: 'فشل الاتصال بخدمة الذكاء الاصطناعي.' });
  }
}
