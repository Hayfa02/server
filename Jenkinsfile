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
             sh 'pm2 start  npm server.js'
            
               }
            }
      }
}
         
