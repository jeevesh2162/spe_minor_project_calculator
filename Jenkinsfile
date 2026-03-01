pipeline {
    agent any

    tools {
        maven 'Maven 3.x' // Must match the name in Jenkins Global Tool Configuration
        jdk 'Java 17'     // Must match the name in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git (Jenkins will handle this automatically if configured)
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Backend: Build & Test') {
            steps {
                dir('calculator-backend') {
                    echo 'Building Backend...'
                    sh 'mvn clean package'
                    echo 'Running Backend Tests...'
                    sh 'mvn test'
                }
            }
            post {
                success {
                    echo 'Backend Build and Tests passed!'
                }
                failure {
                    echo 'Backend Build or Tests failed.'
                }
            }
        }

        stage('Frontend: Build') {
            steps {
                dir('calculator-frontend') {
                    echo 'Installing Frontend Dependencies...'
                    sh 'npm install'
                    echo 'Building Frontend...'
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
