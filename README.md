# GrieferGames Verkaufsbot

Ein moderner, modularer Minecraft-Verkaufsbot für CityBuild-Server wie GrieferGames. Entwickelt mit TypeScript, Node.js und `mineflayer`.

[![CI](https://github.com/DerJanniku/Griefergames-Verkaufsbot/actions/workflows/ci.yml/badge.svg)](https://github.com/DerJanniku/Griefergames-Verkaufsbot/actions/workflows/ci.yml)

## Features

- **Modulares Command-System**: Einfache Erweiterung durch neue Befehlsmodule.
- **Plugin-Architektur**: Zusätzliche Funktionalitäten durch Plugins (z.B. Anti-AFK).
- **Berechtigungssystem**: Unterscheidung zwischen `admin`- und `user`-Rollen.
- **Cooldown-Handling**: Verhindert Spam durch Befehlswiederholungen.
- **Docker-Unterstützung**: Einfaches Deployment mit Docker und Docker Compose.
- **Qualitätssicherung**: Automatisierte Tests, Linting und Builds mit GitHub Actions.
- **Konfigurierbar**: Einfache Anpassung über `.env`-Dateien.

## Technologiestack

- **Sprache**: TypeScript
- **Core**: Node.js, `mineflayer`
- **Tests**: Jest
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: Docker

## Installation

### Voraussetzungen

- Node.js (v18.x oder höher)
- Docker (optional, für Container-Deployment)

### Lokale Installation

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/DerJanniku/Griefergames-Verkaufsbot.git
    cd Griefergames-Verkaufsbot
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

3.  **Konfiguration erstellen:**
    Kopieren Sie die `.env.example`-Datei zu `.env` und passen Sie die Werte an, insbesondere `MINECRAFT_EMAIL` und `MINECRAFT_PASSWORD`.
    ```bash
    cp .env.example .env
    ```

4.  **Bot starten:**
    ```bash
    npm run build
    npm run start
    ```

### Docker-Installation

1.  **Repository klonen und Konfiguration erstellen** (siehe oben).

2.  **Docker-Container starten:**
    ```bash
    docker-compose up --build
    ```

## Befehle

- `!hilfe`: Zeigt eine Liste aller verfügbaren Befehle an.
- `!switch <CityBuild>`: Wechselt zu einem bestimmten CityBuild (nur für Admins).

## Mitwirken

Beiträge sind willkommen! Bitte lesen Sie die `CONTRIBUTING.md` für weitere Informationen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.
