"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiPytorch, SiOpenai, SiDocker, SiGraphql } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
function TypingEffect({ words }: { words: string[] }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed]);

  return (
    <div className="typing-role">
      <span className="typing-text">{text}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
}

export function DevHero({ content }: { content: any }) {
  const { hero, marquee } = content.developer;

  return (
    <>
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Hey, I&apos;m</div>
          <div className="hero-name">
            Atanu.<br />
          </div>
          <div className="hero-role">
            <TypingEffect words={hero.rotating_text} />
          </div>
          <div className="hero-sub" style={{ marginBottom: '64px' }}>{hero.tagline}</div>

          <div className="hero-btns">
            <Link href={hero.cta_primary_link} className="btn-primary">
              {hero.cta_primary}
            </Link>
            <a href="https://calendly.com/atanusroy" className="btn-ghost" target="_blank" rel="noopener noreferrer">
              Hire Me
            </a>
          </div>
        </div>
        <div className="hero-right">
          <Image 
            src={hero.photo_url} 
            alt="Developer Avatar" 
            width={400} 
            height={500} 
            className="hero-avatar"
            unoptimized
          />
          <div className="avail-badge">
            <div className="dot"></div>
            <span>{hero.status_badge}</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-row mt-12 border-t border-b border-gray-100 py-6">
        <div className="marquee-track flex items-center gap-12">
          {TECH_STACK.map((tech, i) => (
            <div key={`m1-${i}`} className="marquee-item flex items-center gap-2 text-xl font-medium text-gray-500 whitespace-nowrap">
              <tech.icon className="text-2xl text-blue-600" /> {tech.name}
            </div>
          ))}
          {/* Repeat for seamless infinite scrolling */}
          {TECH_STACK.map((tech, i) => (
            <div key={`m2-${i}`} className="marquee-item flex items-center gap-2 text-xl font-medium text-gray-500 whitespace-nowrap">
              <tech.icon className="text-2xl text-blue-600" /> {tech.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const TECH_STACK = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: DiAws },
  { name: 'GraphQL', icon: SiGraphql },
];
