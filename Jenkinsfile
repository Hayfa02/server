pipeline {
  agent any
    stages {
         stage("slack") {
        steps {
          slackSend  color: 'good' ,  message:  'Test message...'
        }
      }
      
       stage("build") {
        steps {
          sh ' npm install'
          sh ' npm start'
          
        }
      }
    
      
    }
  }
      
      
