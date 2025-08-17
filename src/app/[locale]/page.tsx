
import { getAllPostMetadata } from '@/lib/markdown';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Recipe & Food Blog - Culinary Adventures & Cooking Tips",
      description: "Discover delicious recipes, cooking techniques, and perfect food pairings. Share culinary knowledge about traditional dishes, modern cooking methods, and the art of food and drink combinations.",
      keywords: "recipe blog, food blog, cooking, culinary, recipes, food pairings, cooking tips, food photography, chef blog, culinary adventures"
    },
    ko: {
      title: "레시피 & 푸드 블로그 - 요리 모험과 요리 팁",
      description: "맛있는 레시피, 요리 기법, 완벽한 음식 페어링을 발견해보세요. 전통 요리, 현대적인 요리 방법, 음식과 음료 조합의 예술에 대한 요리 지식을 공유합니다.",
      keywords: "레시피 블로그, 푸드 블로그, 요리, 요리법, 레시피, 음식 페어링, 요리 팁, 푸드 사진, 요리사 블로그, 요리 모험"
    },
    zh: {
      title: "食谱与美食博客 - 烹饪冒险与烹饪技巧",
      description: "发现美味食谱、烹饪技巧和完美的美食搭配。分享传统菜肴、现代烹饪方法和美食饮品搭配艺术的知识。",
      keywords: "食谱博客, 美食博客, 烹饪, 美食, 食谱, 美食搭配, 烹饪技巧, 美食摄影, 厨师博客, 烹饪冒险"
    },
    ja: {
      title: "レシピ＆フードブログ - 料理の冒険と料理のコツ",
      description: "美味しいレシピ、料理の技法、完璧なフードペアリングを発見してください。伝統料理、現代的な料理方法、食べ物と飲み物の組み合わせの芸術に関する料理の知識を共有します。",
      keywords: "レシピブログ, フードブログ, 料理, 料理法, レシピ, フードペアリング, 料理のコツ, フード写真, シェフブログ, 料理の冒険"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: '김 요리사' }],
    creator: '김 요리사',
    publisher: 'Recipe & Food Blog',
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
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ko': '/ko',
        'zh': '/zh',
        'ja': '/ja',
      },
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${locale}`,
      siteName: 'Recipe & Food Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/og-home.jpg',
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@foodblogger',
      title: t.title,
      description: t.description,
      images: ['/images/og-home.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
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

export default async function HomePage({ params }: HomePageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale);
    // Get the latest 3 posts
    const featuredPosts = posts.slice(0, 3);

    // Generate JSON-LD structured data for WebSite
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Recipe & Food Blog',
      description: 'Discover delicious recipes, cooking techniques, and perfect food pairings. Share culinary knowledge about traditional dishes, modern cooking methods, and the art of food and drink combinations.',
      url: `${siteUrl}/${locale}`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: '김 요리사',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Recipe & Food Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/${locale}/recipes?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'Blog',
        name: 'Recipe & Food Blog',
        description: 'Latest culinary insights and cooking tutorials',
        url: `${siteUrl}/${locale}/recipes`,
        blogPost: featuredPosts.slice(0, 3).map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl}/${locale}/recipes/${post.slug}`,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author || '김 요리사'
          },
          image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-recipes.jpg`
        }))
      }
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <HomeClient 
          featuredPosts={featuredPosts} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading posts:', error);
    const { locale } = await params;
    return (
      <HomeClient 
        featuredPosts={[]} 
        locale={locale}
      />
    );
  }
}
