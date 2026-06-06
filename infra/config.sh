#!/bin/bash
set -e

# 1 - Cria o usuário e seu diretório home

USUARIO="codenexus"
sudo adduser --gecos "" $USUARIO

echo "[INFO] Usuário $USUARIO criado com sucesso"

# 2 - Adiciona o usuário ao grupo sudo

sudo usermod -aG sudo $USUARIO

echo "[INFO] Usuário $USUARIO adicionado ao grupo sudo"

# 3 - Cria o diretório .ssh do novo usuário

sudo mkdir -p /home/$USUARIO/.ssh

echo "[INFO] Diretório .ssh criado"

# 4 - Copia as chaves autorizadas do usuário ubuntu

sudo cp /home/ubuntu/.ssh/authorized_keys /home/$USUARIO/.ssh/

echo "[INFO] Arquivo authorized_keys copiado"

# 5 - Ajusta proprietário dos arquivos SSH

sudo chown -R $USUARIO:$USUARIO /home/$USUARIO/.ssh

echo "[INFO] Proprietário configurado"

# 6 - Ajusta permissões do diretório .ssh

sudo chmod 700 /home/$USUARIO/.ssh

echo "[INFO] Permissões do diretório configuradas"

# 7 - Ajusta permissões do arquivo authorized_keys

sudo chmod 600 /home/$USUARIO/.ssh/authorized_keys

echo "[INFO] Permissões do arquivo configuradas"

# 8 - Habilita sudo sem senha (igual ao usuário ubuntu)

echo "$USUARIO ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/$USUARIO > /dev/null

sudo chmod 440 /etc/sudoers.d/$USUARIO

echo "[INFO] Sudo sem senha configurado"

echo "[INFO] Processo concluído com sucesso!"