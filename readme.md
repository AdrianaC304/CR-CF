# ☁️ Ejercicios Extra: Cloud Functions & Cloud Run en GCP

![GCP](https://img.shields.io/badge/Platform-Google%20Cloud-blue?style=for-the-badge) 

Este repositorio contiene **ejercicios prácticos de Cloud Functions y Cloud Run** en Google Cloud Platform.  
El objetivo es aprender a manejar eventos de **Cloud Storage**, permisos de **IAM**, y desarrollar funciones **serverless** listas para producción.

---

## 🎯 Objetivos

- Aprender a usar **Eventarc** con Cloud Functions
- Integrar Cloud Functions con **Cloud Storage**
- Gestionar permisos de **IAM** correctamente
- Generar servicios HTTP con **Cloud Run**
- Evitar errores comunes

---

## Ejercicio 1: Generar botación aletoría o chistes aletorios

### 📌 Descripción

Vamos a usar una Cloud Function par generar chistes aletorios y votaciones aleatorias.

## Ejercicio 2: Generar un mensaje 

### 📌 Descripción

Cloud Run expone HTTP público si --allow-unauthenticated, y Flask debe escuchar en 0.0.0.0 y puerto 8080. Funciona como servicio serverless escalable automáticamente

## Ejercicio 3: Copiar imágenes entre buckets

### 📌 Descripción

En este ejercicio vamos a trabjar todo desde la propia intefaz de GCP. y el objetivo de este ejercicio es que cuando se sube un archivo al bucket se lanza la función y se copia una imagen de un bucket a otro. 

---

### Crear Cloud Functions 

### Trigger

- **Proveedor:** Cloud Storage  
- **Tipo de evento:** `google.cloud.storage.object.v1.finalized`  
- **Bucket origen:** `imagenes-originales`  
- **Destino:** Cloud Function HTTP (Gen 2)  
- **Modo:** `GCS_NOTIFICATION`  

---

### Payload recibido

```json
{
  "name": "foto.png",
  "bucket": "imagenes-originales",
  "contentType": "image/png",
  "timeCreated": "2026-01-06T19:41:17Z"
}
```

### Permisos necesarios 

```json
roles/storage.objectCreator
```

## Ejercicio 4: Lectura y análisis de usuarios en BigQuery mediante Cloud Run

### 📌 Descripción

En este ejemplo vamos a leer de una Base de Datos (Bigquey) y vamos a ver que usuarios existen y que acciones realizan estos usuarios.
 
 La API de Cloud RUN expone:

- Expone qué usuarios existen
- Expone qué episodios existen
- Es la fuente de verdad para el generador


Resumen de la Arquitectura:

|Base de datos| >> |API| >> |Generador de eventos| >> |Pub/Sub|



```json
gcloud config list
```

```json
gcloud config set project <PROJECT_ID>
```

```json
gcloud services enable cloudbuild.googleapis.com
```

```json
gcloud services enable run.googleapis.com containerregistry.googleapis.com
```

```json
gcloud services enable artifactregistry.googleapis.com
```

```json
gcloud artifacts repositories create usuarios-repo \
  --repository-format=docker \
  --location=us-central1
```

Es importante tener la cuenta de servicio  702247964271@cloudbuild.gserviceaccount.com para desplegar la imagen en GCP:

roles/storage.objectAdmin
roles/cloudbuild.builds.editor
roles/artifactregistry.writer
BigQuery Data Viewer
BigQuery Job User


Creamos la imagen:

```json
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/serverless-477916/usuarios-repo/usuarios-api:latest .
```

Creamos la Cloud Run:

```json
gcloud run deploy usuarios-api \
  --image us-central1-docker.pkg.dev/serverless-477916/usuarios-repo/usuarios-api:latest \
  --platform managed \
  --allow-unauthenticated
```

Desde el temrinal podemos acceder a el identificador de todos los clientes: 

```json
gcloud auth print-identity-token
```

```json
TOKEN=$(gcloud auth print-identity-token)
```

```json
curl -H "Authorization: Bearer $TOKEN" https://usuarios-api-rtwwkofpoa-ew.a.run.app/users
```



# Casos de uso 

![Texto alternativo](./imagen/diagram1.png)

