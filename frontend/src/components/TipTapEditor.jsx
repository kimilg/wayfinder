import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import MenuBar from './MenuBar'
import './TipTapEditor.css';

export default function TipTapEditor({onAnalyze}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: {levels: [1, 2]},
      paragraph: true,
    }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: '',
  });

  const handleAnalyze = () => {
    const plainText = editor?.getText();
    if (plainText?.trim()) {
      onAnalyze(plainText);
    }
  };

  return (
      <div className="p-4 border border-gray-300 rounded bg-white">
        {editor &&
            <div className="editor-wrapper">
              <MenuBar editor={editor}/>
              <EditorContent 
                editor={editor} 
                className="min-h-[150px] bg-yellow-50 p-2 outline-none " />
            </div>
        }
        <button
            onClick={handleAnalyze}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          감정 분석하기
        </button>
      </div>
  );
}