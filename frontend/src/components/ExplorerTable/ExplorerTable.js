import React, { useState } from "react";
import PropTypes from "prop-types";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { getFolderChild } from "utils/folders";
import { getSortedFolderChild } from "utils/folders";
import { useHistory } from "react-router-dom";

// Dum components

export default function ExplorerTable({
  color,
  folderStructure,
  selectedFolder,
  setSelectedFolder,
  folderStack,
  setFolderStack,
}) {
  const history = useHistory();
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Name
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Uploaded By
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Deadline
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Seen By
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            >
              Upload Date
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
              }
            ></th>
          </tr>
        </thead>
        <tbody>
          {getSortedFolderChild(
            folderStructure,
            folderStructure?.[selectedFolder]?.childrenIds
          )?.map((id) => {
            const child = getFolderChild(folderStructure, id);
            return (
              <tr key={child?.id}>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={
                      child?.isDir
                        ? require("assets/img/folder.png").default
                        : require("assets/img/doc.png").default
                    }
                    className="w-12 h-12 bg-white border"
                    alt="..."
                  ></img>{" "}
                  <span
                    onClick={() => {
                      if (child?.isDir) {
                        setSelectedFolder(child.id);
                        setFolderStack([...folderStack, child.id]);
                      } else {
                        history.push("/admin/viewer");
                      }
                    }}
                    className={
                      "ml-3 font-bold cursor-pointer " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {child?.name}
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  {child?.uploaded_by_user_name ?? "Admin"}
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 text-teal-500 fas fa-circle"></i>
                  {child?.modDate}
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex">
                    <img
                      src={require("assets/img/team-1-800x800.jpg").default}
                      alt="..."
                      className="w-10 h-10 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={require("assets/img/team-2-800x800.jpg").default}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={require("assets/img/team-3-800x800.jpg").default}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={require("assets/img/team-4-470x470.png").default}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{child?.modDate}</span>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ExplorerTable.defaultProps = {
  color: "light",
};

ExplorerTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
