import Prose from 'components/prose';
import { getArticle } from 'lib/shopify';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';


export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function GenerateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {

  const article = await getArticle(id);

  if (!article) return notFound();

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      publishedTime: article.publishedAt,
      type: 'article'
    }
  };
}

export default async function Article({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);
  if (!article) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{article.title}</h1>
      <Prose className="mb-8" html={article.content as string} />
      <p className="text-sm italic">
        {`This article was published on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(article.publishedAt))}.`}
      </p>
    </>
  );
}
