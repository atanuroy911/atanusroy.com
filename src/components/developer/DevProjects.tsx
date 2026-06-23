import React from 'react';
import Link from 'next/link';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiPytorch, SiOpenai, SiDocker, SiGraphql, SiFirebase, SiPostgresql, SiMongodb } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import { Layers } from 'lucide-react';

const iconMap: Record<string, any> = {
  react: SiReact,
  'next.js': SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  python: SiPython,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  openai: SiOpenai,
  docker: SiDocker,
  aws: DiAws,
  graphql: SiGraphql,
  firebase: SiFirebase,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
};

function getTechIcon(tag: string) {
  const normalized = tag.toLowerCase().replace(/[^a-z0-9.]/g, '');
  const Icon = iconMap[normalized];
  return Icon ? <Icon className="text-lg" /> : null;
}
export function DevProjects({ content }: { content: any }) {
  const allProjects = content.developer.projects || [];
  const featured = allProjects.filter((p: any) => p.featured).slice(0, 3);

  return (
    <>
      {featured.map((project: any, index: number) => (
        <section key={index} className="project-sec section-split mb-24">
          <div className="split-left project-info">
            <div className="sec-label">Featured work · 0{index + 1}</div>
            <div className="project-title">{project.title}</div>
            <div className="project-desc">{project.description}</div>
            
            <div className="tech-pills">
              {project.tags.map((tag: string, i: number) => {
                const icon = getTechIcon(tag);
                return (
                  <div key={i} className="pill flex items-center gap-2">
                    {icon}
                    <span>{tag}</span>
                  </div>
                );
              })}
            </div>
            
            {project.testimonial && (
              <div className="testimonial-card">
                <div className="testi-quote">{project.testimonial.quote}</div>
                <div className="testi-author">
                  <div className="testi-avatar">{project.testimonial.initials}</div>
                  <div>
                    <div className="testi-name">{project.testimonial.author}</div>
                    <div className="testi-role">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}
            
            {project.link ? (
              <Link href={project.link} target="_blank" className="project-cta">
                View Live Project →
              </Link>
            ) : (
              <Link href={project.github || '#'} target="_blank" className="project-cta">
                View Source Code →
              </Link>
            )}
          </div>
          
          <div className="split-right">
            <div className="project-screen">
              <div className="screen-bar">
                <div className="screen-dot"></div>
                <div className="screen-dot"></div>
                <div className="screen-dot"></div>
                {project.mockup_url && (
                  <div className="screen-url">{project.mockup_url}</div>
                )}
              </div>
              <div className="screen-body">
                <div className="screen-placeholder">
                  <div className="pi">{project.mockup_icon || '💻'}</div>
                  <p>Project Screenshot / Demo</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="flex justify-center mt-12 mb-24">
        <Link href="https://calendly.com/atanusroy" target="_blank" className="btn-primary items-center gap-2" rel="noopener noreferrer">
          Book a Free Call
        </Link>
      </div>
    </>
  );
}
