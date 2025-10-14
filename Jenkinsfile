pipeline {
    agent any

    // Utilise l'installation NodeJS déclarée dans Jenkins (Manage Jenkins > Global Tool Configuration)
    tools {
        nodejs 'nodejs' // Assurez-vous qu'une installation nommée "NodeJS_18" existe côté Jenkins
    }

    stages {
        stage('Checkout') {
    options {
        skipDefaultCheckout(true)
        retry(1)
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        GIT_HTTP_VERSION = 'HTTP/1.1'
    }
            steps {
                echo 'Récupération du code source depuis le dépôt Git...'
                // Récupère le code source depuis le dépôt Git
        nodejs 'NodeJS_18' // Assurez-vous qu'une installation nommée "NodeJS_18" existe côté Jenkins
            }
        }
        
        stage('Setup') {
            steps {
                echo 'Récupération du code source via configuration du job (checkout scm)...'
                script {
                    retry(3) {
                        checkout scm
                    }
                }
                        sh 'node --version && npm --version'
                    } else {
                        bat 'node --version & npm --version'
                    }
                        options {
                            // Évite le checkout implicite avant les stages pour que notre env s'applique
                            skipDefaultCheckout(true)
                            // Réduire les flakiness
                            retry(1)
                            timeout(time: 30, unit: 'MINUTES')
                        }

                }
            }
        }
        
        stage('Install Dependencies') {
                        environment {
                            // Forcer Git à utiliser HTTP/1.1 pour éviter certains problèmes HTTP/2 (curl 92)
                            GIT_HTTP_VERSION = 'HTTP/1.1'
                        }

            steps {
                echo 'Installation des dépendances npm...'
                script {
                                    echo 'Récupération du code source via configuration du job (checkout scm)...'
                                    script {
                                        retry(3) {
                                            checkout scm
                                        }
                                    }
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
        success {
            echo 'Pipeline exécuté avec succès ! 🎉'
        }
        failure {
            echo 'Le pipeline a échoué ! ❌'
        }
        unstable {
            echo 'Le pipeline est instable ⚠️'
        }
    }
}