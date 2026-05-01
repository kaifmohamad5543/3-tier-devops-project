from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Python service is running 🚀"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    marks = int(data.get("marks", 0))

    if marks >= 70:
        grade = "Distinction"
        status = "Passed"
    elif marks >= 60:
        grade = "Merit"
        status = "Passed"
    elif marks >= 40:
        grade = "Pass"
        status = "Passed"
    else:
        grade = "Fail"
        status = "Failed"

    return jsonify({
        "grade": grade,
        "status": status
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)