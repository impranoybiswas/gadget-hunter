"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetBlog } from "@/hooks/useBlogs";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Button from "@/ui/Button";
import Skeleton from "@/ui/Skeleton";
import { FaArrowLeft, FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { useUserByEmail } from "@/hooks/useUserByEmail";
import Image from "next/image";

export default function SingleBlogPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: blog, isLoading, isError } = useGetBlog(id);
    const { authorUser } = useUserByEmail({ email: blog?.author || "" });

    if (isLoading) {
        return (
            <Container>
                <Section className="py-20 max-w-4xl mx-auto space-y-8">
                    <Button
                        label="Back"
                        isOutline
                        leftIcon={<FaArrowLeft />}
                        onClick={() => router.back()}
                        className="w-fit"
                    />
                    <div className="space-y-4">
                        <Skeleton variant="text" className="h-12 w-3/4" />
                        <div className="flex gap-4">
                            <Skeleton variant="circle" className="size-10" />
                            <div className="space-y-2">
                                <Skeleton variant="text" className="h-4 w-32" />
                                <Skeleton variant="text" className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                    <Skeleton variant="rectangle" className="h-96 w-full rounded-3xl" />
                    <div className="space-y-2">
                        <Skeleton variant="text" className="h-4 w-full" />
                        <Skeleton variant="text" className="h-4 w-full" />
                        <Skeleton variant="text" className="h-4 w-5/6" />
                    </div>
                </Section>
            </Container>
        );
    }

    if (isError || !blog) {
        return (
            <Container>
                <Section className="py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
                    <Button
                        label="Back to Blogs"
                        onClick={() => router.push("/blogs")}
                    />
                </Section>
            </Container>
        );
    }

    return (
        <Container>
            <Section className="py-12 md:py-20 max-w-4xl mx-auto">
                <Button
                    label="Back"
                    isOutline
                    leftIcon={<FaArrowLeft />}
                    onClick={() => router.back()}
                    className="mb-8 w-fit hover:gap-3 transition-all"
                />

                <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <header className="space-y-6 border-b border-base-content/10 pb-8">
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-primary">
                            <span className="bg-primary/10 px-3 py-1 rounded-full">Article</span>
                            <span className="flex items-center gap-2 text-base-content/60">
                                <FaRegCalendarAlt />
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-base-content">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden border-2 border-base-100 shadow-lg relative">
                                {authorUser?.image ? (
                                    <Image
                                        src={authorUser.image}
                                        alt={authorUser.name}
                                        fill
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="text-xl" />
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-base-content text-lg">{authorUser?.name || "Unknown Author"}</p>
                                <p className="text-sm text-base-content/60">{authorUser?.email}</p>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-3xl prose-img:shadow-xl text-base-content/80 leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </article>

                {/* Interaction Section (Optional: Comments, etc. could go here) */}
                <div className="mt-12 pt-8 border-t border-base-content/10 flex justify-between items-center">
                    <p className="text-base-content/50 italic">
                        Thanks for reading!
                    </p>
                    {/* Share buttons could go here */}
                </div>
            </Section>
        </Container>
    );
}
