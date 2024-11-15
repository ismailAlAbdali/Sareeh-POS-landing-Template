"use client";

import { useOnboarding } from '../onboarding-context';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export function SuccessStep() {
  const { currentStep, data, setWizardOpen } = useOnboarding();

  if (currentStep !== 4) return null;

  const handleComplete = () => {
    // Close the wizard and perform any necessary actions
    setWizardOpen(false);
    // Here you would typically make an API call to create the account
    console.log('Completing setup with data:', data);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="text-center space-y-6 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-primary" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Ready to Set Up Your System</h2>
          <p className="text-muted-foreground">
            We'll configure your system based on your industry requirements.
            Click complete to finish the setup process.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
          <p className="font-medium">Configuration Summary:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>Company: {data.companyName}</li>
            <li>Industry: {data.industry}</li>
            <li>Plan: {data.selectedPlan?.name} ({data.isYearlyBilling ? 'Yearly' : 'Monthly'})</li>
            <li>Subdomain: {data.companyName.toLowerCase().replace(/\s+/g, '-')}.sme.om</li>
          </ul>
        </div>

        <Button className="w-full" size="lg" onClick={handleComplete}>
          Complete Setup
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}