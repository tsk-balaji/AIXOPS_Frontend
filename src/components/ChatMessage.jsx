import React, { useState } from 'react';
import ChatTable from './ChatTable';
import ChatJson from './ChatJson';

export default function ChatMessage({ msg }) {
    const [isOutputExpanded, setIsOutputExpanded] = useState(false);
    const [isFraudExpanded, setIsFraudExpanded] = useState(false);

    if (msg.content.type === 'structured') {
        const { output, fraud_rule } = msg.content.content;
        return (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 p-4 text-center">
                <div className="card shadow-sm mb-2">
                    <button
                        className="btn btn-light d-flex align-items-center w-100 text-left"
                        onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                    >
                        <i className={`fas fa-chevron-right mr-2 ${isOutputExpanded ? 'rotate-90' : ''}`}></i>
                        <i className="fas fa-file-alt mr-2"></i>
                        <span>Explanation</span>
                    </button>
                    {isOutputExpanded && (
                        <div className="card-body pt-0">
                            <p className="card-text text-muted small">{output}</p>
                        </div>
                    )}
                </div>
                {fraud_rule && Object.keys(fraud_rule).length > 0 && (
                    <div className="card shadow-sm">
                        <button
                            className="btn btn-light d-flex align-items-center w-100 text-left"
                            onClick={() => setIsFraudExpanded(!isFraudExpanded)}
                        >
                            <i className={`fas fa-chevron-right mr-2 ${isFraudExpanded ? 'rotate-90' : ''}`}></i>
                            <i className="fas fa-code mr-2"></i>
                            <span>Elasticsearch Query</span>
                        </button>
                        {isFraudExpanded && (
                            <pre className="card-body bg-dark text-white rounded-bottom p-3 overflow-auto small mb-0">
                                {JSON.stringify(fraud_rule, null, 2)}
                            </pre>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`p-3 rounded mb-2 ${msg.sender === 'user' ? 'bg-primary text-white ml-auto rounded-br-0' : 'bg-light-gray text-dark mr-auto rounded-bl-0'}`} style={{ maxWidth: '75%' }}>

            {msg.content.text && <p className="mb-2">{msg.content.text}</p>}

            {msg.content.type === 'text' && msg.sender === 'user' && (
                <p className="mb-0">{msg.content.data}</p>
            )}

            {msg.content.data?.table_result && (
                <ChatTable data={msg.content.data.table_result} />
            )}

            {msg.content.data?.json_result && (
                <ChatJson data={msg.content.data.json_result} />
            )}
        </div>
    );
}