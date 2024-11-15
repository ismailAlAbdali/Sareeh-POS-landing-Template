"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Plan } from "./pricing";
import { useOnboarding } from "./onboarding/onboarding-context";

interface PlanConfirmationDialogProps {
  plan: Plan | null;
  isYearly: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanConfirmationDialog({
  plan,
  isYearly,
  open,
  onOpenChange,
}: PlanConfirmationDialogProps) {
  const { updateData, setCurrentStep, setWizardOpen } = useOnboarding();

  if (!plan) return null;

  const handleConfirm = () => {
    // Store the selected plan in the onboarding context
    updateData({
      selectedPlan: plan,
      isYearlyBilling: isYearly,
    });
    
    // Close the plan confirmation dialog
    onOpenChange(false);
    
    // Reset to first step and open the onboarding wizard
    setCurrentStep(1);
    setWizardOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Plan</DialogTitle>
          <DialogDescription>
            Review your selected plan before proceeding with the setup
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg border p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">{plan.name}</h4>
              <p className="text-2xl font-bold">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <span className="text-base font-normal text-muted-foreground">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </p>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Change Plan
          </Button>
          <Button onClick={handleConfirm}>
            Continue with {plan.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}