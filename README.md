# 👞👟Footwear Classification
Dieses Projekt wurde im Rahmen der Lehrveranstaltung **Model Deployment & Maintenance** umgesetzt. Ziel war es, ein Bildklassifikationsmodell für verschiedene Schuharten (Boots, Sandals, Shoes, Slippers) zu trainieren, in eine Spring Boot Webanwendung zu integrieren und via Docker sowie Azure App Service bereitzustellen.

## 📊 Projektübersicht
- **Modell:** Convolutional Neural Network (CNN), trainiert mit Deep Java Library (DJL)
- **Klassifikation:** Schuhe nach Typ (Boots, Sandals, Shoes, Slippers)
- **Serving:**
  - via Spring Boot Webapp
  - alternativ via DJL Serving im Docker-Container
- **Deployment:** Azure App Service (Linux) mit Docker

## ⚡ Features
- Bild-Upload über Weboberfläche
- Vorschau des hochgeladenen Bildes
- Klassifikationsergebnis direkt im Frontend sichtbar
- Deployment als Docker-Image auf Azure
- Lokales DJL-Serving über Container möglich

## 🎓 Projektstruktur
```text
footwearclassification/
├── .mvn/                             # Maven Wrapper-Verzeichnis
├── .vscode/                          # VS Code Konfiguration
├── models/                           # Enthält .params Modell und synset.txt
├── src/                              # Java-Code (Spring Boot, Training, Inferenz)
├── target/                           # Build-Output von Maven
├── ut-zap50k-images-square/          # Datensatzbilder (original)
├── ut-zap50k-images-square-small/    # Datensatzbilder (komprimiert)
├── .dockerignore
├── .gitattributes
├── .gitignore
├── Dockerfile                        # Für Docker Build
├── HELP.md                           # Generierte Maven-Hilfe (optional)
├── mvnw                              # Maven Wrapper (Unix)
├── mvnw.cmd                          # Maven Wrapper (Windows)
├── pom.xml                           # Maven-Projektkonfiguration
└── README.md                         # Projektbeschreibung (diese Datei)

```

## ⚙️ Installation & Lokaler Start
1. Docker mit DJL Serving
```bash
docker run --name djl-serving -d -p 8080:8080 \
  -v ${PWD}/models:/opt/ml/model \
  deepjavalibrary/djl-serving:0.31.0
```

2. Spring Boot lokal starten
```bash
./mvnw spring-boot:run
```

3. Docker Image bauen und starten
```bash
docker buildx build --platform linux/amd64 -t bajraedo/footwearclassification .
docker run -p 8080:8080 bajraedo/footwearclassification
```

## 🌐 Azure Deployment
```bash
az group create --name footwearclassification --location switzerlandnorth
az appservice plan create --name footwearclassification --resource-group footwearclassification --sku F1 --is-linux
az webapp create \
  --resource-group footwearclassification \
  --plan footwearclassification \
  --name footwearselection \
  --deployment-container-image-name bajraedo/footwearclassification
```

Zugänglich via: https://footwearselection.azurewebsites.net

## 🔧 Beispiel Inferenz (DJL Serving direkt)
```bash
curl -X POST http://localhost:8080/predictions/footwear \
-T path/to/shoe.jpg
```
