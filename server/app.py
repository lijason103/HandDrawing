from flask import Flask, render_template, jsonify, request, make_response
import time
from . import ImageProcess

app = Flask(__name__, static_folder='./static/build')

@app.route("/api/preview", methods=["POST"])
def preview():
    blurLevel = int(request.form['blur_level'])
    cannyThresholdLevel = int(request.form['canny_threshold_level'])
    file = request.files['img']
    if (not file):
        return jsonify({ "error": "Missing img file or blur level" })
    
    filestr = file.read()
    encodedDrawing = ImageProcess.getPreview(filestr, blurLevel, cannyThresholdLevel)
    encodedBytes = encodedDrawing.tobytes()
    response = make_response(encodedBytes)
    response.headers.set('Content-Type', 'image/jpeg')
    return response

@app.route('/api/img', methods=["POST"])
def process_img():
    blurLevel = int(request.form['blur_level'])
    cannyThresholdLevel = int(request.form['canny_threshold_level'])
    file = request.files['img']
    if (not file):
        return jsonify({ "error": "Missing img file" })

    startTime = time.time()
    filestr = file.read()
    autoDraw = ImageProcess.AutoDraw(filestr, blurLevel, cannyThresholdLevel)
    drawingSteps = autoDraw.drawOutline()
    totalTime = time.time() - startTime
    return jsonify({ 'steps': drawingSteps, 'time': totalTime })

@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def getApp(path):
    return app.send_static_file(path)

# if __name__ == '__main__':
#     import ImageProcess
#     app.run(threaded=True, port=5000)
# else:
#     # For Prod
#     from . import ImageProcess