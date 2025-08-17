import { getAllPostMetadata, getAllCategories } from '../../../lib/markdown';
import { getCategories } from '../../../lib/categories.server';
import BlogClient from './BlogClient';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Food Blog - Latest Recipe Discoveries and Cooking Tips",
      description: "Explore delicious recipes, cooking techniques, and culinary adventures. Discover cooking tips, food trends, and practical solutions for home cooking.",
      keywords: "food blog, recipe tutorials, cooking insights, cooking tips, food photography, culinary arts, home cooking, food articles"
    },
    ko: {
      title: "푸드 블로그 - 최신 레시피 발견과 요리 팁",
      description: "맛있는 레시피, 요리 기법, 요리 모험을 탐험해보세요. 요리 팁, 음식 트렌드, 가정 요리를 위한 실용적인 해결책을 발견하세요.",
      keywords: "푸드 블로그, 레시피 튜토리얼, 요리 인사이트, 요리 팁, 푸드 사진, 요리 예술, 가정 요리, 음식 아티클"
    },
    zh: {
      title: "美食博客 - 最新食谱发现与烹饪技巧",
      description: "探索美味食谱、烹饪技巧和美食冒险。发现烹饪技巧、美食趋势和家庭烹饪的实用解决方案。",
      keywords: "美食博客, 食谱教程, 烹饪见解, 烹饪技巧, 美食摄影, 烹饪艺术, 家庭烹饪, 美食文章"
    },
    ja: {
      title: "フードブログ - 最新レシピ発見と料理のコツ",
      description: "美味しいレシピ、料理の技法、料理の冒険を探索してください。料理のコツ、フードトレンド、家庭料理のための実用的なソリューションを発見してください。",
      keywords: "フードブログ, レシピチュートリアル, 料理インサイト, 料理のコツ, フード写真, 料理アート, 家庭料理, フード記事"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/blog`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Food Blogger' }],
    creator: 'Food Blogger',
    publisher: 'Food Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/blog`,
        'ko': `${siteUrl}/ko/blog`,
        'zh': `${siteUrl}/zh/blog`,
        'ja': `${siteUrl}/ja/blog`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Food Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-blog.jpg`,
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
      images: [`${siteUrl}/images/og-blog.jpg`],
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

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale);
    const categoryIds = getAllCategories();
    const categories = getCategories();

    // Generate JSON-LD structured data for Blog
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Food Blog',
      description: 'Browse our collection of delicious recipes, cooking techniques, and culinary articles. Find practical solutions for home cooking and discover the latest food trends.',
      url: `${siteUrl}/${locale}/blog`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Food Blogger',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Food Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      blogPost: posts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author || 'Food Blogger'
        },
        image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-blog.jpg`,
        keywords: post.categories.concat(post.tags || [])
      })),
      numberOfPosts: posts.length,
      about: categoryIds.map(category => ({
        '@type': 'Thing',
        name: category,
        description: `Culinary content about ${category}`
      }))
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <BlogClient 
          posts={posts} 
          categories={categories} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading blog data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
} 