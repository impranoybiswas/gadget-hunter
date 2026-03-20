import CategorySection from "@/components/home/CategorySection";
import CouponSection from "@/components/home/CouponSection";
import FeaturedProductSection from "@/components/home/FeaturedSection";
import Header from "@/components/home/Header";
import ReviewSection from "@/components/home/ReviewSection";
import Container from "@/ui/Container";
import TopCategorySection from "@/components/home/TopCategorySection";

export default function Home() {
  return (
    <Container>
      <Header />
      <CategorySection />
      <FeaturedProductSection />
      <TopCategorySection/>
      <CouponSection />
      <ReviewSection />
    </Container>
  );
}
