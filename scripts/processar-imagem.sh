#!/bin/bash
# ============================================================
# processar-imagem.sh
# Processa automaticamente imagens NOVAS na pasta imgs/:
#   1. Remove TODOS os metadados (inclusive de IA/ChatGPT)
#   2. Adiciona metadados de localização (Conselheiro Lafaiete)
#   3. Converte para WebP (quality 80)
#
# Uso: basta rodar o script, ele detecta imagens que ainda
#      não têm versão .webp e processa automaticamente.
#
#   ./scripts/processar-imagem.sh
#
# Dependências: exiftool, imagemagick (convert)
# ============================================================

set -e

# Pasta das imagens
IMGS_DIR="imgs"

# Coordenadas de Conselheiro Lafaiete, MG
LAT="-20.6597"
LAT_REF="S"
LON="-43.7864"
LON_REF="W"
CITY="Conselheiro Lafaiete"
STATE="Minas Gerais"
COUNTRY="Brazil"

# Qualidade WebP
QUALITY=80

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar dependências
check_deps() {
  local missing=0
  if ! command -v exiftool &> /dev/null; then
    echo -e "${RED}✗ exiftool não encontrado. Instale: sudo apt install libimage-exiftool-perl${NC}"
    missing=1
  fi
  if ! command -v convert &> /dev/null; then
    echo -e "${RED}✗ ImageMagick não encontrado. Instale: sudo apt install imagemagick${NC}"
    missing=1
  fi
  if [ $missing -eq 1 ]; then
    exit 1
  fi
}

# Processar uma imagem
processar() {
  local arquivo="$1"
  local dir=$(dirname "$arquivo")
  local nome=$(basename "$arquivo")
  local nome_sem_ext="${nome%.*}"
  local webp_saida="${dir}/${nome_sem_ext}.webp"

  echo -e "${YELLOW}▶ Processando:${NC} $nome"

  # 1. Remover todos os metadados
  exiftool -overwrite_original -all= "$arquivo" 2>/dev/null
  echo -e "  ${GREEN}✓${NC} Metadados removidos"

  # 2. Adicionar metadados de localização
  exiftool -overwrite_original \
    -GPSLatitude="$LAT" -GPSLatitudeRef="$LAT_REF" \
    -GPSLongitude="$LON" -GPSLongitudeRef="$LON_REF" \
    -City="$CITY" \
    -State="$STATE" \
    -Country="$COUNTRY" \
    -XMP:City="$CITY" \
    -XMP:State="$STATE" \
    -XMP:Country="$COUNTRY" \
    "$arquivo" 2>/dev/null
  echo -e "  ${GREEN}✓${NC} Localização adicionada ($CITY, $STATE)"

  # 3. Converter para WebP
  convert "$arquivo" -quality $QUALITY "$webp_saida"
  echo -e "  ${GREEN}✓${NC} WebP gerado: $(basename "$webp_saida")"

  # 4. Adicionar metadados de localização no WebP
  exiftool -overwrite_original \
    -GPSLatitude="$LAT" -GPSLatitudeRef="$LAT_REF" \
    -GPSLongitude="$LON" -GPSLongitudeRef="$LON_REF" \
    -XMP:City="$CITY" \
    -XMP:State="$STATE" \
    -XMP:Country="$COUNTRY" \
    "$webp_saida" 2>/dev/null
  echo -e "  ${GREEN}✓${NC} Localização adicionada no WebP"

  echo ""
}

# Main
check_deps

echo ""
echo "🖼️  Processador de Imagens - Memorare Cestas"
echo "============================================"
echo "Buscando imagens novas em ${IMGS_DIR}/..."
echo ""

count=0

# Percorre jpeg, jpg e png na pasta imgs
for arquivo in "$IMGS_DIR"/*.jpeg "$IMGS_DIR"/*.jpg "$IMGS_DIR"/*.png; do
  # Pular se o glob não encontrou nada
  [ -f "$arquivo" ] || continue

  # Verificar se já existe a versão .webp correspondente
  nome=$(basename "$arquivo")
  nome_sem_ext="${nome%.*}"
  webp_esperado="$IMGS_DIR/${nome_sem_ext}.webp"

  if [ -f "$webp_esperado" ]; then
    # Já processada, pular
    continue
  fi

  processar "$arquivo"
  ((count++))
done

echo "============================================"
if [ $count -eq 0 ]; then
  echo -e "${GREEN}✓ Nenhuma imagem nova para processar.${NC}"
else
  echo -e "${GREEN}✓ $count imagem(ns) processada(s) com sucesso!${NC}"
fi
