#!/bin/bash
set -e

# 1 - Atualiza a lista de pacotes disponíveis e Instala as versões mais recentes dos pacotes
sudo apt update && sudo apt upgrade -y

# 2 - Retornando ao diretório home
cd ~

# 3 - Git pull no repositório do projeto
cd Sprint3
git pull

# 4 - Remove os containers atuais
sudo docker-compose down

# 5 - Sobe os containers com as atualizações
sudo docker-compose up -d --build mysql python app

# 6 - Rebuilda a imagem Java
sudo docker-compose build java