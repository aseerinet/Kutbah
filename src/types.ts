export type SermonType = 'جمعة' | 'محاضرة' | 'كلمة قصيرة' | 'موعظة' | 'درس تربوي' | 'مقال دعوي';

export type AudienceType = 'عام' | 'شباب' | 'آباء وأمهات' | 'طلاب' | 'موظفون' | 'أئمة وخطباء' | 'مجتمع محلي';

export type DurationType = '5 دقائق' | '10 دقائق' | '15 دقيقة' | '20 دقيقة' | '30 دقيقة' | '45 دقيقة';

export type StyleType = 'وعظي مؤثر' | 'علمي هادئ' | 'حماسي منضبط' | 'تربوي' | 'رسمي' | 'مبسط للعامة' | 'أدبي بليغ';

export type LanguageLevel = 'سهلة' | 'متوسطة' | 'فصيحة عالية';

export type OccasionType = 'جمعة عادية' | 'رمضان' | 'العيد' | 'الحج' | 'زواج' | 'وفاة' | 'بداية عام دراسي' | 'أزمة اجتماعية' | 'بدون مناسبة';

export interface SermonRequest {
  type: SermonType;
  topic: string;
  audience: AudienceType;
  duration: DurationType;
  style: StyleType;
  language: LanguageLevel;
  occasion: OccasionType;
  additionalElements: {
    quran: boolean;
    hadith: boolean;
    salaf: boolean;
    examples: boolean;
    story: boolean;
    dua: boolean;
  };
}

export interface Sermon {
  id: string;
  title: string;
  topic: string;
  content: string;
  date: string;
  request: SermonRequest;
}
