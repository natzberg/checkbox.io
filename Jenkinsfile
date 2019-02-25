pipeline {
    agent any
    environment {
        MAIL_USER = 'ncsudevops.s19'
        MAIL_PASSWORD = 'Zorro1997'
        MAIL_SMTP = 'smtp.gmail.com'
        MONGO_PASSWORD = '123456'
        MONGO_IP = '127.0.0.1'
        MONGO_USER = 'dba'
        APP_PORT = '3003'
        MONGO_PORT = '27017'
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd server-side/site'
                sh 'npm install'
                sh 'npm start && npm test && npm stop'
            }
        }
    }
}
