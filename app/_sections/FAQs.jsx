"use client";

import { useState } from "react";
import { motion } from "motion/react";

const faqs = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Express options are available at checkout.",
  },
  {
    id: 3,
    question: "Do you offer customer support?",
    answer:
      "Yes, our support team is available Monday through Friday, 9am–5pm. You can reach us via email or live chat.",
  },
  {
    id: 4,
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 24 hours of placement. After that, they may already be in fulfillment.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-question">{faq.question}</span>
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <motion.div
        animate={
          isOpen
            ? { maxHeight: 500, opacity: 1, padding: "3rem" }
            : { opacity: 0, maxHeight: 0, overflow: "hidden" }
        }
        transition={{
          duration: 0.2,
        }}
        className="faq-answer"
      >
        <motion.p>{faq.answer}</motion.p>
      </motion.div>
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
