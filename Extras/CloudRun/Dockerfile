# Usamos imagen de Python ligera
FROM python:3.11-slim

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY app.py requirements.txt ./

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Puerto expuesto
EXPOSE 8080

# Comando para correr la app
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
