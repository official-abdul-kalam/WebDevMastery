'use client';

import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, value, onChange }) {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={value}
                onChange={onChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'Fira Code',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                    suggest: {
                        showWords: false,
                    },
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    autoClosingTags: true,
                    autoClosingQuotes: 'always',
                    autoClosingBrackets: 'always',
                    autoSurround: 'languageDefined',
                }}
            />
        </div>
    );
}
