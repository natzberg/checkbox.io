pipeline {
    agent any
    environment {
        MAIL_USER = 'ncsudevops.s19'
        MAIL_PASSWORD = 'Zorro1997'
        MAIL_SMTP = 'smtp.gmail.com'
        MONGO_PASSWORD = '123456'
        MONGO_IP = '127.0.0.1'
        MONGO_USER = 'dba'
        APP_PORT= '3003'
        MONGO_PORT= '27017'
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd server-side/site && npm install'
                sh 'cd server-side/site && npm start && npm test && npm stop'
            }
        }

        stage('Analysis') {
            steps {
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/admin.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in admin.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/create.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in create.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/csv.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in csv.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/designer.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in designer.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/live.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in live.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/study.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in study.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/studyModel.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in studyModel.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js ./routes/upload.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in upload.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
                
                script {
                    def RESULTS = sh(
                        script: 'cd server-side/site && node analysis.js marqdown.js',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.contains("LongMethod: true") ) {
                        echo "[ERROR]: LongMethod true in marqdown.js!"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
