import React, { useEffect, useState } from "react";
import ExplorerTable from "components/ExplorerTable";
import axios from "axios";
import { getFolderChild } from "utils/folders";

function Explorer() {
  const [folderStructure, setFolderStructure] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderStack, setFolderStack] = useState([]);

  useEffect(() => {
    axios.get("/folderStructure.json").then((res) => {
      const data = res.data;
      setFolderStructure(data.fileMap);
      setSelectedFolder(data.rootFolderId);
      setFolderStack([data.rootFolderId]);
    });
  }, []);

  const handleSelectBreadcrumb = (id) => {
    const temp = [...folderStack];
    const idx = temp.indexOf(id);
    temp.splice(idx + 1, temp.length - (idx + 1));
    setFolderStack(temp);
    setSelectedFolder(temp[temp.length - 1]);
  };

  return (
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
      <div className="relative flex px-4 py-3 mb-0 border-0 rounded-t">
        {folderStack.map((dir) => {
          return (
            <div
              key={dir}
              onClick={() => handleSelectBreadcrumb(dir)}
              className="flex items-center cursor-pointer"
            >
              {getFolderChild(folderStructure, dir)?.name}
              <span className="px-2 text-lg">
                <i className="fas fa-angle-right"></i>
              </span>
            </div>
          );
        })}
      </div>
      <ExplorerTable
        folderStructure={folderStructure}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        folderStack={folderStack}
        setFolderStack={setFolderStack}
      />
    </div>
  );
}

export default Explorer;
