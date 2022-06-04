pipeline {
    agent any
      stages {
        
  
        stage("slack") {
         steps {
           slackSend color: 'good' , message:'test message'
          }
        }
     
        
          stage('Docker Build') {
          steps {
            sh 'docker build -t contnode .'
      }
    }
      }
}
         
