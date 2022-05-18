pipeline {
  agent any
    stages {
    
    
      stage("build") {
        steps {
          sh 'npm install'
          sh 'npm start'
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
      
    
      
    }
  }
      
      
