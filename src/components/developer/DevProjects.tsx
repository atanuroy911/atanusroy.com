import React from 'react';
import Link from 'next/link';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiTensorflow, SiPytorch, SiOpenai, SiDocker,
  SiGraphql, SiFirebase, SiPostgresql, SiMongodb
} from 'react-icons/si';
import { DiAws } from 'react-icons/di';

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
  return Icon ? <Icon style={{ fontSize: '13px' }} /> : null;
}

export function DevProjects({ content }: { content: any }) {
  const allProjects = content.developer.projects || [];
  const featured = allProjects.filter((p: any) => p.featured).slice(0, 3);

  return (
    <>
      {featured.map((project: any, index: number) => (
        <section key={index} className="project-sec">
          <div className="section-split">
            {/* Info column */}
            <div className="project-info">
              <div className="sec-label">Featured work · 0{index + 1}</div>
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.description}</div>

              <div className="tech-pills">
                {project.tags.map((tag: string, i: number) => {
                  const icon = getTechIcon(tag);
                  return (
                    <div key={i} className="pill">
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
                  View Live Project <span>→</span>
                </Link>
              ) : (
                <Link href={project.github || '#'} target="_blank" className="project-cta">
                  View Source Code <span>→</span>
                </Link>
              )}
            </div>

            {/* Mockup column */}
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
                    <span className="pi">{project.mockup_icon || '💻'}</span>
                    <p>Project Screenshot / Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div className="flex justify-center py-12 px-5 border-b border-[var(--dev-border)]">
        <Link
          href="https://calendly.com/atanusroy"
          target="_blank"
          className="btn-primary"
          rel="noopener noreferrer"
        >
          Book a Free Call
        </Link>
      </div>
    </>
  );
}
