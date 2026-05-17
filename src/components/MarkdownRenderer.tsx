'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  content: string
  mode?: 'academic' | 'developer'
}

export function MarkdownRenderer({ content, mode = 'academic' }: Props) {
  const isDev = mode === 'developer'

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => isDev
          ? <h1 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white mt-10 mb-4 border-l-4 border-[#00d9ff] pl-4">{children}</h1>
          : <h1 className="ac-font-serif text-4xl font-bold mt-10 mb-4" style={{ color: 'var(--ac-navy)' }}>{children}</h1>,

        h2: ({ children }) => isDev
          ? <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white mt-8 mb-3 border-l-4 border-[#ff3366] pl-3">{children}</h2>
          : <h2 className="ac-font-serif text-2xl font-bold mt-8 mb-3" style={{ color: 'var(--ac-navy)' }}>{children}</h2>,

        h3: ({ children }) => isDev
          ? <h3 className="text-xl font-black uppercase tracking-tight text-black dark:text-white mt-6 mb-2">{children}</h3>
          : <h3 className="ac-font-serif text-xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-200">{children}</h3>,

        p: ({ children }) => isDev
          ? <p className="text-black dark:text-white font-medium leading-relaxed mb-4">{children}</p>
          : <p className="text-slate-700 dark:text-slate-300 leading-loose mb-4">{children}</p>,

        ul: ({ children }) => isDev
          ? <ul className="mb-4 space-y-1.5 list-none pl-0">{children}</ul>
          : <ul className="mb-4 space-y-2 list-disc pl-6 text-slate-700 dark:text-slate-300">{children}</ul>,

        ol: ({ children }) => isDev
          ? <ol className="mb-4 space-y-1.5 list-none pl-0 counter-reset-item">{children}</ol>
          : <ol className="mb-4 space-y-2 list-decimal pl-6 text-slate-700 dark:text-slate-300">{children}</ol>,

        li: ({ children }) => isDev
          ? <li className="flex items-start gap-2 text-black dark:text-white font-medium">
              <span className="text-[#ff3366] dark:text-[#00d9ff] font-mono-dev font-black mt-0.5 flex-shrink-0">›</span>
              <span>{children}</span>
            </li>
          : <li className="text-slate-700 dark:text-slate-300">{children}</li>,

        blockquote: ({ children }) => isDev
          ? <blockquote className="border-l-4 border-[#ffde00] bg-[#fffde0] pl-4 py-2 my-4 font-mono-dev text-sm text-black font-bold">{children}</blockquote>
          : <blockquote className="border-l-4 pl-4 py-2 my-4 italic text-slate-600 dark:text-slate-400" style={{ borderColor: 'var(--ac-gold)' }}>{children}</blockquote>,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ inline, children, ...props }: any) => {
          if (inline) {
            return isDev
              ? <code className="font-mono-dev text-sm bg-black dark:bg-white text-[#00d9ff] dark:text-[#ff3366] px-1.5 py-0.5 border border-black dark:border-white">{children}</code>
              : <code className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded font-mono">{children}</code>
          }
          return isDev
            ? <code className="block font-mono-dev text-sm bg-black dark:bg-white text-[#00d9ff] dark:text-black p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_#ff3366] dark:shadow-[4px_4px_0px_#00d9ff] overflow-x-auto whitespace-pre my-4" {...props}>{children}</code>
            : <code className="block text-sm bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto whitespace-pre my-4" {...props}>{children}</code>
        },

        pre: ({ children }) => isDev
          ? <pre className="not-prose my-4">{children}</pre>
          : <pre className="not-prose my-4">{children}</pre>,

        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className={`w-full text-sm border-collapse ${isDev ? 'border-2 border-black dark:border-white' : 'border border-slate-200 rounded-lg overflow-hidden'}`}>
              {children}
            </table>
          </div>
        ),

        thead: ({ children }) => isDev
          ? <thead className="bg-black dark:bg-white text-white dark:text-black font-mono-dev font-bold uppercase tracking-widest text-xs">{children}</thead>
          : <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">{children}</thead>,

        th: ({ children }) => isDev
          ? <th className="p-3 text-left border-r-2 border-white dark:border-black last:border-0">{children}</th>
          : <th className="p-3 text-left border-b border-slate-200 dark:border-slate-700">{children}</th>,

        td: ({ children }) => isDev
          ? <td className="p-3 border border-black dark:border-white text-black dark:text-white font-medium">{children}</td>
          : <td className="p-3 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">{children}</td>,

        strong: ({ children }) => isDev
          ? <strong className="font-black text-black dark:text-white">{children}</strong>
          : <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,

        em: ({ children }) => (
          <em className={`italic ${isDev ? 'text-[#ff3366] dark:text-[#00d9ff]' : 'text-slate-600 dark:text-slate-400'}`}>{children}</em>
        ),

        a: ({ href, children }) => isDev
          ? <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-black dark:text-white underline underline-offset-2 decoration-[#00d9ff] hover:text-[#00d9ff] transition-colors">{children}</a>
          : <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: 'var(--ac-navy)' }}>{children}</a>,

        img: ({ src, alt }) => (
          <figure className={`my-6 ${isDev ? '' : ''}`}>
            <img src={src} alt={alt} className={`w-full object-cover ${isDev ? 'border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]' : 'rounded-xl shadow-sm'}`} />
            {alt && <figcaption className={`text-center text-xs mt-2 ${isDev ? 'font-mono-dev text-slate-500' : 'text-slate-400 italic'}`}>{alt}</figcaption>}
          </figure>
        ),

        hr: () => isDev
          ? <hr className="my-8 border-0 border-t-2 border-black dark:border-white" />
          : <hr className="my-8 border-slate-200 dark:border-slate-700" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
