import React from 'react';

interface FooterProps {
  locale: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "Konit",
      description: "Discover delicious recipes, cooking techniques, and perfect food pairings. Share culinary knowledge about traditional dishes, modern cooking methods, and the art of food and drink combinations."
    },
    ko: {
      brand: "Konit",
      description: "맛있는 레시피, 요리 기법, 완벽한 음식 페어링을 발견해보세요. 전통 요리, 현대적인 요리 방법, 음식과 음료 조합의 예술에 대한 요리 지식을 공유합니다."
    },
    zh: {
      brand: "Konit",
      description: "发现美味食谱、烹饪技巧和完美的美食搭配。分享传统菜肴、现代烹饪方法和美食饮品搭配艺术的知识。"
    },
    ja: {
      brand: "Konit",
      description: "美味しいレシピ、料理の技法、完璧なフードペアリングを発見してください。伝統料理、現代的な料理方法、食べ物と飲み物の組み合わせの芸術に関する料理の知識を共有します。"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="flex flex-col h-[228px] items-center relative self-stretch w-full z-0 bg-white">
      <div className="flex h-[172px] items-start justify-between pt-6 pb-24 px-0 relative self-stretch w-full">
        <div className="inline-flex h-8 items-center justify-center gap-1.5 relative flex-[0_0_auto]">
          <div className="inline-flex h-12 items-center gap-3 relative flex-[0_0_auto] mt-[-8.00px] mb-[-8.00px]">
            <div className="relative w-fit font-hepta-slab font-extrabold text-black text-[42px] tracking-[-1.68px] leading-[42px] whitespace-nowrap">
              {t.brand}
            </div>
          </div>
        </div>

        <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
          <div className="relative w-6 h-6 bg-blue-600 rounded" />
          <div className="relative w-6 h-6 bg-pink-600 rounded" />
          <div className="relative w-6 h-6 bg-blue-400 rounded" />
        </div>

        <footer className="inline-flex items-start gap-12 absolute top-6 left-[229px] bg-transparent">
          <div className="flex flex-col w-[200px] items-start justify-center gap-2 relative">
            <div className="relative self-stretch mt-[-1.00px] font-libre-franklin font-semibold text-black text-[15px] tracking-[0] leading-5">
              {t.brand}
            </div>
            <p className="relative w-[947px] mr-[-747.00px] font-libre-franklin font-semibold text-[#00000099] text-[15px] tracking-[0] leading-5">
              {t.description}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
