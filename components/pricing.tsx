"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { PlanConfirmationDialog } from './plan-confirmation-dialog';
import { useOnboarding } from './onboarding/onboarding-context';

export interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      'Single location',
      'Up to 1,000 products',
      'Basic reporting',
      'Email support',
      '2 user accounts',
    ],
  },
  {
    name: 'Professional',
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      'Up to 3 locations',
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      '5 user accounts',
      'Customer loyalty program',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      'Unlimited locations',
      'Unlimited everything',
      'Custom reporting',
      '24/7 phone support',
      'Unlimited users',
      'Advanced integrations',
      'Dedicated account manager',
    ],
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowConfirmation(true);
  };

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={!isYearly ? 'text-primary font-medium' : 'text-gray-600'}>Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={isYearly ? 'text-primary font-medium' : 'text-gray-600'}>Yearly (Save 20%)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  {plan.popular && (
                    <div className="text-primary text-sm font-medium mb-2">Most Popular</div>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-base font-normal text-gray-600">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <PlanConfirmationDialog
          plan={selectedPlan}
          isYearly={isYearly}
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
        />
      </div>
    </section>
  );
}