#  🎯 LagunaLink Backend

[![Node CI](https://github.com/jvegaf/LagunaLink-be/actions/workflows/nodejs.yml/badge.svg?event=workflow_dispatch)](https://github.com/jvegaf/LagunaLink-be/actions/workflows/nodejs.yml)
[![TODO checker](https://github.com/jvegaf/LagunaLink-be/actions/workflows/todo-checker.yml/badge.svg?event=push)](https://github.com/jvegaf/LagunaLink-be/actions/workflows/todo-checker.yml)
[![Node CI ](https://github.com/jvegaf/LagunaLink-be/actions/workflows/nodejs.yml/badge.svg?branch=master&event=push)
](https://github.com/jvegaf/LagunaLink-be/actions/workflows/nodejs.yml)

## Documentacion de la API
[Documentacion de la API](https://lagunalink-be.herokuapp.com/docs/)

## Preparacion del entorno
1. Clonar el repositorio: `git clone https://github.com/jvegaf/LagunaLink-be.git`
3. Moverse dentro del directorio clonado: `cd LagunaLink-be`
### Herramientas necesarias
Necesitas tener instalado Make: 
- Windows: puedes usar el gestor de paquetes [winget](https://docs.microsoft.com/es-es/windows/package-manager/winget/ "Microsoft: Winget")  
- Linux: puedes usar el metapaquete [build-essential](https://packages.debian.org/es/source/sid/build-essential "Debian: build-essential/binary packages") para Debian, o derivados.  
 
Se puede optar por dos modos
#### Local
- Nodejs
- NPM (Node Package Manager)
- MongoDB

####  Contenedores
- Docker ([Install Docker](https://www.docker.com/get-started))

Tambien se puede utilizar una mezcla de los dos, por ejemplo lanzando el gestor de base de datos con Docker y el 
proyecto en local.

### Ejecucion de la aplicacion

La manera mas sencilla es usar los comandos predeterminados que se incluyen dentro de los *namespaces* de el fichero Makefile.

 - Lanzamiento en local con MongoDB a traves de docker
```shell script
make local/start
```

 - Lanzamiento completo a traves de docker
```shell script
make start
```

### Ejecucion de las pruebas

 - Lanzamiento de todas las suites de pruebas a traves de docker
```shell script
make test
```

 - Lanzamiento de todas las suites de pruebas en local con MongoDB a traves de docker
```shell script
make local/test
```

 - Lanzamiento solamente de la suite de pruebas unitarias en local con MongoDB a traves de docker
```shell script
make local/test-unit
```

 - Lanzamiento solamente de la suite de pruebas de aceptacion en local con MongoDB a traves de docker
```shell script
make local/test-features
```
