import React, { useMemo } from 'react';

interface MediaItem {
  id: string;
  media_url: string;
  mime_type: string;
  original_filename?: string;
}

interface ContentRendererProps {
  htmlContent: string;
  mediaItems?: MediaItem[];
  className?: string;
}

/**
 * ContentRenderer - Render HTML content with media placeholders replaced
 * Enhanced with beautiful styling for learning content
 * 
 * Converts [MEDIA_PLACEHOLDER_id] to actual <img> or <video> tags
 * based on mime type
 */
export default function ContentRenderer({
  htmlContent,
  mediaItems = [],
  className = ''
}: ContentRendererProps) {
  
  const processedContent = useMemo(() => {
    if (!htmlContent || mediaItems.length === 0) {
      return htmlContent;
    }

    let processed = htmlContent;

    // Replace each media placeholder with actual media element
    mediaItems.forEach((media) => {
      const placeholder = `[MEDIA_PLACEHOLDER_${media.id}]`;
      
      // Check if placeholder exists in content
      if (processed.includes(placeholder)) {
        let mediaHtml = '';

        // Determine media type
        if (media.mime_type.startsWith('image/')) {
          // Image
          mediaHtml = `
            <div class="media-item image-wrapper my-6">
              <img 
                src="${media.media_url}" 
                alt="${media.original_filename || 'Media'}"
                class="w-full h-auto rounded-lg shadow-md border border-gray-200"
                loading="lazy"
              />
            </div>
          `;
        } else if (media.mime_type.startsWith('video/')) {
          // Video
          mediaHtml = `
            <div class="media-item video-wrapper my-6">
              <video 
                controls
                class="w-full rounded-lg shadow-md border border-gray-200"
                preload="metadata"
              >
                <source src="${media.media_url}" type="${media.mime_type}" />
                Browser Anda tidak mendukung video HTML5.
              </video>
            </div>
          `;
        } else if (media.mime_type.startsWith('audio/')) {
          // Audio
          mediaHtml = `
            <div class="media-item audio-wrapper my-6">
              <audio 
                controls
                class="w-full rounded-lg shadow-sm border border-gray-200"
                preload="metadata"
              >
                <source src="${media.media_url}" type="${media.mime_type}" />
                Browser Anda tidak mendukung audio HTML5.
              </audio>
            </div>
          `;
        } else {
          // Other file types - download link
          mediaHtml = `
            <div class="media-item file-wrapper my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <a 
                href="${media.media_url}" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
                <span>Download: ${media.original_filename || 'File'}</span>
              </a>
            </div>
          `;
        }

        // Replace placeholder with media HTML
        processed = processed.replace(placeholder, mediaHtml);
      }
    });

    return processed;
  }, [htmlContent, mediaItems]);

  // If no content, show fallback
  if (!htmlContent) {
    return (
      <div className={className}>
        <p className="text-gray-500 italic text-center py-8">
          Konten kosong
        </p>
      </div>
    );
  }

  return (
    <div className={`learning-content ${className}`}>
      <style jsx>{`
        /* ========================================
           ENHANCED LEARNING CONTENT STYLES
           Membuat konten pembelajaran lebih menarik
           ======================================== */
        
        .learning-content {
          line-height: 1.8;
          color: #374151;
        }

        /* ===== HEADINGS - Lebih Prominent ===== */
        .learning-content :global(h1) {
          font-size: 2rem;
          font-weight: 800;
          color: #27548A;
          background: linear-gradient(135deg, #578FCA 0%, #27548A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #E5F0FF;
          position: relative;
        }

        .learning-content :global(h1::before) {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #578FCA, #27548A);
          border-radius: 2px;
        }

        .learning-content :global(h2) {
          font-size: 1.75rem;
          font-weight: 700;
          color: #27548A;
          margin-top: 2rem;
          margin-bottom: 1.25rem;
          padding-left: 1rem;
          border-left: 4px solid #578FCA;
          background: linear-gradient(90deg, rgba(87, 143, 202, 0.08) 0%, transparent 100%);
          padding: 0.75rem 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .learning-content :global(h3) {
          font-size: 1.5rem;
          font-weight: 600;
          color: #578FCA;
          margin-top: 1.75rem;
          margin-bottom: 1rem;
          padding-left: 0.75rem;
          border-left: 3px solid #93C5FD;
        }

        .learning-content :global(h4) {
          font-size: 1.25rem;
          font-weight: 600;
          color: #60A5FA;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        /* ===== BOLD - Bigger & Branded Color ===== */
        .learning-content :global(strong),
        .learning-content :global(b) {
          font-size: 1.15em;
          font-weight: 700;
          color: #27548A;
          background: linear-gradient(135deg, rgba(87, 143, 202, 0.12) 0%, rgba(39, 84, 138, 0.12) 100%);
          padding: 0.125rem 0.35rem;
          border-radius: 0.25rem;
          display: inline-block;
          line-height: 1.6;
        }

        /* ===== ITALIC - Elegant Style ===== */
        .learning-content :global(em),
        .learning-content :global(i) {
          font-style: italic;
          color: #4B5563;
          background: linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.8) 100%);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          border-left: 2px solid #93C5FD;
        }

        /* ===== UNDERLINE ===== */
        .learning-content :global(u) {
          text-decoration: none;
          border-bottom: 2px solid #578FCA;
          padding-bottom: 2px;
        }

        /* ===== PARAGRAPHS - Better Spacing ===== */
        .learning-content :global(p) {
          margin-bottom: 1.25rem;
          font-size: 1rem;
          line-height: 1.8;
        }

        .learning-content :global(p:first-child) {
          font-size: 1.05rem;
        }

        /* ===== LISTS - Enhanced Styling ===== */
        .learning-content :global(ul) {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }

        .learning-content :global(ul li) {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.875rem;
          padding-top: 0.375rem;
          padding-bottom: 0.375rem;
          transition: all 0.2s ease;
        }

        .learning-content :global(ul li::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75rem;
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #578FCA, #27548A);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(87, 143, 202, 0.3);
        }

        .learning-content :global(ul li:hover) {
          background: rgba(87, 143, 202, 0.05);
          padding-left: 2.25rem;
          border-radius: 0.5rem;
        }

        /* Nested Lists */
        .learning-content :global(ul ul) {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .learning-content :global(ul ul li::before) {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #93C5FD, #60A5FA);
        }

        /* ===== ORDERED LISTS - Numbered with Style ===== */
        .learning-content :global(ol) {
          margin: 1.5rem 0;
          padding-left: 0;
          counter-reset: item;
          list-style: none;
        }

        .learning-content :global(ol li) {
          position: relative;
          padding-left: 3rem;
          margin-bottom: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          counter-increment: item;
          transition: all 0.2s ease;
        }

        .learning-content :global(ol li::before) {
          content: counter(item);
          position: absolute;
          left: 0;
          top: 0.35rem;
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #578FCA, #27548A);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          box-shadow: 0 2px 6px rgba(87, 143, 202, 0.4);
        }

        .learning-content :global(ol li:hover) {
          background: rgba(87, 143, 202, 0.05);
          padding-left: 3.25rem;
          border-radius: 0.5rem;
        }

        /* ===== BLOCKQUOTES - Highlight Important Info ===== */
        .learning-content :global(blockquote) {
          margin: 1.75rem 0;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(87, 143, 202, 0.08) 0%, rgba(39, 84, 138, 0.08) 100%);
          border-left: 5px solid #578FCA;
          border-radius: 0 0.75rem 0.75rem 0;
          font-size: 1.05rem;
          font-style: italic;
          color: #1F2937;
          box-shadow: 0 2px 8px rgba(87, 143, 202, 0.1);
          position: relative;
        }

        .learning-content :global(blockquote::before) {
          content: '"';
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          font-size: 4rem;
          color: #578FCA;
          opacity: 0.2;
          font-family: Georgia, serif;
        }

        /* ===== CODE - Inline & Block ===== */
        .learning-content :global(code) {
          background: #F3F4F6;
          color: #DB2777;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          font-weight: 600;
          border: 1px solid #E5E7EB;
        }

        .learning-content :global(pre) {
          background: #1F2937;
          color: #F9FAFB;
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .learning-content :global(pre code) {
          background: transparent;
          color: inherit;
          padding: 0;
          border: none;
          font-size: 0.9rem;
        }

        /* ===== LINKS - Branded Style ===== */
        .learning-content :global(a) {
          color: #578FCA;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }

        .learning-content :global(a:hover) {
          color: #27548A;
          border-bottom-color: #578FCA;
        }

        .learning-content :global(a::after) {
          content: '→';
          margin-left: 0.25rem;
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .learning-content :global(a:hover::after) {
          transform: translateX(4px);
        }

        /* ===== HORIZONTAL RULE ===== */
        .learning-content :global(hr) {
          margin: 2.5rem 0;
          border: none;
          height: 3px;
          background: linear-gradient(90deg, transparent, #578FCA, transparent);
          border-radius: 2px;
        }

        /* ===== TABLES - Clean Design ===== */
        .learning-content :global(table) {
          width: 100%;
          margin: 2rem 0;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .learning-content :global(thead) {
          background: linear-gradient(135deg, #578FCA, #27548A);
          color: white;
        }

        .learning-content :global(th) {
          padding: 1rem;
          text-align: left;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .learning-content :global(td) {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .learning-content :global(tbody tr) {
          transition: background 0.2s ease;
        }

        .learning-content :global(tbody tr:hover) {
          background: rgba(87, 143, 202, 0.05);
        }

        .learning-content :global(tbody tr:nth-child(even)) {
          background: #F9FAFB;
        }

        .learning-content :global(tbody tr:nth-child(even):hover) {
          background: rgba(87, 143, 202, 0.08);
        }

        /* ===== IMAGES - Responsive & Styled ===== */
        .learning-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          margin: 1.5rem 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .learning-content :global(img:hover) {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(87, 143, 202, 0.3);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 640px) {
          .learning-content :global(h1) {
            font-size: 1.75rem;
          }

          .learning-content :global(h2) {
            font-size: 1.5rem;
          }

          .learning-content :global(h3) {
            font-size: 1.25rem;
          }

          .learning-content :global(strong),
          .learning-content :global(b) {
            font-size: 1.1em;
          }

          .learning-content :global(ol li),
          .learning-content :global(ul li) {
            padding-left: 2.5rem;
          }

          .learning-content :global(ol li::before) {
            width: 1.75rem;
            height: 1.75rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}
