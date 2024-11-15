"use client";

import { motion } from 'framer-motion';
import {
  BarChart,
  Package,
  Users,
  Building2,
  Heart,
  Smartphone,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Package,
    title: 'Inventory Management',
    description:
      'Track stock levels in real-time, set reorder points, and manage multiple locations effortlessly.',
  },
  {
    icon: BarChart,
    title: 'Sales Analytics',
    description:
      'Make data-driven decisions with powerful insights into sales trends, customer behavior, and business performance.',
  },
  {
    icon: Building2,
    title: 'Multi-location Support',
    description:
      'Manage multiple stores or locations from a single dashboard with synchronized inventory and reporting.',
  },
  {
    icon: Users,
    title: 'Employee Management',
    description:
      'Track employee performance, manage schedules, and control access permissions all in one place.',
  },
  {
    icon: Heart,
    title: 'Customer Loyalty',
    description:
      'Build customer relationships with integrated loyalty programs, rewards, and personalized marketing.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Access',
    description:
      'Run your business from anywhere with our mobile app. Process sales, check inventory, and view reports on the go.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Everything you need to run your business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Powerful features designed to help you grow and manage your business efficiently.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={`https://images.unsplash.com/photo-${index + 1}?auto=format&fit=crop&q=80`}
                    alt={feature.title}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}