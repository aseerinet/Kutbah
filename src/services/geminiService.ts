import { GoogleGenerativeAI } from "@google/generative-ai";
import { SermonRequest } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSermon(request: SermonRequest): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
أنت خبير شرعي وخطيب مفوه. قم بإعداد ${request.type} بعنوان "${request.topic}" مع مراعاة المعايير التالية:
- الجمهور المستهدف: ${request.audience}
- مدة الإلقاء التقريبية: ${request.duration}
- الأسلوب: ${request.style}
- مستوى اللغة: ${request.language}
- المناسبة: ${request.occasion}
- العناصر المطلوبة: ${Object.entries(request.additionalElements).filter(([_, v]) => v).map(([k]) => k).join(', ')}

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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating sermon:", error);
    throw new Error("فشل في توليد الخطبة. يرجى المحاولة مرة أخرى.");
  }
}

export async function editSermonAction(content: string, action: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error editing sermon:", error);
    throw new Error("فشل في تعديل الخطبة.");
  }
}
