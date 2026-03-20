import FireflyHero from "@/components/sections/FireflyHero";
import FireflyStory from "@/components/sections/FireflyStory";
import FireflyCraft from "@/components/sections/FireflyCraft";
import FireflyContact from "@/components/sections/FireflyContact";
import HomeScrollReset from "@/components/shared/HomeScrollReset";
import FireflyVideoGate from "@/components/shared/FireflyVideoGate";

export default function HomePage() {
  return (
    <>
      <HomeScrollReset />
      <FireflyVideoGate />
      <FireflyHero />
      <FireflyStory />
      <FireflyCraft />
      {/* Placeholder anchors for Shop / Education nav (hash targets) */}
      <div id="shop" className="h-0 scroll-mt-28" aria-hidden="true" />
      <div id="education" className="h-0 scroll-mt-28" aria-hidden="true" />
      <FireflyContact />
    </>
  );
}
