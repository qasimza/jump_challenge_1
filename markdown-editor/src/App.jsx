import React, { useState, useRef } from 'react';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

function App() {
  const [markdown, setMarkdown] = useState('# Hello\n\nStart typing...');
  const previewRef = useRef(null);

  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  };

  const exportPDF = () => {
    html2pdf().from(previewRef.current).save('markdown.pdf');
  };

  return (
    <div className="flex h-screen">
      <textarea
        className="w-1/2 p-4 font-mono border-r"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-end p-2 border-b">
          <button onClick={copyToClipboard} className="mx-2 px-3 py-1 bg-gray-200 rounded">Copy</button>
          <button onClick={exportPDF} className="px-3 py-1 bg-blue-500 text-white rounded">Export</button>
        </div>
        <div 
          ref={previewRef}
          className="flex-1 p-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
}

export default App;