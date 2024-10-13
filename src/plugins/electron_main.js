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
    const folders = [];
    const files = [];
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      const filetype = file.split('.').pop();

      if (stats.isDirectory()) {
        folders.push({
          title: file,
          path: filePath,
          children: [],
        });
      } else {
        files.push({
          title: file,
          filetype: filetype,
          path: filePath,
        });
      }
    });
    return [...folders, ...files];
  }

  return getFolderStructure(directoryPath);
});

// 处理文件内容读取
ipcMain.handle('fs:loadFileContent', async (event, filePath) => {
  console.log('ELEPATH:', filePath);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Failed to load file content:', error);
    throw error;
  }
});
