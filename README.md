# PF-Backend

Backend del proyecto final Henry

## Team

- Aldana
- Gastón
- Ivan
- Luis
- Maria Sol
- Max
- Miguel

## Stack

- React + Vite
- Redux
- Bootstrap 5.3

## Dependencies

!important

- instalar la siguiente dependencia manualmente

```js
npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
```

## Git

### Manejo de ramas

1. Subiendo la rama development o cualquier otra rama

- git checkout development
- git status
- git push origin development

2. Trayendo la rama development

- git fetch
  - Obtener las actualizaciones del repositorio remoto
- git branch -r
  - Listar todas las ramas remotas
- git checkout -b development origin/development
  - y quedas parado en development. luego crear tu rama de trabajo

3. Creando ramas

- git branch
  - para ver todas las ramas y saber en cual estoy
- git branch "nombre de la rama"
  -	sin comillas, crea rama
- git branch -M "newname"
  - renombra la rama en la que se esta actualmente
- git branch -D "nombreDeLaRama"
  - para eliminar rama
- git checkout "nombre de rama"
  - para desplasarse entre ramas
-	git checkut -
	-	Te devuelve a la rama anterior activa
- git show-branch
  - muestra las ramas que hay y el ultimo commit de cada una
- git show branch --all
  - igual anterior pero con mas detalles
- git merge "nombreDeLaRama"
  - fusiona la mara actual con la rama que definimos en el comando

## GitHub Flow

  ![alt text](GitFlow.png)

NOTA 1

- Ver en que rama estas
  - git branch
- pasarte a la rama en la que debes estar
  - git checkout "tu rama"
  - trabajas en tu rama, puedes guardar cambios en el archivo pero NO PUEDES HACER COMMIT aun.
- luego puedes hacer un git stash
- luego git merge "TuRama" "laMasActual"
- luego un git stash pop

NOTA 2

- Los MERGE siempre seran hacia la rama donde estes parado.
Ejemplo, estoy en trabajando en mi rama "luis" y necesito actualizar "development" con mi avance.
lo que debo hacer primero es ASEGURARME que development no ha tenido cambios, sino, empezar NOTA 1,
si ya logre la primera parte del flujo, sigo con:
- commit en luis
- git checkout development
- git merge development luis

NOTA 3
En caso de Emergencia rompa el vidrio

- Si hiciste commit y luego quieres traer a un rama los avances
  de "laMasActual" te saldrán para resolver "errores"
Si no los quires y como el paso 1,  has lo siguiente en tu rama de trabajo
- git reset --soft HEAD~1
  - si haces un git status aca, veras los archivos en verde
- git reset
  - si haces un git status aca, veras los archivos en rojo
- git stash
  - se guardan en la nebulosa
- git merge "tuRama" "laMasActual"
- git stash pop
- sera mejor ya que tus lineas son las adicionales y no las originales
- se manejara mejor en el Merge Editor o directamente aceptas ambos, ver imagen.
  
  ![alt text](merge.png)

- Luego de tener tu rama actualizada, con los cambios de "laMasActual" y tus cambios "luis"
   puedes hacer commit desde "luis" y luego cambiar a "laMasActual" y hacer merge, NOTA 2.
