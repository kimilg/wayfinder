import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import MenuBar from './MenuBar.js'
import './TipTapEditor.css';
import TagInput from "./TagInput";
import {useEffect, useState} from "react";
import {SubmitPayload} from "../types/document";

interface TipTapEditorWithTagsProps {
  readonly onAnalyze: (text: string) => void;
  readonly onSubmit: (payload: SubmitPayload) => void;
}

export default function TipTapEditorWithTags({onAnalyze, onSubmit}: TipTapEditorWithTagsProps) {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    console.log('현재 tags:', tags);
  }, [tags, title]);
  
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
    content: '',
  });

  const handleSubmit = () => {
    const html = editor?.getHTML()
    console.log("html content: ", html);
    if (!isValid()) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }
    onSubmit({ title, html: html ?? '', tags })
  }

  const handleAnalyze = () => {
    const plainText = editor?.getText();
    if (plainText?.trim()) {
      onAnalyze(plainText);
    }
  };
  
  const isValid = () => {
    const html = editor?.getHTML()
    return title.trim() !== '' && tags.length > 0 && (html && html.trim()) !== '';
  } 

  return (
      <div className="p-4 border border-gray-300 rounded bg-white">
        {editor &&
            <>
              <div className="editor-wrapper">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TagInput tags={tags} setTags={setTags}/>
                <MenuBar editor={editor}/>
                <EditorContent
                    editor={editor}
                    className="min-h-[150px] bg-yellow-50 p-2 outline-none "/>
              </div>
            </>
        }
        <button onClick={handleSubmit}
                disabled={!isValid()}
                className={`px-4 py-2 text-white rounded ${
                  isValid()
                    ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}>
          제출
        </button>
        <button
            onClick={handleAnalyze}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          감정 분석하기
        </button>
        {/*<pre>{JSON.stringify({ content: editor?.getHTML(), tags }, null, 2)}</pre>*/}
      </div>
  );
}