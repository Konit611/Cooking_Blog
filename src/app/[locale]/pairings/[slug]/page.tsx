import { getAllPostMetadata, getPostBySlug } from '../../../../lib/markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Layout';

// formatDate function for pairings
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface PairingPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'ko', 'zh', 'ja'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getAllPostMetadata(locale).filter(post =>
      post.categories.some(cat => ['wine-pairings', 'drink-pairings', 'dessert-pairings', 'seasonal-pairings', 'regional-pairings'].includes(cat))
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

export async function generateMetadata({ params }: PairingPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/pairings/${slug}`;



  return {
    title: `${post.title} - Food Pairings`,
    description: post.excerpt,
    keywords: post.categories.concat(post.tags || []).join(', '),
    authors: [{ name: post.author || 'Food Blogger' }],
    creator: post.author || 'Food Blogger',
    publisher: 'Food Pairings Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/pairings/${slug}`,
        'ko': `${siteUrl}/ko/pairings/${slug}`,
        'zh': `${siteUrl}/zh/pairings/${slug}`,
        'ja': `${siteUrl}/ja/pairings/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Food Pairings Blog',
      locale: locale,
      type: 'article',
      images: [
        {
          url: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-pairings.jpg`,
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
      creator: '@foodblogger',
      images: [post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-pairings.jpg`],
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

export default async function PairingPage({ params }: PairingPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: post.title,
            description: post.excerpt,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com'}/${locale}/pairings/${slug}`,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author || 'Food Blogger'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Food Pairings Blog',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com'}/images/logo.png`
              }
            },
            image: post.coverImage ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com'}${post.coverImage}` : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com'}/images/og-pairings.jpg`,
            recipeCategory: post.categories[0] || 'Food Pairing',
            recipeCuisine: 'International',
            keywords: post.categories.concat(post.tags || []).join(', '),
            inLanguage: locale
          })
        }}
      />

      <Layout locale={locale}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href={`/${locale}`} className="hover:text-gray-700">Home</a>
            <span className="mx-2">/</span>
            <a href={`/${locale}/pairings`} className="hover:text-gray-700">Pairings</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(category => (
                <span
                  key={category}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 text-sm">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              {post.readTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
          </header>

          {/* Post Content */}
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Post Footer */}
          {post.tags && post.tags.length > 0 && (
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-600 text-sm">Tags:</span>
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </Layout>
    </>
  );
} 