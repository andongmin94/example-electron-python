// renderer.js

const fileInput = document.getElementById('imageInput');
const resultImage = document.getElementById('resultImage');

// 사용자가 파일을 선택하면 실행
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 1. 보낼 데이터 포장하기 (FormData)
    const formData = new FormData();
    formData.append('file', file);

    try {
        console.log("주방(Python)으로 주문 전송 중...");

        // 2. 파이썬 서버로 전송 (Fetch API 사용)
        const response = await fetch('http://localhost:5000/remove', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('서버 에러 발생!');

        // 3. 파이썬이 보내준 이미지 받기 (Blob 형태)
        const blob = await response.blob();
        
        // 4. 받은 이미지를 화면에 표시하기
        const imageUrl = URL.createObjectURL(blob);
        resultImage.src = imageUrl;
        
        console.log("완성된 이미지 도착!");

    } catch (error) {
        console.error("에러 발생:", error);
        alert("배경 제거 실패! 파이썬 서버가 켜져 있는지 확인하세요.");
    }
});