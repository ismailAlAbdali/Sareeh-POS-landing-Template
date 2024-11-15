"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Coffee, Scissors, ShoppingCart, Building2, Briefcase } from 'lucide-react';

const useCases = [
  {
    icon: Store,
    title: 'Retail Stores',
    description: 'Perfect for boutiques, electronics stores, and general retail.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
  },
  {
    icon: Coffee,
    title: 'Coffee Shops',
    description: 'Streamline orders and manage inventory for cafes.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80',
  },
  {
    icon: Scissors,
    title: 'Beauty Salons',
    description: 'Appointment management and service tracking.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
  },
  {
    icon: ShoppingCart,
    title: 'Grocery Stores',
    description: 'Manage fresh inventory and multiple departments.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
  },
  {
    icon: Building2,
    title: 'Restaurants',
    description: 'Table management and kitchen order systems.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
  },
  {
    icon: Briefcase,
    title: 'Service Providers',
    description: 'Booking and service management made simple.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Perfect for Every Business</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Sareeh POS adapts to your specific industry needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <useCase.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}