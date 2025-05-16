# 👞👟Footwear Classification
Dieses Projekt wurde im Rahmen des Moduls **Model Deployment & Maintenance** umgesetzt. Ziel war es, ein Bildklassifikationsmodell für verschiedene Schuharten (Boots, Sandals, Shoes, Slippers) zu trainieren, in eine Spring Boot Webanwendung zu integrieren und via Docker sowie Azure App Service bereitzustellen.

## 🛠️ Verwendete Technologien
- **Java 21**
- **Spring Boot**
- **Deep Java Library (DJL)**
  - `djl-api`, `djl-model-zoo`, `djl-pytorch-engine`, `djl-basicmodelzoo`
- **Maven** zur Abhängigkeitsverwaltung
- **Docker** für Containerisierung
- **Azure App Service (Linux)** für das Deployment
- **Bootstrap 5** im HTML-Frontend


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

## ⚙️ Lokale Ausführung
1. Projekt klonen:
```bash
git clone https://github.com/bajraedo/footwearclassification.git
cd footwearclassification
```

2. Abhängigkeiten installieren:
```bash
./mvnw clean install
```

3. Anwendung starten
```bash
./mvnw spring-boot:run
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
