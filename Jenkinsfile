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
           sh 'npm start'

          }
        } 
          
          stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}
