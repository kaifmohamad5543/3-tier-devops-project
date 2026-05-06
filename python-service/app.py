from flask import Flask, request, jsonify

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return "🚀 Python Microservice Running"

# Health Check API
@app.route("/health")
def health():
    return jsonify({
        "status": "Python service healthy",
        "service": "Flask Microservice",
        "port": 8000
    })

# Analyze Student Marks
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json

        if not data or "marks" not in data:
            return jsonify({
                "message": "Marks field is required"
            }), 400

        marks = int(data["marks"])

        if marks >= 80:
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
            "marks": marks,
            "grade": grade,
            "status": status
        })

    except Exception as e:
        return jsonify({
            "message": "Error processing marks",
            "error": str(e)
        }), 500

# Run Flask App
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
