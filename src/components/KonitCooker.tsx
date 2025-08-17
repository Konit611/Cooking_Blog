import React from "react";
import Link from "next/link";
import { Layout } from "./Layout";

interface KonitCookerProps {
  locale: string;
}

export const KonitCooker: React.FC<KonitCookerProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      hero: {
        title: "My Journey to Find\nthe Best Bite",
        button: "Explore Recipes"
      }
    },
    ko: {
      hero: {
        title: "나의 최고의\n한 입을 찾는 여정",
        button: "레시피 둘러보기"
      }
    },
    zh: {
      hero: {
        title: "寻找最美味的\n一口美食之旅",
        button: "探索食谱"
      }
    },
    ja: {
      hero: {
        title: "最高の一口を\n見つける旅",
        button: "レシピを探索"
      }
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <Layout locale={locale}>
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full relative">
        <div className="flex items-center justify-center w-full bg-white min-h-[1000px] lg:min-h-[1000px] md:min-h-[600px] sm:min-h-[600px]">
          <div className="flex flex-col items-center justify-center gap-5 lg:gap-5 md:gap-8 sm:gap-6 w-full h-full px-2.5 lg:px-2.5 md:px-5 sm:px-5 py-10 lg:py-10 md:py-10 sm:py-10">
            {/* Hero Title */}
            <div className="text-black font-serif text-6xl lg:text-[100px] md:text-[60px] sm:text-[40px] font-bold tracking-tight lg:tracking-[-5px] md:tracking-[-3px] sm:tracking-[-2px] leading-tight lg:leading-[105px] md:leading-[60px] sm:leading-[40px] text-center whitespace-nowrap w-fit relative">
              {t.hero.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t.hero.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            {/* CTA Button */}
            <Link href={`/${locale}/recipes`}>
              <div className="inline-flex items-center justify-center bg-black hover:bg-gray-800 rounded-xl cursor-pointer h-16 lg:h-16 md:h-14 sm:h-14 px-8 lg:px-8 md:px-6 sm:px-6 py-5 lg:py-5 md:py-4 sm:py-4 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                <div className="text-white font-sans text-lg lg:text-lg md:text-base sm:text-sm font-semibold leading-5 lg:leading-5 md:leading-5 sm:leading-5 whitespace-nowrap w-fit">
                  {t.hero.button}
                </div>
              </div>
            </Link>

            {/* Hero Image */}
            <div 
              className="bg-cover bg-center bg-no-repeat rounded-3xl h-[500px] lg:h-[500px] md:h-[300px] sm:h-[250px] w-full max-w-[1200px] min-w-[300px]"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}; 