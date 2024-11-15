"use client";

import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BusinessDetailsStep } from './steps/business-details';
import { PersonalInfoStep } from './steps/personal-info';
import { IndustryStep } from './steps/industry';
import { SuccessStep } from './steps/success';
import { StepIndicator } from './step-indicator';
import { useOnboarding } from './onboarding-context';

export function OnboardingWizard() {
  const { isWizardOpen, setWizardOpen, currentStep } = useOnboarding();

  const stepTitles = {
    1: "Business Details",
    2: "Personal Information",
    3: "Industry Selection",
    4: "Setup Complete",
  };

  return (
    <Dialog open={isWizardOpen} onOpenChange={setWizardOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{stepTitles[currentStep as keyof typeof stepTitles]}</DialogTitle>
        </DialogHeader>
        <StepIndicator />
        <BusinessDetailsStep />
        <PersonalInfoStep />
        <IndustryStep />
        <SuccessStep />
      </DialogContent>
    </Dialog>
  );
}