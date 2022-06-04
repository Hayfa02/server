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
               sh 'sudo chmod 666 /var/run/docker.sock'
               sh 'docker build -t contnode .'
      }
    }
          
          
          stage(' image  container') {
             steps {
               sh 'docker image rm 411991af0152'
               sh 'docker image rm eb6b3606b7a6'

      }
    }
          
          
          
      }
}
         
