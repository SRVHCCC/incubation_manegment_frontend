/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const HeroPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen">
      <section className="relative pb-10 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">  
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-[-8%]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                Build the Future with{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-br from-cyan-400 to-blue-500">
                  Innovation
                </span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                Create stunning, responsive, and highly interactive web
                experiences effortlessly. Elevate your brand with cutting-edge
                design components.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 transition-all"
                >
                  Start Building Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl font-bold text-slate-200 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
                >
                  View Documentation
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-cyan-500/20 bg-slate-900 aspect-video flex items-center justify-center"
              >
                <img
                  src="https://placehold.co/800x600/1e293b/38bdf8?text=Incubation+Masters"
                  alt="Dashboard Placeholder"
                  className="w-full h-full object-cover opacity-80 mix-blend-lighten"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-2 md:-left-6 w-32 h-32 bg-slate-800 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-slate-300">
                  Optimized
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 relative z-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover the tools that will transform your development workflow
              and enhance user engagement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast",
                desc: "Built on modern architecture ensuring sub-second load times.",
                img: "https://placehold.co/400x300/0f172a/06b6d4?text=Speed",
              },
              {
                title: "Fully Responsive",
                desc: "Looks perfect on all devices, from mobile phones to massive desktop monitors.",
                img: "https://placehold.co/400x300/0f172a/3b82f6?text=Responsive",
              },
              {
                title: "Secure by Default",
                desc: "Enterprise-grade security protocols implemented at every layer.",
                img: "https://placehold.co/400x300/0f172a/8b5cf6?text=Security",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
