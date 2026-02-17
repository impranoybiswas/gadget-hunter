"use client";

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLikeBlog } from "@/hooks/useBlogs";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface BlogLikeButtonProps {
    blogId: string;
    likers?: string[];
}

export default function BlogLikeButton({ blogId, likers = [] }: BlogLikeButtonProps) {
    const { data: session } = useSession();
    const { mutate: likeBlog, isPending } = useLikeBlog();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likers.length);

    useEffect(() => {
        if (session?.user?.email) {
            setIsLiked(likers.includes(session.user.email));
        }
        setLikeCount(likers.length);
    }, [likers, session]);

    const handleLike = () => {
        if (!session) {
            toast.error("Please login to like this blog!");
            return;
        }

        // Optimistic UI update
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

        likeBlog(blogId, {
            onError: () => {
                // Revert on error
                setIsLiked(!newIsLiked);
                setLikeCount((prev) => (!newIsLiked ? prev + 1 : prev - 1));
            },
        });
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleLike}
                disabled={isPending}
                className="relative group focus:outline-none"
                title={isLiked ? "Unlike" : "Like"}
            >
                <AnimatePresence mode="wait">
                    {isLiked ? (
                        <motion.div
                            key="liked"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <FaHeart className="text-xl text-red-500 cursor-pointer drop-shadow-md" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unliked"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <FaRegHeart className="text-xl text-base-content/50 hover:text-red-500/50 transition-colors cursor-pointer" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Instagram-style pulse effect on like */}
                {isLiked && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-red-500/20 rounded-full"
                    />
                )}
            </button>

            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-base-content">
                    {likeCount}
                </span>
                <span className="text-xs text-base-content/50 uppercase tracking-widest font-semibold">
                    Likes
                </span>
            </div>
        </div>
    );
}
