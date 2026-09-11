"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    id: 1,
    question: "What type of motion design work do you create?",
    answer:
      "I create brand animations, title sequences, social motion assets, launch videos, product explainers, and campaign visuals designed to elevate a brand’s digital presence.",
  },
  {
    id: 2,
    question: "Do you work on both branding and animation?",
    answer:
      "Yes. I often build the visual direction and then extend it into motion systems, ensuring the brand feels consistent across video, digital experiences, and social content.",
  },
  {
    id: 3,
    question: "Can you help with a website motion experience?",
    answer:
      "Absolutely. I can design animated transitions, hero sequences, micro-interactions, and scroll-driven motion that add energy and clarity to a website or landing page.",
  },
  {
    id: 4,
    question: "What does your process look like?",
    answer:
      "The process usually starts with creative direction and reference research, followed by concept development, animation design, refinement, and final delivery with feedback built into each stage.",
  },
  {
    id: 5,
    question: "How do you approach collaboration with clients?",
    answer:
      "I like to keep the process collaborative and clear, with regular reviews, open communication, and a focus on aligning the motion with the brand story and campaign goals.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        className={`faq-trigger ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="faq-question">{faq.question}</span>
        <span
          className={`faq-icon ${isOpen ? "open" : ""}`}
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="faq-answer"
          >
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="faq-answer-inner"
            >
              <p>{faq.answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="container">
      <div className="section-heading">
        <h2>FAQs.</h2>
      </div>

      <div className="faq-section">
        <div className="faq-list">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
