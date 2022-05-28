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
             sh 'npm install pm2 --save-devnpm install pm2 -g'
            
               }
            }
      }
}
         
