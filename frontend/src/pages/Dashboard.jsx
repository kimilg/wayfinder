import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">🌿 감정 기반 활동 대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div
              onClick={() => navigate('/recommend')}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">지금 내 기분에 맞는 추천</h2>
            <p className="text-gray-600">기분을 입력하면, 할만한 일을 추천해줄게요.</p>
          </div>
          <div
              onClick={() => navigate('/write')}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">감정 태그 기반 기록</h2>
            <p className="text-gray-600">"슬픔" 같은 태그에 어울리는 활동을 직접 작성해보세요.</p>
          </div>
        </div>
      </div>
  )
}