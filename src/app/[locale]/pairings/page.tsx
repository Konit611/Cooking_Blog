import { getAllPostMetadata } from '../../../lib/markdown';
import { getPairingCategories } from '../../../lib/pairing-categories.server';
import PairingsClient from './PairingsClient';
import { Metadata } from 'next';

interface PairingsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PairingsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Food Pairings - Perfect Combinations for Every Meal",
      description: "Discover the art of food and drink pairing. From wine recommendations to cocktail matches, find the perfect complement to your dishes.",
      keywords: "food pairings, wine pairings, drink combinations, food and wine, cocktail pairings, dessert matches"
    },
    ko: {
      title: "음식 페어링 - 모든 식사에 완벽한 조합",
      description: "음식과 음료 페어링의 예술을 발견하세요. 와인 추천부터 칵테일 매치까지, 요리에 완벽한 보완을 찾아보세요.",
      keywords: "음식 페어링, 와인 페어링, 음료 조합, 음식과 와인, 칵테일 페어링, 디저트 매치"
    },
    zh: {
      title: "美食搭配 - 每餐的完美组合",
      description: "发现美食和饮品搭配的艺术。从葡萄酒推荐到鸡尾酒搭配，为您的菜肴找到完美的搭配。",
      keywords: "美食搭配, 葡萄酒搭配, 饮品组合, 美食与葡萄酒, 鸡尾酒搭配, 甜点搭配"
    },
    ja: {
      title: "フードペアリング - あらゆる食事に完璧な組み合わせ",
      description: "食べ物と飲み物のペアリングの芸術を発見してください。ワインのおすすめからカクテルのマッチまで、料理に完璧な補完を見つけてください。",
      keywords: "フードペアリング, ワインペアリング, ドリンクの組み合わせ, 食べ物とワイン, カクテルペアリング, デザートマッチ"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/pairings`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Food Blogger' }],
    creator: 'Food Blogger',
    publisher: 'Food Pairings Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/pairings`,
        'ko': `${siteUrl}/ko/pairings`,
        'zh': `${siteUrl}/zh/pairings`,
        'ja': `${siteUrl}/ja/pairings`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Food Pairings Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-pairings.jpg`,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      creator: '@foodblogger',
      images: [`${siteUrl}/images/og-pairings.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' },
    { locale: 'zh' },
    { locale: 'ja' }
  ];
}

export default async function PairingsPage({ params }: PairingsPageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale).filter(post => 
      post.categories.some(cat => ['wine-pairings', 'drink-pairings', 'dessert-pairings', 'seasonal-pairings', 'regional-pairings'].includes(cat))
    );
    const categories = getPairingCategories();

    // Generate JSON-LD structured data for Pairings
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Food Pairings Blog',
      description: 'Browse our collection of perfect food and drink combinations. Find wine pairings, cocktail matches, and dessert combinations that elevate your dining experience.',
      url: `${siteUrl}/${locale}/pairings`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Food Blogger',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Food Pairings Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      blogPost: posts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteUrl}/${locale}/pairings/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author || 'Food Blogger'
        },
        image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-pairings.jpg`,
        keywords: post.categories.concat(post.tags || [])
      })),
      numberOfPosts: posts.length,
      about: categories.map(category => ({
        '@type': 'Thing',
        name: category.name[locale as keyof typeof category.name] || category.name.en,
        description: category.description?.[locale as keyof typeof category.description] || category.description?.en || ''
      }))
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <PairingsClient 
          posts={posts} 
          categories={categories} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading pairings data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading pairings. Please try again later.
        </div>
      </div>
    );
  }
} 