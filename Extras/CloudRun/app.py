from flask import Flask, request, send_file
from PIL import Image, ImageDraw, ImageFont
import io

app = Flask(__name__)

@app.route('/')
def home():
    return "¡Bienvenido a Cloud Run Guay! Prueba /imagen?texto=hola"

@app.route('/imagen')
def generar_imagen():
    texto = request.args.get('texto', 'Hola Mundo!')
    # Crear imagen
    img = Image.new('RGB', (500, 200), color=(73, 109, 137))
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    d.text((50, 70), texto, fill=(255, 255, 0), font=font)

    # Guardar en memoria
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
