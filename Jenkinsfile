pipeline {
	agent any

  environment {
    VITE_API_BASE_URL="https://idr-api.app.pb.utfpr.edu.br/"
    VITE_API_MOCKED="false"
  }

	stages {
		stage('Docker Compose Up') {
			steps {
				sh 'docker compose up -d --build'
			}
		}
	}
}