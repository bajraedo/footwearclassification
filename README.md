# Footwear Classification

Dieses Projekt wurde im Rahmen der Lehrveranstaltung **Model Deployment & Maintenance** umgesetzt. Ziel war es, ein Bildklassifikationsmodell für verschiedene Schuharten (Boots, Sandals, Shoes, Slippers) zu trainieren, in eine Spring Boot Webanwendung zu integrieren und via Docker sowie Azure App Service bereitzustellen.

## Projektübersicht

- **Modell:** Convolutional Neural Network (CNN), trainiert mit Deep Java Library (DJL)
- **Klassifikation:** Schuhe nach Typ (Boots, Sandals, Shoes, Slippers)
- **Serving:**
  - via Spring Boot Webapp
  - alternativ via DJL Serving im Docker-Container
- **Deployment:** Azure App Service (Linux) mit Docker

## Features

- Bild-Upload über Weboberfläche
- Vorschau des hochgeladenen Bildes
- Klassifikationsergebnis direkt im Frontend sichtbar
- Deployment als Docker-Image auf Azure
- Lokales DJL-Serving über Container möglich

## Projektstruktur

```text
footwearclassification/
├── models/                 # Enthält .params Modell und synset.txt
├── src/                   # Java-Code (Spring Boot, Training, Inferenz)
├── Dockerfile             # Zum Bauen des Images
├── index.html             # Frontend
├── script.js              # JS zur Bildauswahl und Serverkommunikation
├── Training.java          # DJL-Training
├── Models.java            # Modell-Ladeklasse
└── README.md              # Diese Datei


## Installation & Lokaler Start

1. Docker mit DJL Serving
docker run --name djl-serving -d -p 8080:8080 \
  -v ${PWD}/models:/opt/ml/model \
  deepjavalibrary/djl-serving:0.31.0

2. Spring Boot lokal starten
./mvnw spring-boot:run

3. Docker Image bauen und starten
docker buildx build --platform linux/amd64 -t bajraedo/footwearclassification .
docker run -p 8080:8080 bajraedo/footwearclassification

## Azure Deployment

az group create --name footwearclassification --location switzerlandnorth
az appservice plan create --name footwearclassification --resource-group footwearclassification --sku F1 --is-linux
az webapp create \
  --resource-group footwearclassification \
  --plan footwearclassification \
  --name footwearselection \
  --deployment-container-image-name bajraedo/footwearclassification

Zugänglich via: https://footwearselection.azurewebsites.net

## 🔧 Beispiel Inferenz (DJL Serving direkt)

curl -X POST http://localhost:8080/predictions/footwear \
-T path/to/shoe.jpg

Erstellt von @bajraedo im Rahmen der ZHAW-Lehrveranstaltung.