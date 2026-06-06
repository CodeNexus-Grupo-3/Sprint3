#!/bin/bash
set -e

# 1 - Atualiza a lista de pacotes disponíveis
echo "[INFO] Atualizando a lista de pacotes disponíveis"
sudo apt update

# 2 - Instala as versões mais recentes dos pacotes
echo "[INFO] Instalando a versão mais recente dos pacotes"
sudo apt upgrade -y

# 3 - Configuração das credenciais AWS

echo "[INFO] Atualização das credenciais AWS iniciada..."

# 4 - Função de validação de campo vazio

validate_input() {
    local value=""

    while [ -z "$value" ]; do
        read -s value
        echo

        if [ -z "$value" ]; then
            echo "[ERRO] Esse campo não pode ficar vazio!"
        fi
    done

    echo "$value"
}

# 5 - Novas credenciais

echo "Digite seu AWS Access Key ID:"
ACCESS_KEY=$(validate_input)

echo "Digite seu AWS Secret Access Key:"
SECRET_KEY=$(validate_input)

echo "Digite seu AWS Session Token:"
SESSION_TOKEN=$(validate_input)

# 6 - Exporta variáveis para a sessão atual

export AWS_ACCESS_KEY_ID="$ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="$SECRET_KEY"
export AWS_SESSION_TOKEN="$SESSION_TOKEN"

echo "[INFO] Variáveis exportadas"

# 7 - Atualização das credenciais AWS CLI

echo "[INFO] Atualizando arquivos da AWS CLI..."

mkdir -p ~/.aws

rm -f ~/.aws/credentials

cat <<EOF > ~/.aws/credentials
[default]
aws_access_key_id=$ACCESS_KEY
aws_secret_access_key=$SECRET_KEY
aws_session_token=$SESSION_TOKEN
EOF

echo "[INFO] Credenciais AWS CLI atualizadas"

# 8 - Atualização do .env do Java

echo "[INFO] Atualizando arquivo .env do serviço Java..."

rm -f /home/codenexus/Sprint3/jar/.env

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

echo "[INFO] Arquivo .env atualizado"

echo "[INFO] Credenciais atualizadas com sucesso!"
echo "[INFO] Os próximos containers Java executados pelo CRON utilizarão as novas credenciais."