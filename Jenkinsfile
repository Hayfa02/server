pipeline {
    agent any
      stages {
        
  
        stage("slack") {
         steps {
           slackSend color: 'good' , message:'test message'
          }
        }
     
        
        stage("Build") {
         steps {
           sh 'pm2 start  --wait-ready --listen-timeout 10000'
/*
           sh 'npm install'
           sh 'npm start'
           sh 'pm2 restart all'
*/
          }
        } 
          
          stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}
