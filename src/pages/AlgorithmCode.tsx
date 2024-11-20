import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Code } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getAlgorithmData } from '../lib/api/algorithms';
import PageLayout from '../components/PageLayout';
import hljs from 'highlight.js/lib/core';
import rust from 'highlight.js/lib/languages/rust';
import 'highlight.js/styles/github-dark.css';

// Register Rust language
hljs.registerLanguage('rust', rust);

function AlgorithmCode() {
  const { algorithmId } = useParams();

  const { data: algorithmData, loading, error } = useApi(
    async () => algorithmId ? await getAlgorithmData(algorithmId) : Promise.reject(new Error('No algorithm ID')),
    [algorithmId]
  );

  useEffect(() => {
    if (algorithmData?.code) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [algorithmData?.code]);

  return (
    <PageLayout
      title="Algorithm Code"
      subtitle={algorithmId}
      icon={Code}
      backLink={`/algorithm/${algorithmId}`}
      loading={loading}
      error={error}
      empty={!algorithmData}
    >
      <div className="bg-background-white dark:bg-background-dark rounded-xl shadow-sm border border-ui-border dark:border-ui-dark-border z-50 relative">
        <div className="p-4 border-b border-ui-border dark:border-ui-dark-border">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-dark">Source Code</h2>
        </div>
        <div className="p-4">
          <pre className="rounded-lg overflow-x-auto whitespace-pre-wrap bg-background-light dark:bg-background-darker">
            <code className="language-rust hljs">
              {algorithmData?.code || 'No code available'}
            </code>
          </pre>
        </div>
      </div>
    </PageLayout>
  );
}

export default AlgorithmCode;