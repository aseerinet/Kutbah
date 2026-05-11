# دليل الخطيب

تطبيق ويب عربي لإعداد الخطب والمحاضرات الشرعية.

## التشغيل المحلي

```bash
npm install
npm run dev
```

للتجربة المحلية مع دالة Netlify الخاصة بالذكاء الاصطناعي، استخدم Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

ثم أضف المتغير البيئي:

```bash
GEMINI_API_KEY=your_key_here
```

## النشر على Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Environment variable: `GEMINI_API_KEY`

تم نقل اتصال Gemini إلى Netlify Function حتى لا يظهر المفتاح داخل ملفات الواجهة الأمامية.
