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
                sh 'sleep 45'
                sh 'docker ps'
                sh 'docker logs backend_api --tail 30'
            }
        }

        stage('Automated Testing') {
            steps {
                sh 'curl -f http://localhost:5000'

                sh '''
                for i in 1 2 3 4 5 6; do
                  curl -f http://localhost:5000/students && break
                  echo "Waiting for MySQL/backend..."
                  sleep 10
                done
                '''

                sh '''
                curl -f -X POST http://localhost:5000/students \
                -H "Content-Type: application/json" \
                -d '{"name":"Jenkins Test","email":"jenkins@test.com","course":"DevOps","marks":85}'
                '''

                sh '''
                curl -f -X POST http://localhost:8000/analyze \
                -H "Content-Type: application/json" \
                -d '{"marks":85}'
                '''
            }
        }

        stage('Deployment Complete') {
            steps {
                echo 'Application successfully built, tested, and deployed on AWS EC2.'
            }
        }
    }
}
