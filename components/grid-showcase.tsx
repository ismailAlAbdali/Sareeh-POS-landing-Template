"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const showcaseItems = [
  {
    title: 'Modern Interface',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    description: 'Intuitive and user-friendly design for seamless operations',
  },
  {
    title: 'Real-time Analytics',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    description: 'Make data-driven decisions with powerful insights',
  },
  {
    title: 'Inventory Management',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80',
    description: 'Track and manage stock levels effortlessly',
  },
  {
    title: 'Mobile Access',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80',
    description: 'Access your POS system from anywhere, anytime',
  },
];

export function GridShowcase() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Experience Sareeh POS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the features that make Sareeh POS the perfect solution for your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}