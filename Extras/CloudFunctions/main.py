
def saludo(request):
    name = request.args.get('name') or 'estudiante'
    return f'¡Hola, {name}! Bienvenido a Cloud Functions Gen 2 😊'
