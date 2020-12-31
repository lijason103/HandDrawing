from flask import Flask, render_template, jsonify, request
import time

app = Flask(__name__, static_folder='./static/build')

@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({ "msg": "hi" })

@app.route('/api/img', methods=["POST"])
def process_img():
    file = request.files['img']
    if (not file):
        return jsonify({ "msg": "failed" })
    print('Generating...')
    startTime = time.time()
    filestr = file.read()
    autoDraw = ImageProcess.AutoDraw(filestr, 4)
    drawingSteps = autoDraw.drawOutline()
    totalTime = time.time() - startTime
    print(f'Generating... Completed... {totalTime}')
    return jsonify({ 'steps': drawingSteps, 'time': totalTime })

@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def getApp(path):
    print('here')
    return app.send_static_file(path)

if __name__ == '__main__':
    import ImageProcess
    app.run(threaded=True, port=5000)
else:
    # For Prod
    from . import ImageProcess