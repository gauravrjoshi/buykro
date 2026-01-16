import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Code, Eye } from 'lucide-react';

export default function RichTextEditor({ value, onChange, placeholder = 'Enter description...' }) {
    const [mounted, setMounted] = useState(false);
    const [isHtmlMode, setIsHtmlMode] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'code', 'code-block'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'link', 'code', 'code-block'
    ];

    if (!mounted) {
        return (
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50 min-h-[150px]">
                <p className="text-gray-400 text-sm">Loading editor...</p>
            </div>
        );
    }

    return (
        <div className="rich-text-editor">
            {/* Toggle Button */}
            <div className="flex justify-end mb-2">
                <button
                    type="button"
                    onClick={() => setIsHtmlMode(!isHtmlMode)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                >
                    {isHtmlMode ? (
                        <>
                            <Eye size={14} />
                            Visual Editor
                        </>
                    ) : (
                        <>
                            <Code size={14} />
                            HTML Code
                        </>
                    )}
                </button>
            </div>

            {/* Editor */}
            {isHtmlMode ? (
                <div>
                    <textarea
                        className="block w-full border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm px-4 py-3 font-mono text-sm"
                        rows="12"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Paste or write HTML code here..."
                    />
                    <p className="text-xs text-gray-500 mt-2">HTML mode: You can paste and edit raw HTML code directly.</p>
                </div>
            ) : (
                <div>
                    <ReactQuill
                        theme="snow"
                        value={value || ''}
                        onChange={onChange}
                        modules={modules}
                        formats={formats}
                        placeholder={placeholder}
                        className="bg-white rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">Visual mode: Use the toolbar to format your content.</p>
                </div>
            )}
        </div>
    );
}
