"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CgSearch } from "react-icons/cg";
import { FiX, FiPackage, FiGrid, FiBookOpen, FiLink } from "react-icons/fi";
import { useGetItems } from "@/hooks/useItems";
import { useGetBlogs } from "@/hooks/useBlogs";
import { categories } from "@/utilities/Categories";
import { navLink } from "@/components/Navbar";
import IconButton from "@/ui/IconButton";
import Image from "next/image";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchPopup() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const hasQuery = debouncedQuery.trim().length >= 1;

  // Data fetches
  const { data: productData } = useGetItems(
    1,
    hasQuery ? debouncedQuery : "",
    "",
    "",
    true,
  );
  const { data: blogData } = useGetBlogs({
    search: hasQuery ? debouncedQuery : "",
    limit: 5,
  });

  // Static filtering
  const q = debouncedQuery.toLowerCase();
  const matchedCategories = hasQuery
    ? categories.filter((c) => c.name.toLowerCase().includes(q))
    : [];
  const matchedNavLinks = hasQuery
    ? navLink.filter((l) => l.name.toLowerCase().includes(q))
    : [];
  const matchedProducts = (productData?.items || []).slice(0, 5);
  const matchedBlogs = (blogData?.data || []).slice(0, 4);

  const hasResults =
    matchedCategories.length > 0 ||
    matchedNavLinks.length > 0 ||
    matchedProducts.length > 0 ||
    matchedBlogs.length > 0;

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
      setQuery("");
    },
    [router],
  );

  // Open with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <div onClick={() => setOpen(true)}>
        <IconButton icon={<CgSearch />} />
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-[400] w-11/12 max-w-2xl bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-base-content/8">
                <CgSearch className="text-base-content/40 text-xl shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, blogs..."
                  className="flex-1 bg-transparent text-base-content placeholder:text-base-content/30 text-sm focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-base-content/30 hover:text-base-content transition cursor-pointer"
                  >
                    <FiX size={18} />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-base-200 text-base-content/30 text-xs font-mono border border-base-content/8">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {!hasQuery && (
                  <div className="py-10 text-center">
                    <CgSearch className="mx-auto text-3xl text-base-content/20 mb-2" />
                    <p className="text-sm text-base-content/40">
                      Start typing to search across all content
                    </p>
                    <p className="text-xs text-base-content/25 mt-1">
                      Products, categories, pages, blogs
                    </p>
                  </div>
                )}

                {hasQuery && !hasResults && (
                  <div className="py-10 text-center">
                    <p className="text-sm text-base-content/40">
                      No results for &ldquo;<strong>{debouncedQuery}</strong>
                      &rdquo;
                    </p>
                  </div>
                )}

                {/* Nav Links */}
                {matchedNavLinks.length > 0 && (
                  <ResultGroup icon={<FiLink size={13} />} label="Pages">
                    {matchedNavLinks.map((link) => (
                      <ResultItem
                        key={link.href}
                        onClick={() => navigate(link.href)}
                        left={
                          <FiLink size={14} className="text-base-content/40" />
                        }
                        title={link.name}
                        subtitle={link.href}
                      />
                    ))}
                  </ResultGroup>
                )}

                {/* Categories */}
                {matchedCategories.length > 0 && (
                  <ResultGroup icon={<FiGrid size={13} />} label="Categories">
                    {matchedCategories.map((cat) => (
                      <ResultItem
                        key={cat.name}
                        onClick={() =>
                          navigate(`/shop?category=${cat.name.toLowerCase()}`)
                        }
                        left={<span className="text-lg">{cat.icon}</span>}
                        title={cat.name}
                        subtitle={`Browse all ${cat.name} products`}
                      />
                    ))}
                  </ResultGroup>
                )}

                {/* Products */}
                {matchedProducts.length > 0 && (
                  <ResultGroup icon={<FiPackage size={13} />} label="Products">
                    {matchedProducts.map((p) => (
                      <ResultItem
                        key={p._id}
                        onClick={() => navigate(`/shop/${p._id}`)}
                        left={
                          <div className="relative size-10 rounded-lg overflow-hidden bg-base-200 shrink-0">
                            <Image
                              src={
                                p.images?.[0] || "/assets/placeholder-image.svg"
                              }
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        }
                        title={p.name}
                        subtitle={`${p.brand} · BDT ${p.price?.toLocaleString()}`}
                        badge={p.category}
                      />
                    ))}
                  </ResultGroup>
                )}

                {/* Blogs */}
                {matchedBlogs.length > 0 && (
                  <ResultGroup icon={<FiBookOpen size={13} />} label="Blogs">
                    {matchedBlogs.map((blog) => (
                      <ResultItem
                        key={blog._id}
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                        left={
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FiBookOpen size={16} className="text-primary" />
                          </div>
                        }
                        title={blog.title}
                        subtitle={new Date(blog.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      />
                    ))}
                  </ResultGroup>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-base-content/5 flex items-center justify-between">
                <p className="text-xs text-base-content/30">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-base-200 text-base-content/40 font-mono text-[10px]">
                    Ctrl+K
                  </kbd>{" "}
                  to open anytime
                </p>
                <p className="text-xs text-base-content/20">
                  Gadget Hunter Search
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ResultGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-base-content/30">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

function ResultItem({
  onClick,
  left,
  title,
  subtitle,
  badge,
}: {
  onClick: () => void;
  left: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200/60 transition-colors text-left group cursor-pointer"
    >
      {left}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-base-content truncate group-hover:text-primary transition-colors">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-base-content/40 truncate">{subtitle}</p>
        )}
      </div>
      {badge && (
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}
    </button>
  );
}
