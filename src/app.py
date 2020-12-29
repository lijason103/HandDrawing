from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/img', methods=["POST"])
def process_img():
    file = request.files['img']
    if (not file):
        return jsonify({ "msg": "failed" })
    print('Generating...')
    filestr = file.read()
    autoDraw = ImageProcess.AutoDraw(filestr, 4)
    commands = autoDraw.drawOutline()
    print("Generating... Completed")
    return jsonify({ 'msg': "success", 'data': commands })

if __name__ == '__main__':
    import ImageProcess
    app.run(threaded=True, port=5000)
else:
    # For Prod
    from . import ImageProcess