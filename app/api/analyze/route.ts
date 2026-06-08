import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Full question+answer map for context-rich analysis
const QUESTION_MAP: Record<string, { q: string; options: Record<string, string> }> = {
  q1: {
    q: "Сізге қазір не қажет?",
    options: {
      A: "Бизнесімді автоматты жұмыс жасауға көшіргім келеді — сіздер жасап беріңіздер",
      B: "Мен өзім үйреніп, бизнесімді автоматтандырғым келеді",
    },
  },
  // Service path
  q2a: {
    q: "Бизнесіңіз қандай салада?",
    options: {
      A: "Онлайн білім / коучинг / курс",
      B: "Сауда — өнім сату",
      C: "Қызмет (мастер, салон, дәрігер, т.б.)",
    },
  },
  q3a: {
    q: "Не автоматтандырғыңыз келеді?",
    options: {
      A: "Instagram / Telegram боты — тапсырыс + сату",
      B: "Лид боты — клиентті сүзу + квалификациялау",
      C: "Төлем → чек тексеру → курсқа автоматты қосу",
    },
  },
  q4a: {
    q: "Ай сайын қанша лид / тапсырыс келеді?",
    options: {
      A: "0–20 (жаңа бастаған)",
      B: "20–100",
      C: "100+ (масштаб керек)",
    },
  },
  q5a: {
    q: "Бюджетіңіз шамамен қандай?",
    options: {
      A: "10,000 – 50,000 ₸",
      B: "50,000 – 150,000 ₸",
      C: "150,000 – 300,000 ₸",
      D: "300,000 ₸ және одан жоғары",
    },
  },
  q6a: {
    q: "Бот қашан іске қосылсын?",
    options: {
      A: "Жедел — 1–2 апта ішінде",
      B: "Стандарт — 1 ай",
      C: "Алдымен кеңес алайын",
    },
  },
  // Course path
  q2b: {
    q: "Бизнес деңгейіңіз қандай?",
    options: {
      A: "Әлі бизнесім жоқ, жаңа бастаймын",
      B: "Бизнесім бар, бәрі қолмен жасалады",
      C: "Бизнесім бар, кейбіреуі автоматтандырылған",
    },
  },
  q3b: {
    q: "Күніне рутинге қанша уақыт кетеді?",
    options: {
      A: "1–2 сағат",
      B: "3–5 сағат",
      C: "5+ сағат, уақыт жетпейді",
    },
  },
  q4b: {
    q: "Техникалық тәжірибеңіз?",
    options: {
      A: "Нөлдан бастаймын, код жазбаған",
      B: "YouTube-тан аздап үйрендім",
      C: "Негізін білемін, тереңдеткім келеді",
    },
  },
  q5b: {
    q: "Ең алдымен не автоматтандырғыңыз келеді?",
    options: {
      A: "Тапсырыс қабылдау + клиенттермен сөйлесу",
      B: "Төлем алу + курсқа автоматты қосу",
      C: "Лид жинау + сату воронкасы",
    },
  },
  q6b: {
    q: "Оқу форматы қандай болсын?",
    options: {
      A: "Өзімше, өз қарқынымда (видео курс)",
      B: "Тапсырмамен + менторлықпен",
    },
  },
  q7: {
    q: "Сіздің басты мақсатыңыз не?",
    options: {
      A: "Уақытты үнемдеп, тапсырыстарды авто-режимде алу",
      B: "Клиенттерге жылдам жауап беріп, сатуды арттыру",
      C: "Бизнесті толық автопилотқа қою",
    },
  },
};

function buildAnswerSummary(answers: Record<string, string>): string {
  return Object.entries(answers)
    .map(([qId, optId]) => {
      const qData = QUESTION_MAP[qId];
      if (!qData) return null;
      const answerText = qData.options[optId] ?? optId;
      return `• ${qData.q}\n  → ${answerText}`;
    })
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const { answers, path } = await req.json();

    const pathLabel =
      path === "A"
        ? "Дайын кызмет (Aisha AI Studio бот жасап береді)"
        : "Курс (өзі үйреніп автоматтандырады)";

    const summary = buildAnswerSummary(answers);

    const prompt = `Сен — Aisha AI Studio компаниясының AI кеңесшісіз. Клиент Instagram арқылы бизнес автоматтандыру тестін өтті.

Таңдаған бағыт: ${pathLabel}

Клиенттің жауаптары:
${summary}

Осы нақты жауаптарға сүйеніп, қазақ тілінде 3 қысқа сөйлем жаз:
1. Клиенттің бизнес жағдайын нақты атап, бағалаңыз (жалпы сөз емес, нақты деректерге сүйен)
2. Оған нені ұсынасыз және неліктен (бот па, курс па — нақты себебімен)
3. Ынталандыратын, жылы сөзбен аяқтаңыз — Instagram арқылы хабарласуға шақырыңыз

Ескерту: Тек 3 сөйлем, тізім жоқ, тақырып жоқ, достық тон, "Сіз" деп жазыңыз.`;

    const MODELS = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash-latest"];
    let lastError: unknown;

    for (const modelName of MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          return NextResponse.json({ result: text });
        } catch (err: unknown) {
          lastError = err;
          const status = (err as { status?: number })?.status;
          if (status === 503 || status === 429) {
            await new Promise((r) => setTimeout(r, 1500));
            continue;
          }
          break; // non-retryable error, try next model
        }
      }
    }

    console.error("Gemini error (all models failed):", lastError);
    return NextResponse.json({ result: "" });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ result: "" });
  }
}
