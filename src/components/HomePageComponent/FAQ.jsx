// components/FAQ.jsx
import '../../css/ContactFAQ.css';



export default function FAQ() {
  const faqs = [
    {
      question: 'Q1: Is my vote secure?',
      answer: 'Yes, ElectraVote uses OTP verification and secure transmission to ensure every vote is safe.'
    },
    {
      question: 'Q2: Can I vote more than once?',
      answer: 'No. The system validates each voter\'s identity and restricts voting to one per election.'
    },
    {
      question: 'Q3: What if I lose internet while voting?',
      answer: 'Your vote is not submitted until the process is complete. You can retry securely.'
    }
  ];

  return (
    <div className="div-login-center">
      <h2 style={{ color: '#6890e2' }}>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <h4 className="faq-question">{faq.question}</h4>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
