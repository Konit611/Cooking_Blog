'use client';

import { useTranslation } from './I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useParams, usePathname } from 'next/navigation';

export function Navigation() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale as string;
  const pathname = usePathname();
  
  // 현재 페이지가 어떤 섹션인지 확인
  const isHome = pathname === `/${locale}`;
  const isBlog = pathname.includes(`/${locale}/blog`);
  const isRecipes = pathname.includes(`/${locale}/recipes`);
  const isPairings = pathname.includes(`/${locale}/pairings`);
  const isContact = pathname.includes(`/${locale}/contact`);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href={`/${locale}`} className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              {t('blog.title')}
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href={`/${locale}`}
              className={`font-medium transition-colors ${
                isHome 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.home')}
            </a>
            <a
              href={`/${locale}/blog`}
              className={`font-medium transition-colors ${
                isBlog 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.blog')}
            </a>
            <a
              href={`/${locale}/recipes`}
              className={`font-medium transition-colors ${
                isRecipes 
                  ? 'text-orange-600 border-b-2 border-orange-600 pb-1' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              {t('navigation.recipes')}
            </a>
            <a
              href={`/${locale}/pairings`}
              className={`font-medium transition-colors ${
                isPairings 
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {t('navigation.pairings')}
            </a>
            <a
              href={`/${locale}/contact`}
              className={`font-medium transition-colors ${
                isContact 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.contact')}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (hidden by default) */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-4">
            <a
              href={`/${locale}`}
              className={`font-medium transition-colors ${
                isHome 
                  ? 'text-blue-600 border-l-4 border-blue-600 pl-3' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.home')}
            </a>
            <a
              href={`/${locale}/recipes`}
              className={`font-medium transition-colors ${
                isRecipes 
                  ? 'text-orange-600 border-l-4 border-orange-600 pl-3' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              {t('navigation.recipes')}
            </a>
            <a
              href={`/${locale}/pairings`}
              className={`font-medium transition-colors ${
                isPairings 
                  ? 'text-purple-600 border-l-4 border-purple-600 pl-3' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {t('navigation.pairings')}
            </a>
            <a
              href={`/${locale}/blog`}
              className={`font-medium transition-colors ${
                isBlog 
                  ? 'text-blue-600 border-l-4 border-blue-600 pl-3' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.blog')}
            </a>
            <a
              href={`/${locale}/contact`}
              className={`font-medium transition-colors ${
                isContact 
                  ? 'text-blue-600 border-l-4 border-blue-600 pl-3' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('navigation.contact')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 