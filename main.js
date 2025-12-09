// main.js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 1. 브라우저 창 생성
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // html에서 node 기능(require 등)을 쓸 수 있게 허용
      contextIsolation: false // 초보자용 설정 (보안상 나중엔 끄는 게 좋음)
    }
  })

  // 2. 아까 만든 html 파일 로드
  win.loadFile('index.html')
}

// 앱이 준비되면 창을 띄운다
app.whenReady().then(createWindow)