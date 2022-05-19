pipeline {
  agent any
    stages {
  
      
       stage("build") {
        steps {
          sh ' npm install'
          sh ' npm start'
          
        }
      }
      
             stage("slack") {
        steps {
          slackSend  color: 'good' ,  message:  'Test message...'
        }
      }
    
      
    }
  }
      
      
