pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18' // Version de Node.js recommandée pour Angular 18
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source depuis le dépôt Git...'
                // Récupère le code source depuis le dépôt Git
                git branch: 'main', url: 'https://github.com/MansourWorkingSpace/covoiturage.git'
            }
        }
        
        stage('Setup') {
            steps {
                echo 'Installation de Node.js et des dépendances...'
                // Installer Node.js via NodeJS plugin ou utiliser une image Docker
                script {
                    // Vérifier la version de Node.js
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances npm...'
                // Installer les dépendances du projet Angular
                sh 'npm ci' // Plus rapide et reproductible que npm install
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Vérification du code avec ESLint...'
                // Optionnel: vérification de la qualité du code
                script {
                    try {
                        sh 'npm run lint || echo "Lint non configuré, passage à l\'étape suivante"'
                    } catch (Exception e) {
                        echo "Étape de lint ignorée: ${e.getMessage()}"
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Compilation du projet Angular...'
                // Compiler le code Angular en mode production
                sh 'npm run build -- --configuration=production'
            }
            post {
                success {
                    echo 'Build réussi !'
                }
                failure {
                    echo 'Échec du build'
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Exécution des tests unitaires...'
                // Exécuter des tests unitaires avec Karma/Jasmine
                // Mode headless pour l'environnement CI/CD
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage'
            }
            post {
                always {
                    // Publier les résultats des tests
                    publishTestResults testResultsPattern: 'coverage/lcov.info'
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/covoiturage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }
        
        stage('Build SSR') {
            steps {
                echo 'Build pour le Server Side Rendering...'
                // Build pour le SSR si nécessaire
                script {
                    try {
                        sh 'npm run build:ssr || echo "SSR build non disponible"'
                    } catch (Exception e) {
                        echo "SSR build ignoré: ${e.getMessage()}"
                    }
                }
            }
        }
        
        stage('Archive') {
            steps {
                echo 'Archivage des artefacts...'
                // Créer un archive des fichiers de distribution
                script {
                    // Créer un fichier zip avec la date et le numéro de build
                    def timestamp = new Date().format('yyyyMMdd-HHmmss')
                    def zipFileName = "covoiturage-${BUILD_NUMBER}-${timestamp}.zip"
                    
                    sh "cd dist && zip -r ../${zipFileName} ."
                }
                
                // Archiver les artefacts générés
                archiveArtifacts artifacts: '*.zip, dist/**/*', 
                                allowEmptyArchive: false,
                                fingerprint: true,
                                onlyIfSuccessful: true
                
                // Archiver aussi les rapports de tests
                archiveArtifacts artifacts: 'coverage/**/*', 
                                allowEmptyArchive: true,
                                fingerprint: true
            }
        }
    }
    
    post {
        always {
            echo 'Nettoyage de l\'espace de travail...'
            // Nettoyer les node_modules pour économiser l'espace
            sh 'rm -rf node_modules || true'
        }
        success {
            echo 'Pipeline exécuté avec succès ! 🎉'
            // Optionnel: notification de succès
        }
        failure {
            echo 'Le pipeline a échoué ! ❌'
            // Optionnel: notification d'échec
        }
        unstable {
            echo 'Le pipeline est instable ⚠️'
        }
    }
}