'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout';

interface WinePersonalityTestProps {
  locale: string;
}

interface Question {
  id: number;
  question: string;
  options: {
    value: string;
    text: string;
    type: string;
  }[];
}

interface Result {
  type: string;
  title: string;
  description: string;
  recommendedWines: string[];
  foodPairing: string[];
}

export default function WinePersonalityTest({ locale }: WinePersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "평소 선호하는 맛은?",
      options: [
        { value: "A", text: "달콤한 맛 (초콜릿, 캐러멜)", type: "romantic" },
        { value: "B", text: "상큼한 맛 (레몬, 사과)", type: "fresh" },
        { value: "C", text: "진하고 깊은 맛 (커피, 다크 초콜릿)", type: "bold" },
        { value: "D", text: "깔끔하고 담백한 맛 (미네랄워터, 요거트)", type: "natural" }
      ]
    },
    {
      id: 2,
      question: "좋아하는 과일은?",
      options: [
        { value: "A", text: "딸기, 체리, 복숭아", type: "romantic" },
        { value: "B", text: "사과, 배, 자몽", type: "fresh" },
        { value: "C", text: "블랙베리, 자두, 무화과", type: "bold" },
        { value: "D", text: "레몬, 라임, 청포도", type: "natural" }
      ]
    },
    {
      id: 3,
      question: "와인을 마시는 주된 목적은?",
      options: [
        { value: "A", text: "달콤한 디저트와 함께", type: "romantic" },
        { value: "B", text: "가벼운 식사와 함께", type: "fresh" },
        { value: "C", text: "진한 요리와 페어링", type: "bold" },
        { value: "D", text: "혼자서 여유롭게", type: "natural" }
      ]
    },
    {
      id: 4,
      question: "선호하는 향은?",
      options: [
        { value: "A", text: "꽃향, 바닐라, 꿀", type: "romantic" },
        { value: "B", text: "시트러스, 허브, 미네랄", type: "fresh" },
        { value: "C", text: "오크, 스파이스, 타닌", type: "bold" },
        { value: "D", text: "흙, 버섯, 돌", type: "natural" }
      ]
    },
    {
      id: 5,
      question: "좋아하는 색깔은?",
      options: [
        { value: "A", text: "핑크, 골드, 크림", type: "romantic" },
        { value: "B", text: "옐로우, 그린, 실버", type: "fresh" },
        { value: "C", text: "버건디, 퍼플, 블랙", type: "bold" },
        { value: "D", text: "브라운, 베이지, 화이트", type: "natural" }
      ]
    },
    {
      id: 6,
      question: "스트레스 해소 방법은?",
      options: [
        { value: "A", text: "달콤한 디저트 먹기", type: "romantic" },
        { value: "B", text: "운동이나 산책", type: "fresh" },
        { value: "C", text: "고급 레스토랑에서 식사", type: "bold" },
        { value: "D", text: "자연 속에서 휴식", type: "natural" }
      ]
    },
    {
      id: 7,
      question: "선호하는 음악은?",
      options: [
        { value: "A", text: "로맨틱한 발라드", type: "romantic" },
        { value: "B", text: "경쾌한 팝", type: "fresh" },
        { value: "C", text: "클래식, 재즈", type: "bold" },
        { value: "D", text: "자연의 소리, 힐링 음악", type: "natural" }
      ]
    },
    {
      id: 8,
      question: "여행지 선택 기준은?",
      options: [
        { value: "A", text: "로맨틱한 분위기", type: "romantic" },
        { value: "B", text: "활기찬 도시", type: "fresh" },
        { value: "C", text: "고급스러운 리조트", type: "bold" },
        { value: "D", text: "자연 속 힐링", type: "natural" }
      ]
    },
    {
      id: 9,
      question: "좋아하는 계절은?",
      options: [
        { value: "A", text: "봄 (꽃이 피는 계절)", type: "romantic" },
        { value: "B", text: "여름 (활기찬 계절)", type: "fresh" },
        { value: "C", text: "가을 (풍요로운 계절)", type: "bold" },
        { value: "D", text: "겨울 (차분한 계절)", type: "natural" }
      ]
    },
    {
      id: 10,
      question: "선호하는 요리 스타일은?",
      options: [
        { value: "A", text: "달콤한 디저트", type: "romantic" },
        { value: "B", text: "가벼운 샐러드", type: "fresh" },
        { value: "C", text: "진한 스테이크", type: "bold" },
        { value: "D", text: "자연스러운 요리", type: "natural" }
      ]
    },
    {
      id: 11,
      question: "좋아하는 분위기는?",
      options: [
        { value: "A", text: "로맨틱하고 아늑한", type: "romantic" },
        { value: "B", text: "밝고 경쾌한", type: "fresh" },
        { value: "C", text: "고급스럽고 세련된", type: "bold" },
        { value: "D", text: "자연스럽고 편안한", type: "natural" }
      ]
    },
    {
      id: 12,
      question: "와인을 선택할 때 가장 중요하게 생각하는 것은?",
      options: [
        { value: "A", text: "달콤하고 부드러운 맛", type: "romantic" },
        { value: "B", text: "상큼하고 산뜻한 맛", type: "fresh" },
        { value: "C", text: "진하고 복합적인 맛", type: "bold" },
        { value: "D", text: "자연스럽고 미네랄한 맛", type: "natural" }
      ]
    }
  ];

  const results: Record<string, Result> = {
    romantic: {
      type: "romantic",
      title: "로맨틱 스위트 (Romantic Sweet)",
      description: "당신은 달콤하고 부드러운 와인을 선호하는 로맨틱한 성향을 가지고 있습니다. 감성적이고 아름다운 것들을 좋아하며, 특별한 순간을 소중히 여깁니다.",
      recommendedWines: ["모스카토", "리슬링", "아이스와인", "포트와인", "셰리"],
      foodPairing: ["디저트", "과일", "치즈케이크", "마카롱", "초콜릿"]
    },
    fresh: {
      type: "fresh",
      title: "프레시 시트러스 (Fresh Citrus)",
      description: "당신은 상큼하고 산뜻한 화이트 와인을 선호하는 활기찬 성향을 가지고 있습니다. 밝고 긍정적인 에너지를 가지고 있으며, 새로운 경험을 즐깁니다.",
      recommendedWines: ["소비뇽 블랑", "알바리뇨", "베르멘티노", "피노 그리지오", "샤르도네"],
      foodPairing: ["해산물", "샐러드", "염소치즈", "시트러스 과일", "타코"]
    },
    bold: {
      type: "bold",
      title: "볼드 파워풀 (Bold Powerful)",
      description: "당신은 진하고 강한 레드 와인을 선호하는 당당한 성향을 가지고 있습니다. 자신감 있고 도전적인 성격으로, 강렬한 맛을 즐깁니다.",
      recommendedWines: ["카베르네 소비뇽", "시라", "말벡", "네비올로", "바롤로"],
      foodPairing: ["스테이크", "양고기", "진한 치즈", "초콜릿", "커피"]
    },
    elegant: {
      type: "elegant",
      title: "엘레강트 클래식 (Elegant Classic)",
      description: "당신은 우아하고 복합적인 와인을 선호하는 세련된 성향을 가지고 있습니다. 고급스럽고 품격 있는 것을 추구하며, 정교한 맛을 즐깁니다.",
      recommendedWines: ["피노 누아", "바르바레스코", "산지오베제", "샤블리", "몽라셰"],
      foodPairing: ["프렌치 요리", "트러플", "파테", "캐비어", "푸아그라"]
    },
    natural: {
      type: "natural",
      title: "내추럴 어시 (Natural Earthy)",
      description: "당신은 자연스럽고 미네랄한 와인을 선호하는 자연친화적 성향을 가지고 있습니다. 건강과 자연을 중시하며, 순수하고 깨끗한 맛을 즐깁니다.",
      recommendedWines: ["산지오베제", "네비올로", "샤블리", "피노 블랑", "리슬링 드라이"],
      foodPairing: ["버섯 요리", "허브", "올리브", "견과류", "현미밥"]
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      const typeCounts: Record<string, number> = {};
      newAnswers.forEach(answer => {
        const question = questions.find(q => q.options.some(opt => opt.value === answer));
        if (question) {
          const option = question.options.find(opt => opt.value === answer);
          if (option) {
            typeCounts[option.type] = (typeCounts[option.type] || 0) + 1;
          }
        }
      });

      const dominantType = Object.entries(typeCounts).reduce((a, b) => 
        typeCounts[a[0]] > typeCounts[b[0]] ? a : b
      )[0];

      setResult(results[dominantType]);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <Layout locale={locale}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">🍷 테스트 결과</h1>
            <p className="text-xl text-gray-600">당신의 와인 성향을 발견했습니다!</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{result.title}</h2>
            <p className="text-lg text-gray-700 mb-6 text-center">{result.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">🍷 추천 와인</h3>
                <ul className="space-y-2">
                  {result.recommendedWines.map((wine, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span className="text-gray-700">{wine}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">🍽️ 페어링 음식</h3>
                <ul className="space-y-2">
                  {result.foodPairing.map((food, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span className="text-gray-700">{food}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetTest}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 mr-4"
            >
              테스트 다시하기
            </button>
            <a
              href={`/${locale}`}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout locale={locale}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">🍷 와인 성향 테스트</h1>
          <p className="text-xl text-gray-600">와인의 세계는 넓고 복잡합니다!</p>
          <p className="text-lg text-gray-500 mt-2">이 간단한 테스트로 당신의 와인 성향을 알아보고, 맞춤 추천을 받아보세요</p>
        </div>

        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>진행률</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 질문 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200"
              >
                <span className="font-semibold text-red-600 mr-3">{option.value})</span>
                <span className="text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 테스트 정보 */}
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-700 mb-2">테스트 정보</h3>
          <div className="flex justify-center gap-8 text-sm text-red-600">
            <span>⏱️ 소요시간: 약 5분</span>
            <span>❓ 문항수: {questions.length}개</span>
            <span>📊 결과유형: 5가지</span>
          </div>
        </div>
      </div>
    </Layout>
  );
} 