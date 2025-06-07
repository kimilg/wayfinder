import {useEffect, useState} from "react";
import axios from "axios";
import {Document, PagedResponse} from "../types/document";

export default function List() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    axios.get<PagedResponse<Document>>(`document/html?page=${page}&size=10`)
      .then((res) => setDocuments(res.data.content))
      .catch(console.error)
  }, [page]);
  
  return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">글 목록</h2>
        <ul className="space-y-4">
          {documents.map((document) => (
              <li key={document.id}
                  className="p-4 border rounded shadow hover:bg-gray-50">
                <h3 className="text-lg font-semibold">{document.title}</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  {document.emotionTagNames.map((tag) => (
                      <span key={tag}
                            className="text-xs px-2 py-1 bg-blue-100 rounded">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  {stripHtml(document.htmlContent).slice(0, 100)}...
                </p>
              </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))}>이전</button>
          <button onClick={() => setPage((p) => p + 1)}>다음</button>
        </div>
      </div>
  );
}

function stripHtml(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}