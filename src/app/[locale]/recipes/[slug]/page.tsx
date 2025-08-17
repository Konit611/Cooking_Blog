import { getAllPostMetadata, getPostBySlug } from '../../../../lib/markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Layout';
// formatDate function for recipes
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface RecipePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.'
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/recipes/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(', ') || '',
    authors: [{ name: post.author || 'Alex Chen' }],
    creator: post.author || 'Alex Chen',
    publisher: 'Recipes Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/recipes/${slug}`,
        'ko': `${siteUrl}/ko/recipes/${slug}`,
        'zh': `${siteUrl}/zh/recipes/${slug}`,
        'ja': `${siteUrl}/ja/recipes/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Recipes Blog',
      locale: locale,
      type: 'article',
      images: [
        {
          url: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-recipes.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@developer',
      images: [post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-recipes.jpg`],
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
  const locales = ['en', 'ko', 'zh', 'ja'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPostMetadata(locale).filter(post => 
      post.categories.some(cat => ['korean-traditional', 'simple-cooking', 'healthy-meals', 'cooking-tips', 'vegetarian'].includes(cat))
    );
    
    for (const post of posts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';

  // Generate JSON-LD structured data for Recipe
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || 'Alex Chen'
    },
    datePublished: post.date,
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-recipes.jpg`,
    recipeCategory: post.categories.join(', '),
    recipeCuisine: 'Korean',
    keywords: post.tags?.join(', ') || '',
    url: `${siteUrl}/${locale}/recipes/${slug}`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Recipes Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`
      }
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Layout locale={locale}>
        <div className="w-full">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
              <a href={`/${locale}`} className="hover:text-gray-900">Home</a>
              <span className="mx-2">/</span>
              <a href={`/${locale}/recipes`} className="hover:text-gray-900">Recipes</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* Recipe Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map(category => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <span>{formatDate(post.date, locale)}</span>
                {post.readTime && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </>
                )}
              </div>
              
              {post.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Recipe Content */}
            <article className="prose prose-lg max-w-none">
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Recipe Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </Layout>
    </>
  );
} 