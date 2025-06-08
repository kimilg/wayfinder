import {useEffect, useState} from "react";
import axios from "axios";
import {Document, PagedResponse} from "../types/document";
import Pagination from "../components/common/Pagination";

export default function List() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 5;
  
  useEffect(() => {
    axios.get<PagedResponse<Document>>(`http://localhost:8080/document/html?page=${page}&size=${size}`)
      .then((res) => {
        setDocuments(res.data.content);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages)
      })
      .catch(console.error);
    console.log('length: ', documents.length)
    
  }, [page]);
  
  const onPageChange = (p: number) => {
    console.log("page to : ", p);
    if (p >= 0 && p < totalPages)
      setPage(p);
  }
  
  return (
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">글 목록</h2>
        <ul className="p-4 w-[800px] bg-white border rounded">
          {documents?.map((document) => (
              <li key={document.id}
                  className="flex p-2 border-b rounded shadow hover:bg-gray-50">
                <span className="w-16 text-gray-500">{document.id}</span>
                <span className="w-64 text-left font-semibold truncate">{document.title}</span>
                <span className="w-[200px] overflow-hidden whitespace-nowrap flex items-center">
                  {document.emotionTagNames.map((tag) => (
                      <span key={tag}
                            className="text-xs max-w-[80px] truncate break-all px-2 py-1 bg-blue-100 rounded mr-1 shrink-0 inline-block leading-tight h-[24px] overflow-hidden">
                        {tag}
                      </span>
                  ))}
                </span>
                <span className="w-[200px] truncate text-left px-10 text-sm text-gray-700">
                  {stripHtml(document.htmlContent).slice(0, 100)}...
                </span>
              </li>
          ))}
        </ul>

        <Pagination page={page} 
                    totalPages={totalPages} 
                    onPageChange={onPageChange} 
        />
      </div>
  );
}

function stripHtml(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}