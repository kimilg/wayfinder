import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeEmotion = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/emotion/analyze', {
        text: text
      });
      setTags(response.data); // 예상 응답: ["sad", "frustrated"]
    } catch (err) {
      console.error(err);
      alert('감정 분석에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h2>감정 분석기</h2>
        <textarea
            placeholder="당신의 감정을 입력하세요..."
            rows={5}
            cols={50}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button onClick={analyzeEmotion} disabled={loading}>
          {loading ? '분석 중...' : '감정 분석하기'}
        </button>

        {tags.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>분석된 감정 태그</h4>
              <ul>
                {tags.map((tag, i) => (
                    <li key={i}>#{tag}</li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
}

export default App
