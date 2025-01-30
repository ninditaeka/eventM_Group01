'use client';

import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from 'flowbite-react';

const faqs = [
  {
    question: 'How can I book tickets for an event?',
    answer:
      'You can book tickets via our website by selecting the event and completing the checkout process.',
  },
  {
    question: 'Will I receive a confirmation email after booking?',
    answer:
      'Yes, a confirmation email with your ticket details will be sent immediately after payment.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, PayPal, and UPI payments.',
  },
  {
    question: 'Can I modify my booking after purchase?',
    answer:
      'Modifications are possible within 24 hours. Contact support for assistance.',
  },
  {
    question: 'What if I don’t receive my ticket?',
    answer:
      'Check your spam folder. If not found, contact support for a reissue.',
  },
  {
    question: 'What if an event gets canceled?',
    answer:
      'A full refund will be processed automatically to your original payment method.',
  },
  {
    question: 'Are seats assigned, or is it free seating?',
    answer:
      'It depends on the event. Check the event details for seating arrangements.',
  },
  {
    question: 'Can I get a refund if I can’t attend?',
    answer:
      'Refund policies vary by event. Check the event’s terms before booking.',
  },
  {
    question: 'What is the age restriction for events?',
    answer: 'Age restrictions vary. Check the event details before booking.',
  },
  {
    question: 'Can I bring my own food and drinks?',
    answer:
      'Outside food and drinks are usually not allowed. Refer to the event policies.',
  },
];

export default function FAQPage() {
  return (
    <article className="m-2 px-4">
      <div className="min-h-screen rounded-lg bg-gray-100">
        {/* Header */}
        <div className="w-full mb-8 text-center bg-red-400 rounded-lg z-10 py-28 items-center justify-center relative">
          <h1 className="text-5xl font-bold text-white">FAQs</h1>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold text-center mb-4 p-2">
            Frequently Asked Questions
          </h2>
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionPanel key={index}>
                <AccordionTitle className="p-4">{faq.question}</AccordionTitle>
                <AccordionContent className="p-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
        </div>
      </div>
    </article>
  );
}
