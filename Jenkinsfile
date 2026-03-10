pipeline {
    agent any

    tools {
        maven 'Maven 3.x'   // Must match Jenkins Global Tool Configuration name
        jdk 'Java 17'       // Must match Jenkins Global Tool Configuration name
    }

    environment {
        DOCKER_IMAGE   = "jeevesh2802/sci-calc"
        DOCKER_TAG     = "latest"
        DOCKERHUB_CREDS = "dockerhub-creds"
        APP_DIR = "calculator-backend"
        DOCKER_BUILD_CONTEXT = "."
        NOTIFICATION_EMAIL = "jeeveshvwandra@gmail.com"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Unit Test (Standalone)') {
            steps {
                echo 'Running standalone Java test...'
                sh 'javac test/Main.java'
                sh 'java -ea -cp test Main'
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

                sh '''
                    set -eux
                    docker --version
                    # Avoid buildx/builder issues inside Jenkins container
                    export DOCKER_BUILDKIT=0
                    docker build -t "$DOCKER_IMAGE:$DOCKER_TAG" "$DOCKER_BUILD_CONTEXT"
                '''
            }
        }

        stage('Docker Push') {
            steps {
                echo "Pushing Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}",
                                                 usernameVariable: 'DU',
                                                 passwordVariable: 'DP')]) {
                    sh '''
                        set -eux
                        echo "$DP" | docker login -u "$DU" --password-stdin
                        docker push "$DOCKER_IMAGE:$DOCKER_TAG"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy (Ansible)') {
            steps {
                echo "Deploying via Ansible..."
                sh 'ansible --version'
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
            sh '''
                set +e
                docker image ls | head -n 20
                exit 0
            '''
        }
        success {
            echo '✅ CI/CD completed successfully!'
            mail to: "${NOTIFICATION_EMAIL}",
                 subject: "Success: Pipeline ${currentBuild.fullDisplayName}",
                 body: "Great news! The pipeline ${currentBuild.fullDisplayName} finished successfully. \n\nCheck the build status at: ${env.BUILD_URL}"
        }
        failure {
            echo '❌ Pipeline failed. Check Console Output.'
            mail to: "${NOTIFICATION_EMAIL}",
                 subject: "Failure: Pipeline ${currentBuild.fullDisplayName}",
                 body: "The pipeline ${currentBuild.fullDisplayName} has failed. \n\nPlease check the console output at: ${env.BUILD_URL}"
        }
    }
}