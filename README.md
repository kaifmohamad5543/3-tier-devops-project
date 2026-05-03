# 🚀 3-Tier DevOps Microservices Web Application

## 📌 Project Overview
This project demonstrates a **3-tier architecture** using modern DevOps tools. It includes a frontend, backend, Python microservice, and MySQL database, all containerised with Docker and deployed using Jenkins CI/CD on AWS EC2.

---

## 🏗️ Architecture

Frontend → Backend → Python Microservice → MySQL Database

- **Frontend**: HTML, CSS, JS (Nginx)
- **Backend**: Node.js (Express API)
- **Microservice**: Python (Flask – grading system)
- **Database**: MySQL
- **Tools**: Docker, Docker Compose, Jenkins
- **Cloud**: AWS EC2

---

## ⚙️ Features

- ✅ 3-tier architecture
- ✅ Microservice communication (Node.js ↔ Python)
- ✅ CI/CD pipeline using Jenkins
- ✅ Automated API testing (curl)
- ✅ Docker containerisation
- ✅ Monitoring & logging using Docker + Jenkins

---

## 🚀 How to Run

```bash
git clone https://github.com/kaifmohamad5543/3-tier-devops-project.git
cd 3-tier-devops-project
docker compose up --build -d
