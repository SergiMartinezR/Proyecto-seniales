# Proyecto Señales
Webapp creada para un proyecto social con el objetivo de ayudar a las personas de la tercera edad a solicitar compras, y algún voluntario asistirá a la persona a traer sus compras.

<img src="/.github/gifs/proyecto_index.gif">

## Instalación
### Frontend

1. Clona este repositorio

   ```
   git clone https://github.com/SergiMartinezR/Proyecto-seniales.git
   ```
2. Instala las dependencias.

   ```
   cd Proyecto-seniales/frontend
   npm install
   ```
3. Inicia el server local

   ```
   npm start
   ```

Se debería abrir una pestaña en tu navegador y mostrar la app. Si no es así, abre la url http://localhost:3000/ en tu navegador.

### Backend

1. Crea un entorno virtual (suponiendo que estas en el folder de frontend)
  ```
  cd ../backend
  python3 -m venv venv
  ```
2. Activa el entorno virtual
  ```
  source venv/bin/activate
  ```
3. Instala las dependencias
  ```
  pip install -r requirements.txt
  ```
4. Inicia el server local
  ```
  cd comprasAPI
  python3 manage.py runserver
  ```

## WIP

La app aún no está terminada, hasta el momento solo se puede crear una cuenta y logearse
