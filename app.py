# app.py
from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
import io

app = Flask(__name__)
CORS(app)  # 일렉트론(다른 출처)에서 보내는 요청을 허용해주는 보안 설정

# 주문 받는 창구 (API 주소: http://localhost:5000/remove)
@app.route('/remove', methods=['POST'])
def remove_background():
    # 1. 일렉트론이 보낸 파일 받기
    if 'file' not in request.files:
        return '파일이 없습니다', 400
    
    file = request.files['file']
    input_image = file.read() # 이미지 데이터를 읽음

    # 2. 요리하기 (rembg로 배경 제거)
    output_image = remove(input_image)

    # 3. 완성된 요리(이미지) 돌려주기
    return send_file(
        io.BytesIO(output_image),
        mimetype='image/png'
    )

if __name__ == '__main__':
    print("주방 오픈! 주문 대기 중... (http://localhost:5000)")
    app.run(port=5000)