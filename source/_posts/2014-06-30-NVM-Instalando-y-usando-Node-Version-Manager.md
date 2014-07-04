layout: post
title: 'NVM: Instalando y usando Node Version Manager'
permalink: 'nvm-instalando-y-usando-node-version-manager'
description: 'Tutorial de introducción a la gestión de versiones de Node.js con NVM.'
socialmedia_image: 'images/programming/nodejs/nvm-video-tutorial.png'
date: 2014-06-30 01:36:50
comments: true
tags: [Tutoriales, Desarrollo, Node.js, npmjs, NVM, Linux]
---

¡Hola! He vuelto desde un tiempo de inactividad considerable (Diciembre de 2012 fue mi último post) y, desde ese tiempo, el blog ha sufrido muchos cambios. Lo que comenzó siendo un blog con `Wordpress` y un template gratuito, hoy es un blog _powered by [Hexo](http://hexo.io/)_ y un template hecho completamente por mi. El tiempo nos cambia... En fin, `Hexo` será tema para otro artículo.

Lo que hoy vengo a enseñarles es una de las mejores formas de gestionar un ambiente de `Node.js`, con todas sus dependencias y paquetes de `npm`. Hoy vengo a hablarles de __NVM__.
<br>

## ¡Atención!
Este artículo viene acompañado de un tutorial en _YouTube_. Puedes seguir todo el tutorial en vídeo o simplemente leer este artículo. En ambos lugares encontrarás exactamente lo mismo.
<br>

# Guía en YouTube

{% youtube SU8K8jj-fQs %}

<!-- more -->
<hr>

# Guía escrita

Bien, veo que has decidido leer esta guía {% emoji smile %}. ¡Vamos!
<br>

## ¿Qué significa NVM?

A estas alturas, es probable que estés preguntándote _¿qué es NVM?_. Si alguna vez has programado con `Ruby`, seguramente ya conoces `RVM`. `RVM` y `NVM` comparten una filosofía similar. __NVM es el acrónimo de *"Node Version Manager"* o *"Gestor de Versiones de Node"*__, similar a RVM, que significa *"Ruby Version Manager"* o *"Gestor de Versiones de Ruby"*.
Este tipo de utilidades __se encargan de controlar diferentes versiones de estos aplicativos en un mismo ambiente.__ En el caso de `NVM`, que es el que nos interesa, permite instalar múltiples versiones de `Node.js` y `npm` en un mismo ambiente, dejando cada una completamente aislada de las otras. Sí, puedes tener Node v0.4 y v0.11 instaladas en tu equipo y ejecutar una u otra según lo necesites. Genial, ¿no?.
<br>

## Requerimientos

Mi Sistema Operativo por preferencia es Ubuntu, una distribución de Linux. Todo este tutorial lo voy a llevar adelante sobre Ubuntu, pero puede funcionar bien para cualquier distribución Linux e Unix. Ubuntu, Debian, Fedora, MacOS, todos pueden seguir esta guía.

Lo primero que vamos a necesitar es:

- `curl`: necesario para descargar el script de instalación.
- `build-essential`: necesario en caso de que vayamos a compilar Node.js desde el código fuente.
- `libssl-dev`: ídem build-essential.
- `git`: necesario porque el script de instalación descarga NVM desde un repositorio en Github.

{% shellcode %}
%cmd|sudo apt-get install -y curl build-essential libssl-dev git
{% endshellcode %}

<br>

## Instalando NVM

Primero, y antes que nada, debemos ir al repositorio de NVM en Github ([clic para ir](https://github.com/creationix/nvm)) y copiar la línea del instalador. A fecha de hoy, Domingo 29 de Junio de 2014, el instalador nos permite instalar la versión 0.10 de NVM. Es recomendable que vayas al repositorio y obtengas la última versión disponible.

`curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | sh`

#### ¡ATENCIÓN!

A todos los usuarios de Ubuntu, principalmente: mucho cuidado al copiar instaladores de internet. Algunos caemos en este asunto de que mandamos `sh` a algún script de terceros. ¿Y el problema de esto? Muchos desarrolladores asumen que en todos los sistemas operativos, `sh` es alias de `bash`. Grave error. En Ubuntu, `sh` es alias de `dash`, una _shell_ completamente diferente. ¿No me crees? Ejecuta:

{% shellcode %}
%cmd|readlink /bin/sh
dash
{% endshellcode %}

Ja. Vemos ahora que el script de instalación depende de `bash` para ejecutarse, pero le encarga la tarea a `sh` (que es `dash`). ¿Cómo lo solucionamos? Fácil, reemplazamos `sh` por `bash` y ya estamos listos {% emoji smile %}.

Antes de continuar, tenemos que configurar el archivo de perfil de nuestra shell, necesario para que NVM se cargue a nuestro entorno. Si usamos Bash, nuestro archivo de perfil es `~/.bashrc`, si usamos ZSH, `~/.zshrc`. Yo uso bash en este tutorial, así que procedo como muestro a continuación:

{% shellcode %}
%cmd|curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | PROFILE=~/.bashrc bash
{% endshellcode %}

Una vez terminada la instalación, cerrar la _terminal_ y volver a abrirla.
<br>

## Primeros pasos con NVM

Si la instalación fue exitosa, al ejecutar `nvm` en nuestro terminal veremos el listado de comandos disponibles:

{% shellcode %}
%cmd|nvm

Node Version Manager

Usage:
    nvm help                    Show this message
    nvm --version               Print out the latest released version of nvm
    nvm install [-s] <version>  Download and install a <version>, [-s] from source. Uses .nvmrc if available
    nvm uninstall <version>     Uninstall a version
    nvm use <version>           Modify PATH to use <version>. Uses .nvmrc if available
    nvm run <version> [<args>]  Run <version> with <args> as arguments. Uses .nvmrc if available for <version>
    nvm current                 Display currently activated version
    nvm ls                      List installed versions
    nvm ls <version>            List versions matching a given description
    nvm ls-remote               List remote versions available for install
    nvm deactivate              Undo effects of NVM on current shell
    nvm alias [<pattern>]       Show all aliases beginning with <pattern>
    nvm alias <name> <version>  Set an alias named <name> pointing to <version>
    nvm unalias <name>          Deletes the alias named <name>
    nvm copy-packages <version> Install global NPM packages contained in <version> to current version
    nvm unload                  Unload NVM from shell

Example:
    nvm install v0.10.24        Install a specific version number
    nvm use 0.10                Use the latest available 0.10.x release
    nvm run 0.10.24 myApp.js    Run myApp.js using node v0.10.24
    nvm alias default 0.10.24   Set default node version on a shell

Note:
    to remove, delete or uninstall nvm - just remove ~/.nvm, ~/.npm and ~/.bower folders

{% endshellcode %}

En este tutorial vamos a ver:

- `nvm install`: nos permite descargar e instalar una nueva versión de Node.js junto con npm.
- `nvm use`: permite cambiar de una versión a otra.
- `nvm run`: ejecuta una versión de node.
- `nvm ls`: muestra las versiones instaladas en nuestro ambiente.
- `nvm ls-remote`: muestra las versiones disponibles para descargar desde un servidor remoto.

<br>

### Buscando una versión para instalar

Ejecutando `nvm ls-remote` nos mostrará un listado de versiones listas para instalar. A día de hoy, 29 de Junio de 2014, la última versión disponible es la `v0.11.13`. Para instalar esta versión, podemos ejecutar un comando de dos formas diferentes. __Mucha atención:__

{% shellcode %}
%cmd|nvm install v0.11.13
{% endshellcode %}

Esa línea descargará los binarios ya compilados desde el servidor y los instalará en nuestro ambiente. Tan simple como eso. Sin embargo, existe una variante de este comando:

{% shellcode %}
%cmd|nvm install -s v0.11.13
{% endshellcode %}

Agregando la opción `-s` al instalador, le estamos pidiendo que __descargue el código fuente de Node.js y lo compile en nuestro ambiente__. ¿Se entiende? Sin `-s`, descarga los binarios ya listos. Con `-s`, descarga el source y compila en nuestro ambiente. La ventaja de esta segunda opción es permitirnos personalizar la compilación de Node. Es para este proceso que necesitamos `build-essential` y `libssl-dev`, anteriormente instalados.

Si la instalación fue exitosa, al ejecutar `node --version` nos tendría que mostrar la versión correcta.
<br>

### Instalando una segunda versión de Node

Hasta ahora, nada de lo que mostré parece ser sobresaliente si se compara con una instalación común y corriente de Node. La ventaja principal a la hora de usar `NVM` es poder instalar múltiples versiones de esta aplicación. Así que ahora vamos a probar los mismos pasos anteriores, pero con la versión v0.10.26:

{% shellcode %}
%cmd|nvm install v0.10.26
{% endshellcode %}

Podemos comprobar que tenemos las dos versiones instaladas, si ejecutamos:

{% shellcode %}
%cmd|nvm ls
-> v0.10.26
   v0.11.13
{% endshellcode %}

La última versión instalada está marcada como _default_. ¿Y ahora?

Intercambiar entre versiones de Node es sencillo, basta con usar el comando `nvm use` acompañado del número de versión. A modo de pruebas, vamos a crear un pequeño archivo `.js` que nos permita ver la versión de Node cada vez que lo invocamos. Algo así:

{% gist f71a642a213f0b589e9d {"file":"test.js","direct_link":"https://gist.githubusercontent.com/sergiolepore/f71a642a213f0b589e9d/raw/a678e0566274ef28f814f2fe9c5484837f621712/test.js"} %}

Primero, ejecutamos Node como de costumbre. El proceso debería mostrar la versión y luego retornar a nuestra shell:

{% shellcode %}
%cmd|node test.js
v0.10.26
{% endshellcode %}

Y ahora, lo interesante. Ejecutaremos `nvm use` para cambiar la versión de Node y usaremos nuestro script de pruebas para ver si el cambio fue exitoso:

{% shellcode %}
%cmd|nvm use v0.11.13
Now using node v0.11.13
%cmd|nvm ls
   v0.10.26
-> v0.11.13
%cmd|node test.js
v0.11.13
{% endshellcode %}

¡Fantástico! ¿No? {% emoji smile %}
<br>

### Bloqueando versiones de Node.js en diferentes proyectos

Otra cosa muy interesante que tiene `NVM` es la posibilidad de "bloquear" una versión de Node.js en algún directorio, por ejemplo, el directorio de uno de nuestros proyectos. Este bloqueo lo realiza valiendose de un _dotfile_ de nombre `.nvmrc` cuyo contenido es únicamente una versión de Node.js. De esta manera, cuando ejecutamos Node en un directorio donde existe un `.nvmrc`, se ejecutará la versión especificada en este archivo.

#### ¡Atención!

Este _dotfile_ sólo se tiene en cuenta si ejecutamos Node a través de `NVM`, con el comando `nvm run`. Veamos un ejemplo:

- Creamos el siguiente archivo en un directorio cualquiera.

{% gist f71a642a213f0b589e9d {"file":".nvmrc","direct_link":"https://gist.githubusercontent.com/sergiolepore/f71a642a213f0b589e9d/raw/b3d8f8b6791a420760a72cb2302409369c223e30/.nvmrc"} %}

- Creamos un archivo para probar la versión de Node en uso, en el mismo directorio que el _dotfile_

{% gist f71a642a213f0b589e9d {"file":"test-dotfile.js","direct_link":"https://gist.githubusercontent.com/sergiolepore/f71a642a213f0b589e9d/raw/42bb34634df9d8cfa31e6e56ebcfe8c89face9d6/test-dotfile.js"} %}

- Comprobamos que la versión de Node en uso es diferente a la versión del `.nvmrc`

{% shellcode %}
%cmd|nvm ls
   v0.10.26
-> v0.11.13
{% endshellcode %}

- Nos dirigimos al directorio donde está el _dotfile_ y ejecutamos `nvm run`

{% shellcode {"cwd":"~/tutorial-nvm/prueba-dotfile"} %}
%cmd|nvm run test-dotfile.js
Found '/home/you/tutorial-nvm/prueba-dotfile/.nvmrc' with version <v0.10.26>
Running node v0.10.26
Versión que se ejecuta: v0.10.26
{% endshellcode %}

<br>

## Más y más ventajas de NVM

¿Alguna vez has utilizado `npm` con `sudo`, como cuando haces una instalación global? ¿`sudo npm install -g modulo` te suena familiar? Esta forma de usar `npm` con `sudo` es algo feo. Y cuando digo feo, va en serio.
Hace unos meses, mientras hacía un update (`sudo npm update -g`), algo falló y todo mi directorio de módulos globales quedó horriblemente corrupto. ¿Por qué pasó esto? Aun no lo sé con certeza. En una instalación normal de Node.js en Ubuntu, los paquetes globales de `npm` van a parar a `/usr/local/lib/node_modules/` y si revisamos los permisos de este directorio, vamos a ver que sólo se puede escribir por __root__. Es por eso que necesitamos usar `npm` como _superusuario_.
Pueden leer más acerca de este error [por acá](https://github.com/npm/npm/issues/4099).

NVM es un mundo aparte en cuanto al tipo de organización de los directorios de binarios y módulos globales. Todas las versiones que vayamos a instalar con `nvm install` se guardarán en el directorio `~/.nvm/{versión}/`. Cada directorio de estos contiene varios archivos y subdirectorios, pero los que nos interesan son:

- `bin/`: directorio con los binarios de node y scripts ejecutables globales (como npm).
- `lib/node_modules/`: directorio de módulos globales para esta versión.

Como ven, cuando hacen `npm install -g` en una instalación con `NVM`, estos módulos globales se guardan en el directorio de la __versión en uso de Node__, en el `home` del usuario. Ya no más `sudo` {% emoji smile %}.
Hagamos una prueba:

{% shellcode %}
%cmd|npm install -g underscore
{% endshellcode %}

Una vez instalado, chequeamos la versión y nos fijamos si existe el módulo en el directorio que corresponde:

{% shellcode %}
%cmd|nvm ls
   v0.10.26
-> v0.11.13
%cmd|ls ~/.nvm/v0.11.13/lib/node_modules
npm  underscore
{% endshellcode %}

Ahora vamos a chequear `node_modules` de la otra versión:

{% shellcode %}
%cmd|ls ~/.nvm/v0.10.26/lib/node_modules
npm
{% endshellcode %}

¿Qué hacemos si instalamos 50 paquetes en una versión y luego nos cambiamos a otra? ¿Tenemos que volver a instalar a mano todo? ¿Copiamos el directorio? __Nada de eso.__ Sigamos y les muestro el último comando en este tutorial.
<br>

### Migrando módulos de una versión a otra

Por suerte, previendo un escenario como el que planteé recién, los desarrolladores de `NVM` nos proveen un comando para hacer estas migraciones: `nvm copy-packages`.
Su uso es muy sencillo, sólo basta con pasarle como parámetro la versión desde la cual se quieren copiar los módulos __HACIA__ la versión en uso. Veamos:

{% shellcode %}
%cmd|nvm ls
   v0.10.26
-> v0.11.13
%cmd|nvm use v0.10.26
Now using node v0.10.26
%cmd|nvm copy-packages v0.11.13
{% endshellcode %}

<br>

## NVM en grandes proyectos, o por qué puedes confiar en él

A estas alturas, seguro que ya te he vendido `NVM` y lo tienes instalado hasta en tu _Raspberry Pi_, ¿no? ¿Pero qué hay de la madurez de esta utilidad? ¿Se puede confiar de la misma en un ambiente delicado como Producción? La respuesta es: __sí__.
Actualmente, uno de los lugares más interesantes donde está implementado es en [Travis-CI](http://travis-ci.org/), una plataforma de _Continuous Integration_ muy reconocida. En Travis-CI, NVM es utilizado para preparar un ambiente de Node exclusivo para tests. Si vemos, por ejemplo, [esta ejecución](https://travis-ci.org/visionmedia/express/jobs/28592542) de un test de _Express.js_, nos encontramos con la agradable sorpresa de que NVM se ejecuta en la línea #20 para establecer la versión de Node.js en 0.10.26.
<br>

{% img /images/programming/nodejs/nvm-travis-ci.png %}

Si Travis-CI confía en NVM para semejante cantidad de tareas, __¿confiarías tu?__

<hr>

Bueno amigos, eso fue el final de este enorme tutorial introductorio a NVM. Espero les haya sido útil {% emoji smile %}. 
¡Hasta la próxima!