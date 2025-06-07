import {useState} from "react";

export default function TagInput({tags, setTags}) {
  const MAX_TAGS = 10
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
  
  return (
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
        <div className="flex flex-wrap gap-2 mt-2 mb-2 w-full">
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
  );
}