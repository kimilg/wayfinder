/**
 * 파일명: WriteWithAI.tsx
 * 목적: AI와 함께 글을 쓰는 공간 제공
 * 역할: 사용자가 AI의 도움을 받아 글을 작성할 수 있는 페이지
 * 작성일: 2024-12-19
 */

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TipTapEditor from "../components/TipTapEditor";

/**
 * WriteWithAI: AI와 함께 글을 쓰는 페이지 컴포넌트
 * @returns {JSX.Element} AI 글쓰기 페이지
 */
function WriteWithAI() {
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasLoaded = useRef<boolean>(false);

  /**
   * handleAnalyze: AI 글쓰기에서는 감정 분석 기능을 사용하지 않으므로 빈 함수로 처리
   * @param {string} text - 분석할 텍스트 (사용하지 않음)
   */
  const handleAnalyze = (text: string) => {
    // AI 글쓰기에서는 감정 분석 기능을 사용하지 않음
    console.log('AI 글쓰기 모드에서는 감정 분석 기능이 비활성화되어 있습니다.');
  };

  /**
   * loadAiQuestion: AI 질문을 백엔드에서 가져오는 함수
   */
  const loadAiQuestion = async () => {
    // 이미 로드된 경우 중복 호출 방지
    if (hasLoaded.current) {
      return;
    }

    try {
      setIsLoading(true);
      hasLoaded.current = true;
      console.log('AI 질문 API 호출 중...');
      const response = await axios.get('http://localhost:8080/ai/question');
      console.log('AI 질문 응답:', response.data);
      setAiQuestion(response.data);
    } catch (error) {
      console.error('AI 질문을 가져오는데 실패했습니다:', error);
      setAiQuestion("오늘 어떤 일이 있었어?"); // 기본 질문으로 대체
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * useEffect: 컴포넌트 마운트 시 AI 질문 로드 (한 번만 실행)
   */
  useEffect(() => {
    console.log('useEffect 실행됨');
    loadAiQuestion();
  }, []); // 빈 의존성 배열로 한 번만 실행

  // AI 질문이 로드되면 에디터 내용 생성
  const editorContent = aiQuestion ? `AI: ${aiQuestion}\n\n` : '';
  console.log('에디터 내용:', editorContent);

  return (
    <div className="h-screen bg-white font-sans">
      <div className="p-2">
        <h1 className="text-xl font-bold mb-2">AI 질문 공세</h1>
        {isLoading && (
          <p className="text-gray-600 text-sm">AI가 질문을 생각하고 있어요...</p>
        )}
      </div>
      <TipTapEditor 
        onAnalyze={handleAnalyze} 
        fullscreen={true} 
        initialContent={editorContent} 
      />
    </div>
  );
}

export default WriteWithAI;
