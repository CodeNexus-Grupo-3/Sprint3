#!/bin/bash
set -e

# 1 - Atualiza a lista de pacotes disponíveis
echo "[INFO] Atualizando a lista de pacotes disponíveis"
sudo apt update

# 2 - Instala as versões mais recentes dos pacotes
echo "[INFO] Instalando a versão mais recente dos pacotes"
sudo apt upgrade -y

# 3 - Instala o pacote AWS CLI
echo "[INFO] Instalando o pacote AWS CLI"
sudo apt update && sudo apt install awscli -y

# 4 - Configuração das credenciais AWS
echo "[INFO] Configuração das variáveis AWS iniciada..."

# Função de validação de campo vazio
validate_input() {
    local value=""

    while [ -z "$value" ]; do
        read value
        echo

        if [ -z "$value" ]; then
            echo "Esse campo não pode ficar vazio!"
        fi
    done

    echo $value
}

# Váriaveis para guardar os valores inseridos pelo usuário
echo "Digite seu AWS Access Key ID"
ACCESS_KEY=$(validate_input)

echo "Digite seu AWS Secret Access Key"
SECRET_KEY=$(validate_input)

echo "Digite seu AWS Session Token"
SESSION_TOKEN=$(validate_input)

REGION="us-east-1"
OUTPUT="json"

# Exporta as variáveis de ambiente
export AWS_ACCESS_KEY_ID="$ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="$SECRET_KEY"
export AWS_SESSION_TOKEN="$SESSION_TOKEN"

# Cria o diretório .aws para guardar as credenciais e configurações
mkdir -p ~/.aws

# Cria um arquivo de credenciais no diretório .aws
cat <<EOF > ~/.aws/credentials
[default]
aws_access_key_id=$ACCESS_KEY
aws_secret_access_key=$SECRET_KEY
aws_session_token=$SESSION_TOKEN
EOF

# Cria um arquivo de configurações no diretório .aws
cat <<EOF > ~/.aws/config
[default]
region=$REGION
output=$OUTPUT
EOF

# 5 - Instalando o Git e clonando o Repo
echo "[INFO] Instalando o Git e clonando o repositório"
sudo apt update && sudo apt install git -y
git clone https://github.com/CodeNexus-Grupo-3/Sprint3.git

# 6 - Instalando o Docker
echo "[INFO] Instalando o Docker"
sudo apt update && sudo apt install docker.io -y
sudo systemctl enable docker 
sudo systemctl start docker

# 7 - Instalando o Docker Compose
echo "[INFO] Instalando o Docker Compose"
sudo apt update && sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 8 - Definindo os .env
echo "[INFO] Criando os arquivos .env"

# 9.1 - .env do web-data-viz

# .env de desenvolvimento
cat <<EOF > /home/codenexus/Sprint3/web-data-viz/.env.dev
AMBIENTE_PROCESSO=desenvolvimento

# Configurações de conexão com o banco de dados
DB_HOST=mysql
DB_DATABASE=codenexus
DB_USER=app
DB_PASSWORD=nexus100
DB_PORT=3306

# Configurações do servidor de aplicação
APP_PORT=3333
APP_HOST=0.0.0.0
EOF

# .env de produção
cat <<EOF > /home/codenexus/Sprint3/web-data-viz/.env
AMBIENTE_PROCESSO=producao

# Configurações de conexão com o banco de dados
DB_HOST=mysql
DB_DATABASE=codenexus
DB_USER=app
DB_PASSWORD=nexus100
DB_PORT=3306

# Configurações do servidor de aplicação
APP_PORT=3333
APP_HOST=0.0.0.0
EOF

# 9.2 - .env jar
cat <<EOF > /home/codenexus/Sprint3/jar/.env
# AWS
# =====================
AWS_ACCESS_KEY_ID=$ACCESS_KEY
AWS_SECRET_ACCESS_KEY=$SECRET_KEY
AWS_SESSION_TOKEN=$SESSION_TOKEN
AWS_REGION=us-east-1
# =====================

# BANCO
# =====================
DB_HOST=mysql
DB_DATABASE=codenexus
DB_USER=app
DB_PASSWORD=nexus100
DB_PORT=3306
# =====================

# JAVA_MAIL
# =====================
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=lucas.castro@sptech.school
SMTP_PASS=Polentinha69?
# =====================
EOF

# 9.3 - .env do python

cat <<EOF > /home/codenexus/Sprint3/simbiose/.env
# BANCO
# =====================
DB_HOST=mysql
DB_PORT=3306
DB_NAME=codenexus
DB_USER=app
DB_PASSWORD=nexus100
# =====================
EOF

# 10 - Subindo infraestrutura via docker-compose (imagens, containers, network, volume)
echo "[INFO] Subindo infraestrutura via docker-compose"
cd /home/codenexus/Sprint3
sudo docker-compose up -d --build mysql python app

# 11 - Subindo container do Java (+CRON)

# Garantir que o Cron está instalado
echo "[INFO] Instalando e ativando o CRON"
sudo apt update && sudo apt install cron -y
sudo systemctl start cron
sudo systemctl enable cron

# Buildando imagem do java
echo "[INFO] Buildando imagem do java via docker-compose"
sudo docker-compose build java

# Adicionando tarefa no CRON
echo "[INFO] Criando tarefa no CRON de criar, executar e eliminar container"
echo "*/10 * * * * sudo docker run --rm --env-file /home/codenexus/Sprint3/jar/.env --network network-codenexus java-codenexus >> /home/codenexus/etl.log 2>&1" | crontab -

# 12 - Adicionando o usuário ao grupo Docker
echo "[INFO] Adicionando o usuário ao grupo Docker"
sudo usermod -aG docker codenexus