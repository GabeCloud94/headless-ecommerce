// blog.tsx
import { Button } from 'app/components/ui/button';
import { getBlog } from 'lib/shopify';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata(): Promise<Metadata> {
  const blog = await getBlog('News'); // Fetch the 'News' blog statically

  if (!blog) return notFound();

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || `Latest articles from the ${blog.title} blog.`,
    openGraph: {
      type: 'article'
    }
  };
}

export default async function Blog() {
  const blog = await getBlog('news');

  if (!blog) return notFound();

  return (
    <div className='flex justify-center flex-col xl:max-w-7xl xl:items-start items-center mx-auto px-4 mb-6'>
      <h1 className="mb-8 text-5xl font-bold">{blog.title}</h1>
      {blog.articles.edges.map(({ node: article }) => (
        <div key={article.id} className="border p-4 mb-8 w-full flex gap-2 items-center rounded-lg bg-secondary">
          <div className='flex flex-col w-1/4 text-center justify-center'>
            <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm italic mb-2">
              {`Published on ${new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(article.publishedAt))}.`}
            </p>
            {article.image && (
              <Image width={350} height={350} loading='eager' src={article.image.url} alt={article.title} className="mb-2" />
            )}
          </div>
          <p className=' truncate max-w-md mx-auto text-center w-1/2'>{article.content}</p>
          <div className='w-1/4 flex justify-center'>
            <Button className='text-lg' variant="default" asChild>
              <Link  href={`news/${article.handle}`}>View Blog</Link>
            </Button>
          </div>

        </div>
      ))}
    </div>
  );
}
