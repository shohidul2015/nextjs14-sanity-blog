import Image from "next/image";
import Hero from '@/components/Hero';
import { client, urlFor } from "@/components/lib/sanity";
import { simpleBlogCard } from "@/components/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import blog1 from '@/public/blog1.jpg';
//import { Globe } from "@/components/ui/globe";
//import Navbar from "@/components/Navbar";

async function getData() {
  
  const query = 
  `*[_type=='blog'] | order(_createdAt desc)
  {
  title,
    description,
    "currentSlug": slug.current,
    titleImage,
  } `;

  const data = client.fetch(query);
  return data;
}


export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {data.map((post, idx) => (
            <Card key={idx}>
               {/* <Image src={urlFor(post.titleImage).url()} alt="image"/> */}
               
               {post.titleImage ? (
            <Image 
              src={urlFor(post.titleImage).url()} 
              alt="image" 
              width={500} 
              height={300} 
            />
          ) : (
            <Image 
              src={blog1} 
              alt="placeholder image" 
              width={500} 
              height={300} 
              className="rounded-t-lg h-[200px] object-cover gap-5"
            />
          )}

          <CardContent className="mt5">
              <h3 className="text-lg line-clamp-2">{post.title}</h3>
              <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{post.description}</p>
              
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}> Read More</Link>
              </Button>
          </CardContent>
          

            </Card>
           ))}

    </div>
  );
}
