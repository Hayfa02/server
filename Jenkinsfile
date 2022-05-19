pipeline {
  agent any
    stages {
    
    
      stage("build") {
        steps {
          sh 'npm install'
          sh ' code . '
          }
        }
        
           
      stage("test") {
        steps {
          echo 'testing the application...'
        }
      }
      
              
      stage("deploy") {
        steps {
          echo 'deploying the application...'
        }
      }
      
      
         stage("slack") {
        steps {
          slackSend message: 'Test message...'
        }
      }
    
      
    }
  }
      
      
