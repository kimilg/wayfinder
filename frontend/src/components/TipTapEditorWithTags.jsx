import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import MenuBar from './MenuBar'
import './TipTapEditor.css';
import {useState} from "react";

export default function TipTapEditorWithTags({onAnalyze}) {
  const MAX_TAGS = 10
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

  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleTagAdd = (rawValue) => {
    const value = rawValue.trim()
    if (value && !tags.includes(value)) {
      if (tags.length >= MAX_TAGS) {
        alert(`태그는 최대 ${MAX_TAGS}개까지 입력할 수 있어요.`)
        return
      }
      setTags([...tags, value])
    }
    setInputValue('')
  }

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAnalyze = () => {
    const plainText = editor?.getText();
    if (plainText?.trim()) {
      onAnalyze(plainText);
    }
  };

  return (
      <div className="p-4 border border-gray-300 rounded bg-white">
        {editor &&
            <>
              <div className="editor-wrapper">
                <MenuBar editor={editor}/>
                <EditorContent 
                  editor={editor} 
                  className="min-h-[150px] bg-yellow-50 p-2 outline-none " />
              </div>
              <div className="mt-4">
                <div className="flex gap-2 w-full">
                  <input
                      type="text"
                      placeholder="태그 입력 후 Enter"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleTagAdd(e.target.value)
                        }
                      }}
                      className="border p-1 rounded w-full"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2 w-full">
                  {tags.map((tag) => (
                      <button
                          key={tag}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm hover:text-red-700 cursor-pointer"
                          onClick={() => handleTagRemove(tag)}
                      >
                        {tag} ✕
                      </button>
                  ))}
                </div>
              </div>
            </>
        }
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