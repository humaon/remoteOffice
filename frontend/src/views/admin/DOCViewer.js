import React from "react";

function DOCViewer() {
  const file_url = "https://filesamples.com/samples/document/docx/sample4.docx";

  return (
    <div className="relative">
      <iframe
        title="Doc file viewer"
        width="100%"
        height="600"
        frameborder="0"
        src={`https://docs.google.com/gview?url=${file_url}&embedded=true`}
      ></iframe>
    </div>
  );
}

export default DOCViewer;
