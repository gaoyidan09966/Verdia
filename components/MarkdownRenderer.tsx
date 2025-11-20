import React from 'react';

interface Props {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content, className = '' }) => {
  // A very basic formatter to handle newlines and bold text from Markdown
  // In a production app, use 'react-markdown'
  const formatText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle bold (**text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-emerald-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Handle bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
         return <li key={index} className="ml-4 list-disc mb-1">{formattedLine.slice(1)}</li>
      }
      
      // Handle headings (simple check for #)
      if (line.trim().startsWith('##')) {
          return <h3 key={index} className="text-lg font-bold text-emerald-800 mt-4 mb-2">{line.replace(/^##\s+/, '')}</h3>
      }

      return <p key={index} className="mb-2 min-h-[1rem]">{formattedLine}</p>;
    });
  };

  return <div className={`text-slate-700 leading-relaxed ${className}`}>{formatText(content)}</div>;
};

export default MarkdownRenderer;