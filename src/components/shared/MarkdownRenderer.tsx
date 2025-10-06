"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import {
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  ArrowRight,
  Clock,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const components = {
    // Headers
    h1: ({ children, ...props }: any) => (
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#27548A] mb-6 mt-8 first:mt-0 pb-3 border-b-2 border-[#578FCA]/20"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-4 mt-6 first:mt-0 flex items-center gap-2"
        {...props}
      >
        <div className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3
        className="text-lg sm:text-xl md:text-2xl font-bold text-[#27548A] mb-3 mt-5 first:mt-0"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4
        className="text-base sm:text-lg md:text-xl font-bold text-[#27548A] mb-3 mt-4 first:mt-0 flex items-center gap-2"
        {...props}
      >
        <ArrowRight className="w-4 h-4 text-[#578FCA]" />
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: any) => (
      <h5
        className="text-sm sm:text-base md:text-lg font-bold text-[#27548A] mb-2 mt-3 first:mt-0"
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: any) => (
      <h6
        className="text-sm md:text-base font-bold text-[#27548A] mb-2 mt-3 first:mt-0"
        {...props}
      >
        {children}
      </h6>
    ),

    // Paragraphs
    p: ({ children, ...props }: any) => {
      const content = React.Children.toArray(children).join("");

      // Special handling for emoji-prefixed content
      if (typeof content === "string") {
        if (
          content.startsWith("🎯") ||
          content.startsWith("✅") ||
          content.startsWith("📋")
        ) {
          return (
            <div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#578FCA] p-4 rounded-r-lg mb-4"
              {...props}
            >
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-medium">
                {children}
              </p>
            </div>
          );
        }
        if (content.startsWith("⚠️") || content.startsWith("🚧")) {
          return (
            <div
              className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-4"
              {...props}
            >
              <p className="text-amber-800 leading-relaxed text-sm sm:text-base font-medium">
                {children}
              </p>
            </div>
          );
        }
        if (content.startsWith("✨") || content.startsWith("💡")) {
          return (
            <div
              className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-400 p-4 rounded-r-lg mb-4"
              {...props}
            >
              <p className="text-emerald-800 leading-relaxed text-sm sm:text-base font-medium">
                {children}
              </p>
            </div>
          );
        }
      }

      return (
        <p
          className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4"
          {...props}
        >
          {children}
        </p>
      );
    },

    // Lists
    ul: ({ children, ...props }: any) => (
      <ul className="list-none space-y-2 mb-4 ml-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol
        className="list-decimal list-inside space-y-2 mb-4 ml-4 text-gray-700"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => {
      const content = React.Children.toArray(children).join("");

      // Check if it's a checklist item
      if (typeof content === "string" && content.includes("☐")) {
        return (
          <li
            className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
            {...props}
          >
            <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 shrink-0"></div>
            <span>{content.replace("☐", "").trim()}</span>
          </li>
        );
      }

      if (typeof content === "string" && content.includes("☑")) {
        return (
          <li
            className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
            {...props}
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
            <span>{content.replace("☑", "").trim()}</span>
          </li>
        );
      }

      return (
        <li
          className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
          {...props}
        >
          <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 shrink-0"></div>
          <span className="flex-1">{children}</span>
        </li>
      );
    },

    // Tables
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-6">
        <table
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead
        className="bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white"
        {...props}
      >
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody className="divide-y divide-gray-200" {...props}>
        {children}
      </tbody>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="px-4 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td
        className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
        {...props}
      >
        {children}
      </td>
    ),

    // Code
    code: ({ children, className, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        // Code block with language
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      // Inline code
      return (
        <code
          className="bg-gray-100 text-[#27548A] px-2 py-1 rounded text-sm font-mono border"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: any) => (
      <pre
        className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto shadow-lg"
        {...props}
      >
        {children}
      </pre>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-[#578FCA] bg-blue-50 p-4 rounded-r-lg mb-4 italic"
        {...props}
      >
        <div className="text-gray-700">{children}</div>
      </blockquote>
    ),

    // Horizontal Rule
    hr: ({ ...props }: any) => (
      <hr className="border-0 border-t-2 border-gray-200 my-8" {...props} />
    ),

    // Links
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-[#578FCA] hover:text-[#27548A] underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),

    // Emphasis
    strong: ({ children, ...props }: any) => (
      <strong className="font-bold text-[#27548A]" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-gray-600" {...props}>
        {children}
      </em>
    ),

    // Images
    img: ({ src, alt, ...props }: any) => (
      <div className="mb-6">
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          {...props}
        />
        {alt && (
          <p className="text-center text-sm text-gray-500 mt-2 italic">{alt}</p>
        )}
      </div>
    ),
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
