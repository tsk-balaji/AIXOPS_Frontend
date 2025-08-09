import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatJson({ data }) {
    return (
        <div className="aixops-chat-json">
            <SyntaxHighlighter language="json" style={vscDarkPlus}>
                {JSON.stringify(data, null, 2)}
            </SyntaxHighlighter>
        </div>
    );
}