export function getFolderChild(folders, id) {
  return folders[id];
}

export function getSortedFolderChild(folders, children) {
  if (!folders || !children) return null;
  if (children.length <= 0) return [];

  return children.sort(function (x, y) {
    return folders[x]?.isDir === folders[y]?.isDir
      ? 0
      : folders[x]?.isDir
      ? -1
      : 1;
  });
}
