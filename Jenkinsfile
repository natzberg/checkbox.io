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
                sh 'cd server-side/site && node analysis.js ./routes/admin.js | grep --line-buffered "LongMethod: true" > ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/create.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/csv.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/designer.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/live.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/study.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/studyModel.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js ./routes/upload.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                sh 'cd server-side/site && node analysis.js marqdown.js | grep --line-buffered "LongMethod: true" >> ~/analysis_results.txt'
                
                script {
                    def RESULTS = sh(
                        script: 'cat ~/analysis_results.txt',
                        returnStdout: true
                    ).trim()
                    if(RESULTS.length > 0) {
                        echo "Hello from failed build" + RESULTS
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
