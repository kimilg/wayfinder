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
  readonly onCommandEnter?: () => void;
  readonly onEditorReady?: (editor: any) => void;
}

export default function TipTapEditor({onAnalyze, fullscreen = false, initialContent = '', onCommandEnter, onEditorReady}: TipTapEditorProp) {
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

  // 에디터가 준비되면 부모 컴포넌트에 전달
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Command+Enter 키보드 이벤트 처리
  useEffect(() => {
    if (!editor || !onCommandEnter) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Command+Enter (Mac) 또는 Ctrl+Enter (Windows) 감지
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        onCommandEnter();
      }
    };

    // 에디터 요소에 이벤트 리스너 추가
    const editorElement = editor.view.dom;
    editorElement.addEventListener('keydown', handleKeyDown);

    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, onCommandEnter]);

  // initialContent가 변경될 때 에디터 내용 업데이트 및 자동 스크롤
  useEffect(() => {
    if (editor && initialContent && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
      
      // 내용 업데이트 후 자동 스크롤
      setTimeout(() => {
        const editorElement = editor.view.dom;
        if (editorElement) {
          editorElement.scrollTop = editorElement.scrollHeight;
        }
      }, 100);
    }
  }, [editor, initialContent]);

  // 에디터 내용 변경 시 자동 스크롤
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const editorElement = editor.view.dom;
      if (editorElement) {
        // 약간의 지연을 두어 내용이 완전히 렌더링된 후 스크롤
        setTimeout(() => {
          editorElement.scrollTop = editorElement.scrollHeight;
        }, 50);
      }
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

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