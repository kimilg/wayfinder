import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import MenuBar from './MenuBar.js'
import './TipTapEditor.css';
import { useEffect } from 'react';

interface TipTapEditorProp {
  readonly onAnalyze: (text: string) => void;
  readonly fullscreen?: boolean;
  readonly initialContent?: string;
}

export default function TipTapEditor({onAnalyze, fullscreen = false, initialContent = ''}: TipTapEditorProp) {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: {levels: [1, 2]},
      paragraph: {},
    }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content: initialContent,
  });

  // initialContent가 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (editor && initialContent && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const handleAnalyze = () => {
    const plainText = editor?.getText();
    if (plainText?.trim()) {
      onAnalyze(plainText);
    }
  };

  return (
      <div className={`${fullscreen ? 'h-screen' : 'p-4 border border-gray-300 rounded bg-white'}`}>
        {editor &&
            <div className={`editor-wrapper ${fullscreen ? 'fullscreen' : ''}`}>
              <MenuBar editor={editor}/>
              <EditorContent 
                editor={editor} 
                className={`${fullscreen ? 'flex-1' : 'min-h-[150px] bg-yellow-50 p-2'} outline-none`} />
            </div>
        }
        {!fullscreen && (
          <button
              onClick={handleAnalyze}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            감정 분석하기
          </button>
        )}
      </div>
  );
}