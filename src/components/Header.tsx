'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "Konit",
      nav: {
        home: "Home",
        blog: "Blog",
        recipes: "Recipes",
        pairings: "Pairings",
        contact: "Contact"
      }
    },
    ko: {
      brand: "Konit",
      nav: {
        home: "홈",
        blog: "블로그",
        recipes: "레시피",
        pairings: "페어링",
        contact: "연락처"
      }
    },
    zh: {
      brand: "Konit",
      nav: {
        home: "首页",
        blog: "博客",
        recipes: "食谱",
        pairings: "搭配",
        contact: "联系"
      }
    },
    ja: {
      brand: "Konit",
      nav: {
        home: "ホーム",
        blog: "ブログ",
        recipes: "レシピ",
        pairings: "ペアリング",
        contact: "お問い合わせ"
      }
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-0 py-4 relative self-stretch w-full flex-[0_0_auto] z-[3] bg-white">
        <div className="inline-flex h-12 items-center gap-3 relative flex-[0_0_auto]">
          <Link href={`/${locale}`}>
            <div className="relative w-fit font-hepta-slab font-extrabold text-black text-[42px] tracking-[-1.68px] leading-[42px] whitespace-nowrap cursor-pointer hover:text-gray-700 transition-colors">
              {t.brand}
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {/* 네비게이션 메뉴 */}
          <div className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
            <Link href={`/${locale}`}>
              <div className="relative w-fit mt-[-1.00px] font-libre-franklin font-medium text-black text-[20px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.home}
              </div>
            </Link>
            <Link href={`/${locale}/blog`}>
              <div className="relative w-fit mt-[-1.00px] font-libre-franklin font-medium text-black text-[20px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.blog}
              </div>
            </Link>
            <Link href={`/${locale}/recipes`}>
              <div className="relative w-fit mt-[-1.00px] font-libre-franklin font-medium text-black text-[20px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.recipes}
              </div>
            </Link>
            <Link href={`/${locale}/pairings`}>
              <div className="relative w-fit mt-[-1.00px] font-libre-franklin font-medium text-black text-[20px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.pairings}
              </div>
            </Link>
            <Link href={`/${locale}/contact`}>
              <div className="relative w-fit mt-[-1.00px] font-libre-franklin font-medium text-black text-[20px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.contact}
              </div>
            </Link>
          </div>

          {/* 언어 전환 드롭다운 */}
          <div className="flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Divider - 헤더 아래 별도 줄에 위치 */}
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  );
};
