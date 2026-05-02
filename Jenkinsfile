pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/kaifmohamad5543/3-tier-devops-project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
                sh 'sleep 20'
            }
        }

        stage('Automated Testing') {
            steps {
                sh 'curl -f http://localhost:5000'
                sh 'curl -f http://localhost:5000/students'
                sh '''
                curl -f -X POST http://localhost:5000/students \
                -H "Content-Type: application/json" \
                -d '{"name":"Jenkins Test","email":"jenkins@test.com","course":"DevOps","marks":85}'
                '''
                sh 'curl -f http://localhost:8000/analyze -H "Content-Type: application/json" -d \'{"marks":85}\''
            }
        }

        stage('Deployment Complete') {
            steps {
                echo 'Application successfully built, tested, and deployed on AWS EC2.'
            }
        }
    }
}
