import { FinanceSection } from "@/components/home/finance-section";
import { HomeHero } from "@/components/home/home-hero";
import { SellSection } from "@/components/home/sell-section";
import { Services } from "@/components/home/services";
import { StockStrip } from "@/components/home/stock-strip";

export default function Home() {
  return (
    <>
      <HomeHero />
      <StockStrip />
      <FinanceSection />
      <SellSection />
      <Services />
    </>
  );
}
