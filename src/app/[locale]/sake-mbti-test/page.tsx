import { Metadata } from 'next';
import SakeMbtiTest from './SakeMbtiTest';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const translations = {
    en: {
      title: "Sake MBTI - Find Your Alcohol Preference",
      description: "A fun alcohol preference test based on MBTI personality types. Find the alcohol that matches your personality!"
    },
    ko: {
      title: "사케 MBTI - 나의 술 취향 찾기",
      description: "MBTI 성격 유형을 기반으로 한 재미있는 술 취향 테스트입니다. 당신의 성격과 어울리는 술을 찾아보세요!"
    },
    zh: {
      title: "清酒MBTI - 发现您的酒类偏好",
      description: "基于MBTI性格类型的趣味酒类偏好测试。找到与您性格匹配的酒类！"
    },
    ja: {
      title: "酒MBTI - あなたの酒の好みを発見",
      description: "MBTI性格タイプに基づいた楽しいお酒の好みテストです。あなたの性格に合うお酒を見つけましょう！"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function SakeMbtiTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SakeMbtiTest locale={locale} />;
} 