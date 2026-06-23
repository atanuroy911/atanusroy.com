import React from 'react';

export function DevQuote({ content }: { content: any }) {
  const { quote } = content.developer;

  const renderQuoteText = (text: string) => {
    // Basic markdown support for *em*
    const parts = text.split('*');
    return parts.map((part, i) => (
      i % 2 === 1 ? <em key={i}>{part}</em> : part
    ));
  };

  return (
    <section className="quote-sec section-split">
      <div className="split-left">
        <div className="big-quote">
          &quot;{renderQuoteText(quote.text)}&quot;
        </div>
      </div>
      <div className="split-right quote-person-wrapper">
        <div className="quote-person">
          <div className="qa">{quote.initials}</div>
          <div>
            <div className="quote-name">{quote.author}</div>
            <div className="quote-role">{quote.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
