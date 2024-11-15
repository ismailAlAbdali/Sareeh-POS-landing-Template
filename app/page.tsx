import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { GridShowcase } from '@/components/grid-showcase';
import { SocialProof } from '@/components/social-proof';
import { UseCases } from '@/components/use-cases';
import { Pricing } from '@/components/pricing';
import { Footer } from '@/components/footer';
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';
import { OnboardingProvider } from '@/components/onboarding/onboarding-context';

export default function Home() {
  return (
    <OnboardingProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Features />
        <GridShowcase />
        <SocialProof />
        <UseCases />
        <Pricing />
        <Footer />
        <OnboardingWizard />
      </main>
    </OnboardingProvider>
  );
}