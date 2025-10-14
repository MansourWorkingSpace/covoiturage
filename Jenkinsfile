pipeline {
    agent any

    // Utilise l'installation NodeJS déclarée dans Jenkins (Manage Jenkins > Global Tool Configuration)
    tools {
        nodejs 'NodeJS_18' // Assurez-vous qu'une installation nommée "NodeJS_18" existe côté Jenkins
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
                echo 'Vérification des versions Node.js et npm...'
                script {
                    if (isUnix()) {
                        sh 'node --version && npm --version'
                    } else {
                        bat 'node --version & npm --version'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances npm...'
                script {
                    if (isUnix()) {
                        sh 'npm ci' // Plus rapide et reproductible que npm install
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Vérification du code avec ESLint (si configuré)...'
                script {
                    if (isUnix()) {
                        sh 'npm run lint || echo "Lint non configuré, passage à l\'étape suivante"'
                    } else {
                        bat 'cmd /c npm run lint || echo Lint non configure, on continue'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Compilation du projet Angular...'
                script {
                    if (isUnix()) {
                        sh 'npm run build -- --configuration=production'
                    } else {
                        bat 'npm run build -- --configuration=production'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Exécution des tests unitaires (mode CI)...'
                // Marquer le build comme unstable si les tests échouent, pour éviter un échec dur dû au navigateur manquant
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    script {
                        if (isUnix()) {
                            sh 'npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage'
                        } else {
                            // Sous Windows, nécessite Chrome installé sur l\'agent ou adapter le launcher
                            bat 'npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage'
                        }
                    }
                }
            }
        }
        // Étape SSR supprimée/optionnelle: ajoutez-la si vous disposez d'un script npm build:ssr
        
        stage('Archive') {
            steps {
                echo 'Archivage des artefacts...'
                script {
                    // Créer un fichier zip avec la date et le numéro de build
                    def timestamp = new Date().format('yyyyMMdd-HHmmss')
                    def zipFileName = "covoiturage-${BUILD_NUMBER}-${timestamp}.zip"
                    env.ARCHIVE_NAME = zipFileName

                    if (isUnix()) {
                        sh 'which zip || (echo "zip non présent, installation requise" && exit 1)'
                        sh "cd dist && zip -r ../${zipFileName} ."
                    } else {
                        // Utilise PowerShell Compress-Archive sur Windows
                        bat "powershell -NoProfile -Command \"Compress-Archive -Path 'dist\\*' -DestinationPath '${zipFileName}' -Force\""
                    }
                }

                // Archiver les artefacts générés
                script {
                    archiveArtifacts artifacts: "${env.ARCHIVE_NAME}", allowEmptyArchive: false, fingerprint: true, onlyIfSuccessful: true
                    archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true, fingerprint: true
                    archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true, fingerprint: true
                }
            }
        }
    }
    
    post {
        always {
            echo 'Nettoyage de l\'espace de travail...'
            // Nettoyer les node_modules pour économiser l'espace
            script {
                if (isUnix()) {
                    sh 'rm -rf node_modules || true'
                } else {
                    bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue"'
                }
            }
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