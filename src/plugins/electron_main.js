const {  ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// 处理目录选择
ipcMain.handle('dialog:selectDirectory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

// 处理加载文件夹结构的请求
ipcMain.handle('fs:loadFolderStructure', async (event, directoryPath) => {
  function getFolderStructure(dir) {
    const structure = { folders: [], files: [] };
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        structure.folders.push({
          name: file,
          path: filePath,
          content: getFolderStructure(filePath) // 递归处理子文件夹
        });
      } else {
        structure.files.push({
          name: file,
          path: filePath
        });
      }
    });
    return structure;
  }

  return getFolderStructure(directoryPath);
});

// 处理文件内容读取
ipcMain.handle('fs:loadFileContent', async (event, filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Failed to load file content:', error);
    throw error;
  }
});
