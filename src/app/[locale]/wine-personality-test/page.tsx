import { Metadata } from 'next';
import WinePersonalityTest from './WinePersonalityTest';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const translations = {
    en: {
      title: "Wine Personality Test - My Wine Style",
      description: "Analyze your personality and preferences to recommend personalized wines. Even wine beginners can easily follow along!"
    },
    ko: {
      title: "와인 성향 테스트 - 나만의 와인 스타일",
      description: "당신의 성격과 취향을 분석하여 맞춤형 와인을 추천해드립니다. 와인 초보자도 쉽게 따라할 수 있어요!"
    },
    zh: {
      title: "葡萄酒性格测试 - 我的葡萄酒风格",
      description: "分析您的性格和偏好，推荐个性化葡萄酒。即使是葡萄酒初学者也能轻松上手！"
    },
    ja: {
      title: "ワイン性格テスト - 私だけのワインスタイル",
      description: "あなたの性格と好みを分析して、パーソナライズされたワインをお勧めします。ワイン初心者でも簡単にできます！"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function WinePersonalityTestPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <WinePersonalityTest locale={locale} />;
} 