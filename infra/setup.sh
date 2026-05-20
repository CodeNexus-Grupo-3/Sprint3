#!/bin/bash

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

# Configura via aws configure
aws configure set aws_access_key_id "$ACCESS_KEY"
aws configure set aws_secret_access_key "$SECRET_KEY"
aws configure set aws_session_token "$SESSION_TOKEN"
aws configure set region "$REGION"
aws configure set output "$OUTPUT"

# 5 - Instalando o Git e clonando o Repo
echo "[INFO] Instalando o Git e clonando o repositório"
sudo apt update && sudo apt install git -y
git clone https://github.com/CodeNexus-Grupo-3/Sprint3.git

# 6 - Instalando o Maven
echo "[INFO] Instalando o Maven"
sudo apt update && sudo apt install maven -y

# 7 - Instalando o Docker
echo "[INFO] Instalando o Docker"
sudo apt update && sudo apt install docker.io -y
sudo systemctl enable docker 
sudo systemctl start docker

# 8 - Definindo os .env
echo "[INFO] Criando os arquivos .env"

# 8.1 - .env do web-data-viz

# .env de desenvolvimento
cat <<EOF > /Sprint3/web-data-viz/.env.dev
AMBIENTE_PROCESSO=desenvolvimento

# Configurações de conexão com o banco de dados
DB_HOST=bd-codenexus
DB_DATABASE=codenexus
DB_USER=root
DB_PASSWORD=urubu100
DB_PORT=3306

# Configurações do servidor de aplicação
APP_PORT=3333
APP_HOST=localhost
EOF

# .env de produção
cat <<EOF > /Sprint3/web-data-viz/.env
AMBIENTE_PROCESSO=producao

# Configurações de conexão com o banco de dados
DB_HOST=bd-codenexus
DB_DATABASE=codenexus
DB_USER=root
DB_PASSWORD=urubu100
DB_PORT=3306

# Configurações do servidor de aplicação
APP_PORT=3333
APP_HOST=localhost
EOF

# 8.2 - .env codenexus-v3
cat <<EOF > /Sprint3/codenexus-v3/.env
# AWS
# =====================
AWS_ACCESS_KEY_ID=$ACCESS_KEY
AWS_SECRET_ACCESS_KEY=$SECRET_KEY
AWS_SESSION_TOKEN=$SESSION_TOKEN
AWS_REGION=us-east-1
# =====================

# BANCO
# =====================
DB_HOST=bd-codenexus
DB_PORT=3306
DB_NAME=codenexus
DB_USER=root
DB_PASSWORD=urubu100
# =====================
EOF

# 9 - Construindo as imagens
echo "[INFO] Construindo as imagens personalizadas do banco, web-data-viz e java"

# 9.1 - Imagem do Banco de Dados
sudo docker build -t mysql-codenexus /Sprint3/mysql

# 9.2 - Imagem do Site e Aplicação
sudo docker build -t node-codenexus /Sprint3/web-data-viz

# 9.3 - Imagem do Java
sudo docker build -t java-codenexus /Sprint3/codenexus-v3

# 10 - Criando Network
echo "[INFO] Criando rede para conectar os containers entre si"
docker network create network-codenexus

# 11 - Criando os Containers
echo "[INFO] Criando os containers"

# 11.1 - Subindo container de Banco de Dados
docker run -d \
  --name bd-codenexus \
  --network network-codenexus \
  -p 3306:3306 \
  mysql-codenexus

# 11.2 - Subindo container do Site e Aplicação
docker run -d \
  --env-file /Sprint3/web-data-viz/.env \
  --name app-codenexus \
  --network network-codenexus \
  node-codenexus

# 12 - Subindo container do Java (+CRON)

# Garantir que o Cron está instalado
echo "[INFO] Instalando e ativando o CRON"
sudo apt update && sudo apt install cron -y
sudo systemctl start cron
sudo systemctl enable cron

# Adicionando tarefa no CRON
echo "[INFO] Container Java adicionado ao CRON"
echo "*/10 * * * * cd /home/ubuntu/Sprint3/codenexus-v3 && sudo docker run --rm --env-file .env --network network-codenexus java-codenexus >> /home/ubuntu/etl.log 2>&1" | crontab -