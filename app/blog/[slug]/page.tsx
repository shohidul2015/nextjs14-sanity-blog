import React from 'react';
import {client, urlFor} from '@/components/lib/sanity'
import { singleBlog } from '@/components/lib/interface';
import Image from 'next/image';
import { PortableText } from 'next-sanity';

async function getData(slug: string) {
    const query = `
        *[_type=='blog' && slug.current=='${slug}'] {
            title,
            "slugCurrent": slug.current,
            description,
            titleImage,
            content,
        }[0]`

        const data: singleBlog = await client.fetch(query);
        return data;

    }

async function blogArticle({params} : {params: {slug: string}}) {

    const data = await getData(params.slug);
    console.log(data);

  return (
    <div className='mt-8'>
        <h1>
            <span className='block text-base text-center text-primary font-semibold tracking-wide uppercase'>Shohidul Islam's Blog</span>
            <span className='mt-2 block text-center text-3xl leading-8 tracking-tight font-bold sm:text-4xl '>
                {data.title}
            </span>
        </h1>

        <Image 
              src={urlFor(data.titleImage).url()} 
              alt="image" 
              width={800} 
              height={800} 
              priority
              className='mt-6 rounded border'
            />
            <div className='mt-16 prose prose-blue prose-lg dark:prose-invert prose-headings:underline prose-li:marker:text-primary'>
                <PortableText value={data.content}/>
            </div>
    </div>
  )
}

export default blogArticle