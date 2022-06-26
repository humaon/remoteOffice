import React from "react";

function PDFViewer() {
  return (
    <div className="relative">
      <embed
        src={"/sample.pdf"}
        type="application/pdf"
        height={800}
        width={"100%"}
      />
    </div>
  );
}

export default PDFViewer;
