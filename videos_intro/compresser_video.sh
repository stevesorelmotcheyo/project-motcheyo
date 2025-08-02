#!/bin/bash

# Nom du fichier d'entrée (à modifier selon ta vidéo)
INPUT="net.mp4"

# Nom du fichier de sortie
OUTPUT="compressed.mp4"

# Compression en 4K (3840x2160), 10 secondes, codec H.265 (libx265), avec débit limité
ffmpeg -i "$INPUT" \
  -t 10 \
  -vf "scale=3840:2160" \
  -c:v libx265 \
  -preset slow \
  -crf 28 \
  -x265-params "log-level=error:vbv-maxrate=2400:vbv-bufsize=2400" \
  -c:a aac -b:a 64k \
  "$OUTPUT"

