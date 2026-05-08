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
                sh '''
                    docker compose down
                    docker compose up -d database
                    echo "Waiting for MySQL..."
                    sleep 40
                    docker compose up -d python-service backend frontend
                    sleep 25
                    docker ps
                    docker logs backend_api --tail 30
                '''
            }
        }

        stage('Automated Testing') {
            steps {
                sh '''
                    curl -f http://localhost:5000

                    for i in 1 2 3 4 5 6; do
                      if curl -f http://localhost:5000/students; then
                        break
                      fi
                      echo "Waiting for backend/database..."
                      sleep 10
                    done

                    curl -f http://localhost:5000/health

                    curl -f -X POST http://localhost:5000/students \
                      -H "Content-Type: application/json" \
                      -d '{"name":"Jenkins Test","email":"jenkins@test.com","course":"DevOps","marks":85}'

                    curl -f -X POST http://localhost:8000/analyze \
                      -H "Content-Type: application/json" \
                      -d '{"marks":85}'

                    curl -f http://localhost:8000/health
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
