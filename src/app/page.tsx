import CategorySection from "@/components/home/CategorySection";
import CouponSection from "@/components/home/CouponSection";
import FeaturedProductSection from "@/components/home/FeaturedSection";
import Header from "@/components/home/Header";
import ReviewSection from "@/components/home/ReviewSection";
import Container from "@/ui/Container";
import TopCategorySection from "@/components/home/TopCategorySection";
import StatsSection from "@/components/home/StatsSection";
import BlogSection from "@/components/home/BlogSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <Container>
      <Header />
      <StatsSection />
      <CategorySection />
      <FeaturedProductSection />
      <TopCategorySection />
      <CouponSection />
      <BlogSection />
      <ReviewSection />
      <NewsletterSection />
    </Container>
  );
}
