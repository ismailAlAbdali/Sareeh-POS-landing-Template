"use client";

import { createContext, useContext, useState } from 'react';
import type { Plan } from '../pricing';

export type BusinessSize = '1-10' | '11-50' | '51-200' | '201+';
export type Position = 'CEO' | 'Manager' | 'Owner' | 'Other';
export type Industry = 
  | 'POS & Retail' 
  | 'Business Services' 
  | 'Manufacturing' 
  | 'Healthcare' 
  | 'Hospitality' 
  | 'Professional Services' 
  | 'Construction' 
  | 'Other';

export interface OnboardingData {
  // Selected Plan
  selectedPlan?: Plan;
  isYearlyBilling?: boolean;

  // Business Details
  companyName: string;
  companySize: BusinessSize;
  domainName: string;
  phoneNumber: string;
  businessEmail: string;
  
  // Personal Information
  firstName: string;
  lastName: string;
  position: Position;
  
  // Industry
  industry: Industry;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isWizardOpen: boolean;
  setWizardOpen: (open: boolean) => void;
}

const defaultData: OnboardingData = {
  companyName: '',
  companySize: '1-10',
  domainName: '',
  phoneNumber: '',
  businessEmail: '',
  firstName: '',
  lastName: '',
  position: 'Owner',
  industry: 'POS & Retail',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isWizardOpen, setWizardOpen] = useState(false);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
        isWizardOpen,
        setWizardOpen,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}