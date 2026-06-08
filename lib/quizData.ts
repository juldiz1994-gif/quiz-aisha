export type AnswerOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  question: string;
  options: AnswerOption[];
};

export type QuizAnswers = Record<string, string>;

// Q1 — branch point
export const q1: Question = {
  id: "q1",
  question: "Сізге қазір не қажет?",
  options: [
    {
      id: "A",
      text: "Бизнесімді автоматты жұмыс жасауға көшіргім келеді — сіздер жасап беріңіздер",
    },
    {
      id: "B",
      text: "Мен өзім үйреніп, бизнесімді автоматтандырғым келеді",
    },
  ],
};

// === SERVICE PATH (A) ===
export const serviceQuestions: Question[] = [
  {
    id: "q2a",
    question: "Бизнесіңіз қандай салада?",
    options: [
      { id: "A", text: "Онлайн білім / коучинг / курс" },
      { id: "B", text: "Сауда — өнім сату" },
      { id: "C", text: "Қызмет (мастер, салон, дәрігер, т.б.)" },
    ],
  },
  {
    id: "q3a",
    question: "Не автоматтандырғыңыз келеді?",
    options: [
      { id: "A", text: "Instagram / Telegram боты — тапсырыс + сату" },
      { id: "B", text: "Лид боты — клиентті сүзу + квалификациялау" },
      { id: "C", text: "Төлем → чек тексеру → курсқа автоматты қосу" },
    ],
  },
  {
    id: "q4a",
    question: "Ай сайын қанша лид / тапсырыс келеді?",
    options: [
      { id: "A", text: "0–20 (жаңа бастаған)" },
      { id: "B", text: "20–100" },
      { id: "C", text: "100+ (масштаб керек)" },
    ],
  },
  {
    id: "q5a",
    question: "Бюджетіңіз шамамен қандай?",
    options: [
      { id: "A", text: "10,000 – 50,000 ₸" },
      { id: "B", text: "50,000 – 150,000 ₸" },
      { id: "C", text: "150,000 – 300,000 ₸" },
      { id: "D", text: "300,000 ₸ және одан жоғары" },
    ],
  },
  {
    id: "q6a",
    question: "Бот қашан іске қосылсын?",
    options: [
      { id: "A", text: "Жедел — 1–2 апта ішінде" },
      { id: "B", text: "Стандарт — 1 ай" },
      { id: "C", text: "Алдымен кеңес алайын" },
    ],
  },
];

// === COURSE PATH (B) ===
export const courseQuestions: Question[] = [
  {
    id: "q2b",
    question: "Бизнес деңгейіңіз қандай?",
    options: [
      { id: "A", text: "Әлі бизнесім жоқ, жаңа бастаймын" },
      { id: "B", text: "Бизнесім бар, бәрі қолмен жасалады" },
      { id: "C", text: "Бизнесім бар, кейбіреуі автоматтандырылған" },
    ],
  },
  {
    id: "q3b",
    question: "Күніне рутинге қанша уақыт кетеді?",
    options: [
      { id: "A", text: "1–2 сағат" },
      { id: "B", text: "3–5 сағат" },
      { id: "C", text: "5+ сағат, уақыт жетпейді" },
    ],
  },
  {
    id: "q4b",
    question: "Техникалық тәжірибеңіз?",
    options: [
      { id: "A", text: "Нөлдан бастаймын, код жазбаған" },
      { id: "B", text: "YouTube-тан аздап үйрендім" },
      { id: "C", text: "Негізін білемін, тереңдеткім келеді" },
    ],
  },
  {
    id: "q5b",
    question: "Ең алдымен не автоматтандырғыңыз келеді?",
    options: [
      { id: "A", text: "Тапсырыс қабылдау + клиенттермен сөйлесу" },
      { id: "B", text: "Төлем алу + курсқа автоматты қосу" },
      { id: "C", text: "Лид жинау + сату воронкасы" },
    ],
  },
  {
    id: "q6b",
    question: "Оқу форматы қандай болсын?",
    options: [
      { id: "A", text: "Өзімше, өз қарқынымда (видео курс)" },
      { id: "B", text: "Тапсырмамен + менторлықпен" },
    ],
  },
];

// Q7 — common final question
export const q7: Question = {
  id: "q7",
  question: "Сіздің басты мақсатыңыз не?",
  options: [
    { id: "A", text: "Уақытты үнемдеп, тапсырыстарды авто-режимде алу" },
    { id: "B", text: "Клиенттерге жылдам жауап беріп, сатуды арттыру" },
    { id: "C", text: "Бизнесті толық автопилотқа қою" },
  ],
};

export function getQuestions(path: "A" | "B"): Question[] {
  if (path === "A") {
    return [q1, ...serviceQuestions, q7];
  }
  return [q1, ...courseQuestions, q7];
}
