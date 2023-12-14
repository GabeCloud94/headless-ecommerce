// blog.tsx
import { Button } from 'app/components/ui/button';
import { getBlog } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds



export default async function Blog() {
  const blog = await getBlog('news');
  if (!blog) return notFound();

  return (
    <div className='flex justify-center flex-col xl:max-w-7xl xl:items-start items-center mx-auto px-4 mb-6'>
      <h1 className="mb-8 text-5xl font-bold">{blog.title}</h1>
      {blog.articles.edges.reverse().map(({ node: article }) => (
        <div key={article.id} className="border py-8 px-12 mb-8 w-full flex md:flex-row flex-col gap-4 items-center rounded-lg bg-secondary">
          <div className='flex flex-col w-full md:w-1/4 text-center justify-center'>
            <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm italic mb-2">
              {`Published on ${new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(article.publishedAt))}.`}
            </p>
          <p className=' truncate max-w-[95%] mx-auto text-center'>{article.content}</p>
          </div>
          <div className='md:w-2/4 flex justify-center items-center'>
            {article.image && (
              <Image width={420} height={400} src={article.image.url} alt={article.title} className="mb-2" />
            )}
          </div>
          <div className='md:w-1/4 flex justify-center'>
            <Button className='text-lg' variant="default" asChild>
              <Link  href={`/blogs/news/${article.handle}`}>View Blog</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
