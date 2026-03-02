pipeline {
    agent any

    tools {
        maven 'Maven 3.x'   // Must match Jenkins Global Tool Configuration name
        jdk 'Java 17'       // Must match Jenkins Global Tool Configuration name
    }

    environment {
        // ✅ CHANGE THIS to your DockerHub username
        DOCKER_IMAGE   = "YOUR_DOCKERHUB_USERNAME/sci-calc"
        DOCKER_TAG     = "latest"

        // ✅ Jenkins Credentials ID for DockerHub (Username/Password or Token)
        DOCKERHUB_CREDS = "dockerhub-creds"

        // ✅ If pom.xml is in repo root, set APP_DIR="."
        APP_DIR = "calculator-backend"

        // ✅ Where your Dockerfile is (repo root usually)
        DOCKER_CONTEXT = "."
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build & Test (Maven)') {
            steps {
                dir("${APP_DIR}") {
                    echo 'Running tests...'
                    sh 'mvn -q clean test'

                    echo 'Packaging jar...'
                    sh 'mvn -q package'
                    sh 'ls -la target || true'
                }
            }
            post {
                success { echo 'Build and Tests passed!' }
                failure { echo 'Build or Tests failed.' }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh 'docker --version'
                sh 'docker buildx build --load -t $DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('Docker Push') {
            steps {
                echo "Pushing Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}",
                                                 usernameVariable: 'DU',
                                                 passwordVariable: 'DP')]) {
                    sh '''
                        echo "$DP" | docker login -u "$DU" --password-stdin
                        docker push $DOCKER_IMAGE:$DOCKER_TAG
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy (Ansible)') {
            steps {
                echo "Deploying via Ansible..."
                // expects: ansible/inventory.ini and ansible/deploy.yml in your repo
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
            sh 'docker image ls | head -n 20 || true'
        }
        success { echo '✅ CI/CD completed successfully!' }
        failure { echo '❌ Pipeline failed. Check Console Output.' }
    }
}