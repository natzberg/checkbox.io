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
        stage('Setup') {
            steps {
                git url: 'https://github.com/natzberg/checkbox.io'
                
                checkout([$class: 'GitSCM', 
                branches: [[name: '*/master']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [
                    [$class: 'SparseCheckoutPaths',  sparseCheckoutPaths:[[$class:'SparseCheckoutPath', path:'folderName/']]]
                            ],
                submoduleCfg: [],
                url: 'git@github.com/natzberg/checkbox.io.git']]])
            }
        }
        stage('Build') {
            steps {
                sh 'cd ~/checkbox.io/server-side/site'
                sh 'npm install'
                sh 'npm start && npm test && npm stop'
            }
        }
    }
}
