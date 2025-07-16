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
  const [isGeneratingNewQuestion, setIsGeneratingNewQuestion] = useState<boolean>(false);
  const hasLoaded = useRef<boolean>(false);
  const editorInstance = useRef<any>(null);

  /**
   * handleAnalyze: AI 글쓰기에서는 감정 분석 기능을 사용하지 않으므로 빈 함수로 처리
   * @param {string} text - 분석할 텍스트 (사용하지 않음)
   */
  const handleAnalyze = (text: string) => {
    // AI 글쓰기에서는 감정 분석 기능을 사용하지 않음
    console.log('AI 글쓰기 모드에서는 감정 분석 기능이 비활성화되어 있습니다.');
  };

  /**
   * handleEditorReady: 에디터가 준비되면 인스턴스를 저장
   * @param {any} editor - TipTap 에디터 인스턴스
   */
  const handleEditorReady = (editor: any) => {
    editorInstance.current = editor;
  };

  /**
   * scrollToBottom: 에디터를 맨 아래로 스크롤하는 함수
   */
  const scrollToBottom = () => {
    if (editorInstance.current) {
      const editorElement = editorInstance.current.view.dom;
      if (editorElement) {
        setTimeout(() => {
          editorElement.scrollTop = editorElement.scrollHeight;
        }, 100);
      }
    }
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
   * handleCommandEnter: Command+Enter 이벤트 처리 - 문맥 기반 AI 질문 생성
   */
  const handleCommandEnter = async () => {
    if (isGeneratingNewQuestion || !editorInstance.current) return; // 이미 생성 중이거나 에디터가 없으면 중복 호출 방지

    try {
      setIsGeneratingNewQuestion(true);
      console.log('문맥 기반 AI 질문 생성 중...');
      
      // 현재 에디터의 전체 HTML 내용 가져오기
      const currentContent = editorInstance.current.getHTML();
      console.log('현재 에디터 내용:', currentContent);

      // 문맥 기반 질문 API 호출
      const response = await axios.post('http://localhost:8080/ai/context-question', {
        content: currentContent
      });
      
      const newQuestion = response.data;
      console.log('문맥 기반 AI 질문:', newQuestion);

      // 현재 에디터 내용에 새로운 질문 추가
      const newContent = currentContent + `<p><strong>AI:</strong> ${newQuestion}</p><p></p>`;
      
      // 에디터 내용 업데이트
      editorInstance.current.commands.setContent(newContent);
      
      // AI 질문 추가 후 자동 스크롤
      scrollToBottom();
    } catch (error) {
      console.error('문맥 기반 AI 질문을 가져오는데 실패했습니다:', error);
    } finally {
      setIsGeneratingNewQuestion(false);
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
  const editorContent = aiQuestion ? `<p><strong>AI:</strong> ${aiQuestion}</p><p></p>` : '';
  console.log('에디터 내용:', editorContent);

  return (
    <div className="h-screen bg-white font-sans">
      <div className="p-2">
        <h1 className="text-xl font-bold mb-2">AI 질문 공세</h1>
        {isLoading && (
          <p className="text-gray-600 text-sm">AI가 질문을 생각하고 있어요...</p>
        )}
        {isGeneratingNewQuestion && (
          <p className="text-gray-600 text-sm">AI가 문맥에 맞는 질문을 생각하고 있어요...</p>
        )}
      </div>
      <TipTapEditor 
        onAnalyze={handleAnalyze} 
        fullscreen={true} 
        initialContent={editorContent}
        onCommandEnter={handleCommandEnter}
        onEditorReady={handleEditorReady}
      />
    </div>
  );
}

export default WriteWithAI;
