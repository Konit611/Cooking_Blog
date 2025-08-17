import ContactClient from './ContactClient';
import { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Contact - Recipe & Food Blog",
      description: "Get in touch with me for recipe collaborations, cooking tips, food photography, or culinary discussions. Let's share the joy of cooking together.",
      keywords: "contact food blogger, recipe collaboration, cooking tips contact, food photography, culinary consultation"
    },
    ko: {
      title: "연락처 - 레시피 & 푸드 블로그",
      description: "레시피 협업, 요리 팁, 푸드 사진, 또는 요리 논의를 위해 연락주세요. 함께 요리의 즐거움을 나누어봅시다.",
      keywords: "푸드 블로거 연락처, 레시피 협업, 요리 팁 연락처, 푸드 사진, 요리 컨설팅"
    },
    zh: {
      title: "联系我们 - 食谱与美食博客",
      description: "联系我进行食谱合作、烹饪技巧、美食摄影或烹饪讨论。让我们一起分享烹饪的乐趣。",
      keywords: "联系美食博主, 食谱合作, 烹饪技巧联系, 美食摄影, 烹饪咨询"
    },
    ja: {
      title: "お問い合わせ - レシピ＆フードブログ",
      description: "レシピのコラボレーション、料理のコツ、フード写真、または料理の議論についてお気軽にお問い合わせください。一緒に料理の楽しさを共有しましょう。",
      keywords: "フードブロガー連絡先, レシピコラボレーション, 料理のコツ連絡先, フード写真, 料理コンサルティング"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recipefoodblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/contact`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Food Blogger' }],
    creator: 'Food Blogger',
    publisher: 'Recipe & Food Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/contact`,
        'ko': `${siteUrl}/ko/contact`,
        'zh': `${siteUrl}/zh/contact`,
        'ja': `${siteUrl}/ja/contact`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Recipe & Food Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-contact.jpg`,
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
      images: [`${siteUrl}/images/og-contact.jpg`],
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  return <ContactClient locale={locale} />;
} 