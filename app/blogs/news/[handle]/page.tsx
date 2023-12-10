import { getBlog } from 'lib/shopify';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const blog = await getBlog('News');

  if (!blog) return notFound();

  const article = blog.articles.edges.find(({ node }) => node.handle === params.handle)?.node;

  if (!article) return notFound();

  return {
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt,
    openGraph: {
      publishedTime: article.publishedAt,
      type: 'article'
    }
  };
}

export default async function Article({
  params
}: {
  params: { handle: string };
}) {
  const blog = await getBlog('News');

  if (!blog) return notFound();

  const article = blog.articles.edges.find(({ node }) => node.handle === params.handle)?.node;

  if (!article) return notFound();

  return (
    <div className='flex justify-center flex-col xl:max-w-7xl items-center mx-auto px-4 my-6'>
      <h1 className="mb-2 text-5xl font-bold text-center">{article.title}</h1>
        {`This article was published on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(article.publishedAt))}.`}
        {article.image && (
              <Image width={600} height={600} priority src={article.image.url} alt={article.title} className="mt-4" />
            )}
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </div>
  );
}

