"use client";

import { useOnboarding } from '../onboarding-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201+']),
  domainName: z.string()
    .min(1, 'Domain name is required')
    .refine(value => {
      try {
        new URL(value.startsWith('http') ? value : `https://${value}`);
        return true;
      } catch {
        return false;
      }
    }, 'Please enter a valid domain name'),
  phoneNumber: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number (E.164 format, e.g., +1234567890)'),
  businessEmail: z.string().email('Please enter a valid email address'),
});

export function BusinessDetailsStep() {
  const { data, updateData, currentStep, setCurrentStep, setIsLoading } = useOnboarding();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: data.companyName,
      companySize: data.companySize,
      domainName: data.domainName,
      phoneNumber: data.phoneNumber,
      businessEmail: data.businessEmail,
    },
  });

  // Auto-focus first input on mount
  useEffect(() => {
    if (currentStep === 1) {
      const firstInput = document.querySelector('input[name="companyName"]') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [currentStep]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Format domain name if needed
      const formattedDomain = values.domainName.startsWith('http') 
        ? values.domainName 
        : `https://${values.domainName}`;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      updateData({
        ...values,
        domainName: formattedDomain,
      });
      setCurrentStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep !== 1) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight" id="business-details-title">
            Business Details
          </h2>
          <p className="text-muted-foreground">
            Tell us about your business to get started
          </p>
        </div>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
            aria-labelledby="business-details-title"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      aria-label="Company name"
                      placeholder="Enter your company name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger aria-label="Select company size">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="example.com"
                      aria-label="Domain name"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your domain name without http:// or https://
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="+1234567890"
                      aria-label="Phone number in E.164 format"
                      type="tel"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter phone number in E.164 format (e.g., +1234567890)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Business email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                aria-label="Proceed to next step"
                className="min-w-[120px]"
              >
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
}