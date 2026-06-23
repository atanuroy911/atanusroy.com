import React from 'react';

export function DevQuote({ content }: { content: any }) {
  const { quote } = content.developer;

  const renderQuoteText = (text: string) => {
    const parts = text.split('*');
    return parts.map((part, i) => (
      i % 2 === 1 ? <em key={i}>{part}</em> : part
    ));
  };

  return (
    <section className="quote-sec">
      <div className="section-split" style={{ alignItems: 'center' }}>
        <div className="split-left">
          <div className="big-quote">
            &ldquo;{renderQuoteText(quote.text)}&rdquo;
          </div>
        </div>
        <div className="quote-person-wrapper">
          <div className="quote-person">
            <div className="qa">{quote.initials}</div>
            <div>
              <div className="quote-name">{quote.author}</div>
              <div className="quote-role">{quote.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
