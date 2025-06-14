import React from 'react'
import {Editor} from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | undefined;
}
export default function MenuBar({editor}: MenuBarProps) {
  if (!editor) return null;
  
  return (
      <div className="menu-bar">
        <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}>
          Underline
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading(
                {level: 1}).run()}
            className={editor.isActive('heading', {level: 1}) ? 'is-active'
                : ''}
        >
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading(
            {level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active'
                    : ''}>
          H2
        </button>
        <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}>
          • List
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({textAlign: 'left'}) ? 'is-active' : ''}>
          ⬅ Left
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({textAlign: 'center'}) ? 'is-active'
                : ''}>
          ⬅➡ Center
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({textAlign: 'right'}) ? 'is-active'
                : ''}>
          ➡ Right
        </button>
      </div>
  )
}