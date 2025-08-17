import { getAllPostMetadata } from '../../../lib/markdown';
import { getRecipeCategories } from '../../../lib/recipe-categories.server';
import RecipesClient from './RecipesClient';
import { Metadata } from 'next';

interface RecipesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: RecipesPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Recipes - Delicious Cooking Recipes and Culinary Tips",
      description: "Discover delicious recipes, cooking tips, and culinary adventures. From traditional dishes to modern cuisine, find inspiration for your next meal.",
      keywords: "recipes, cooking, food, culinary, cooking tips, meal ideas, kitchen, cooking guide"
    },
    ko: {
      title: "레시피 - 맛있는 요리 레시피와 요리 팁",
      description: "맛있는 레시피, 요리 팁, 요리 모험을 발견하세요. 전통 요리부터 현대 요리까지, 다음 식사의 영감을 찾아보세요.",
      keywords: "레시피, 요리, 음식, 요리법, 요리 팁, 식사 아이디어, 주방, 요리 가이드"
    },
    zh: {
      title: "食谱 - 美味烹饪食谱和烹饪技巧",
      description: "发现美味食谱、烹饪技巧和美食冒险。从传统菜肴到现代美食，为您的下一餐寻找灵感。",
      keywords: "食谱, 烹饪, 美食, 烹饪技巧, 餐点创意, 厨房, 烹饪指南"
    },
    ja: {
      title: "レシピ - 美味しい料理レシピと料理のコツ",
      description: "美味しいレシピ、料理のコツ、料理の冒険を発見してください。伝統料理から現代料理まで、次の食事のインスピレーションを見つけてください。",
      keywords: "レシピ, 料理, 食べ物, 料理法, 料理のコツ, 食事のアイデア, キッチン, 料理ガイド"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/recipes`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Alex Chen' }],
    creator: 'Alex Chen',
    publisher: 'Recipes Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/recipes`,
        'ko': `${siteUrl}/ko/recipes`,
        'zh': `${siteUrl}/zh/recipes`,
        'ja': `${siteUrl}/ja/recipes`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Recipes Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-recipes.jpg`,
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
      creator: '@developer',
      images: [`${siteUrl}/images/og-recipes.jpg`],
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

export default async function RecipesPage({ params }: RecipesPageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale).filter(post => 
      post.categories.some(cat => ['korean-traditional', 'simple-cooking', 'healthy-meals', 'cooking-tips', 'vegetarian'].includes(cat))
    );
    const categories = getRecipeCategories();

    // Generate JSON-LD structured data for Recipes
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Recipes Blog',
      description: 'Browse our collection of delicious recipes, cooking tips, and culinary adventures. Find inspiration for your next meal and discover new cooking techniques.',
      url: `${siteUrl}/${locale}/recipes`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Alex Chen',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Recipes Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      blogPost: posts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteUrl}/${locale}/recipes/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author || 'Alex Chen'
        },
        image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-recipes.jpg`,
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
        
        <RecipesClient 
          posts={posts} 
          categories={categories} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading recipes data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading recipes. Please try again later.
        </div>
      </div>
    );
  }
} 