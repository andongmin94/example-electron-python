const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn, execSync } = require('child_process') // 1. 프로세스 실행 도구 불러오기

let mainWindow
let pyProc = null

// 2. 파이썬 서버 실행 함수
function createPyProc() {
  if (pyProc != null) {
    console.log('python server is already running')
    return
  }

  let script = path.join(__dirname, 'dist/app.exe') // 같은 폴더에 있는 app.exe 경로
  
  // 개발 모드일 때와 배포 모드일 때 경로가 조금 다릅니다. (일단은 배포 기준 단순화)
  console.log("start python server : " + script)
  
  pyProc = spawn(script) // 실행!

  if (pyProc != null) {
    console.log('python server started successfully. PID: ' + pyProc.pid)
  }
}

// 3. 파이썬 서버 종료 함수 (앱 끌 때 같이 꺼야 함)
function exitPyProc() {
  if (pyProc != null) {
    console.log('Killing python server...')
    if (process.platform === 'win32') {
      try {
        execSync('taskkill /pid ' + pyProc.pid + ' /T /F')
        console.log('Python server killed successfully')
      } catch (e) {
        console.log('Failed to kill python server (maybe already dead): ' + e.message)
      }
    } else {
      pyProc.kill()
    }
    pyProc = null
    console.log('python server exited')
  }
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('index.html')
}

// 앱이 준비되면
app.whenReady().then(() => {
  createPyProc() // 파이썬 켜고
  createWindow() // 창 띄운다
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 앱이 종료될 때
app.on('will-quit', exitPyProc) // 파이썬도 같이 끈다