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
           sh 'npm install'
           sh 'npm install pm2'
           sh 'npm run start '

             
           sh 'pm2 restart all'
           sh 'exit'
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
