import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// text layer의 위치를 잡아줌. 즉, OCR 적용된 것 처럼 만들어줌.
import "react-pdf/dist/Page/TextLayer.css";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewerContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  color: black;
  font-size: 2.5rem;

  figure {
    margin: 0 auto;
    width: fit-content;
  }
`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <PdfViewerContainer>
      <figure className="absolute inset-0 w-fit h-full">
        <Document
          file="../../../../public/1.report.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </figure>
    </PdfViewerContainer>
  );
};

export default PdfViewer;
