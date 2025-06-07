import {useState} from "react";
import axios from "axios";
import TipTapEditorWithTags from "../components/TipTapEditorWithTags.jsx";

function Write() {
  const [tags, setTags] = useState([]);
  
  const analyzeEmotion = async (text) => {
    try {
      const response = await axios.post('http://localhost:8080/tags', {
        text: text
      });
      setTags(response.data.tags); // 예상 응답: ["sad", "frustrated"]
    } catch (err) {
      console.error(err);
      alert('감정 분석에 실패했습니다.');
    }
  };

  const submitDocument = async ({title, html, tags}) => {
    try {
      console.log('title: ', title);
      console.log(html);
      console.log('tags: ', tags);
      
      const response = await axios.post('http://localhost:8080/document/html', {
        title: title,
        tagNames: tags,
        html: html
      });
      console.log('document id:', response.data.id, ' saved.')
    } catch (err) {
      console.error(err);
      alert('html 문서 저장에 실패했습니다.');
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 p-10 font-sans">
        <h2 className="text-2xl font-bold mb-4">감정 분석기</h2>

        <TipTapEditorWithTags onAnalyze={analyzeEmotion} onSubmit={submitDocument}/>

        {tags.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">분석된 감정 태그</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
              #{tag}
            </span>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}

export default Write