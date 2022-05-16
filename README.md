# Strafenkatalog
- Digitalisierter Strafenkatalog
- Architektur
  - DB: H2 file-based 
  - Backend: Java Spring / Spring Boot (maven)
  - Frontend: React
- TODO Frontend
  - Frontend Views erstellen
  - Verbindung zum REST-Backend

- TODO Backend
  - Spring Security für Authentifizierung
  - Dummy Route für Check, ob Server läuft
  - Routen für verschiedene Statistiken erstellen

- TODO Deployment
  - Hochladen auf AWS S3
  - E2 Instanz erstellen (?reicht kleinste? - 500MB RAM, 1vCPU)
  - Lambda für zeitgesteuerten Serverstart
  - Lambda für Serverstart außerhalb normalen Zeiten -> Weiterleitung auf Server
