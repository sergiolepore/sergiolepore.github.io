layout: post
title: 'NVM: Instalando y usando Node Version Manager'
permalink: 'nvm-instalando-y-usando-node-version-manager'
description: ''
date: 2014-06-30 01:36:50
comments: true
tags: [Desarrollo, Node.js, Tutoriales, npmjs, Linux]
---

¡Hola! He vuelto desde un tiempo de inactividad considerable (Diciembre de 2012 fue mi último post) y, desde ese tiempo, el blog ha sufrido muchos cambios. Lo que comenzó siendo un blog con `Wordpress` y un template gratuito, hoy es un blog _powered by [Hexo](http://hexo.io/)_ y un template hecho completamente por mi. El tiempo nos cambia... En fin, `Hexo` será tema para otro artículo.

Lo que hoy vengo a enseñarles es una de las mejores (sino LA mejor) forma de gestionar un ambiente de `Node.js`, con todas sus dependencias y paquetes de npm. Hoy vengo a hablarles de __NVM__.

## Heads Up!
Este artículo viene acompañado de un tutorial en _YouTube_. Puedes seguir todo el tutorial en vídeo o simplemente leer este artículo. En ambos lugares encontarás exactamente lo mismo.
<br>

# Guía en YouTube

{% youtube 8tD_OZnrCYw %}

<!-- more -->
<hr>

# Guía escrita

Bien, veo que has decidido leer esta guía {% emoji smile %}. ¡Vamos!

## ¿Qué significa NVM?

A estas alturas, es probable que estés preguntándote _¿qué es NVM?_. Si alguna vez desarrollaste con `Ruby`, seguramente ya conoces `RVM`. `RVM` y `NVM` comparten una filosofía similar. __NVM es el acrónimo de *"Node Version Manager"* o *"Gestor de Versiones de Node"*__, similar a RVM, que significa *"Ruby Version Manager"* o *"Gestor de Versiones de Ruby"*.
Este tipo de utilidades se encargan de controlar diferentes versiones de estos aplicativos en un mismo ambiente. En el caso de `NVM`, que es el que nos interesa, permite instalar múltiples versiones de `Node.js` y `npm` en un mismo ambiente, dejando cada una completamente aislada de las otras. Sí, puedes tener Node v0.8 y v0.11 instaladas en tu equipo y ejecutar una u otra según lo necesites. Genial, ¿no?.
<br>

## Instalando dependencias

Mi Sistema Operativo por preferencia es Ubuntu, una distribución de Linux. Todo este tutorial lo voy a llevar adelante sobre Ubuntu, pero puede funcionar bien para cualquier distribución Linux e Unix. Ubuntu, Debian, Fedora, MacOS, todos pueden seguir esta guía.

Lo primero que vamos a necesitar es:

- curl: necesario para descargar el script de instalación.
- build-essential: necesario en caso de que vayamos a compilar Node.js desde el código fuente.
- libssl-dev: ídem build-essential.
- git: necesario porque el script de instalación descarga NVM desde un repositorio en Github.

{% shellcode %}
sudo apt-get install -y curl build-essential libssl-dev git
{% endshellcode %}

<br>

## Instalando NVM

Primero, y antes que nada, debemos ir al repositorio de NVM en Github ([clic para ir](https://github.com/creationix/nvm)) y copiar la línea del instalador. A fecha de hoy, Domingo 29 de Junio de 2014, el instalador nos permite instalar la versión 0.10 de NVM. Es recomendable que vayas al repositorio y obtengas la última versión disponible.

`curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | sh`

#### Heads Up!

A todos los usuarios de Ubuntu, principalmente: mucho cuidado al copiar instaladores de internet. Algunos caemos en este asunto de que mandamos `sh` a algún script de terceros. ¿Y el problema de esto? Muchos desarrolladores asumen que en todos los sistemas operativos `sh` es alias de `bash`. Grave error. En Ubuntu, `sh` es alias de `dash`, una _shell_ completamente diferente. ¿No me crees? Ejecuta:

{% shellcode %}
readlink /bin/sh
{% endshellcode %}

Ja. Vemos ahora que el script de instalación depende de bash para ejecutarse, pero le encarga la tarea a sh (que es dash). ¿Cómo lo solucionamos? Fácil, reemplazamos sh por bash y ya estamos listos {% emoji smile %}.

Antes de continuar, tenemos que configurar el archivo de perfil de nuestra shell, necesario para que NVM se cargue a nuestro entorno. Si usamos Bash, nuestro archivo de perfil es `~/.bashrc`, si usamos ZSH, `~/.zshrc`. Yo uso bash en este tutorial, así que procedo como muestro a continuación:

{% shellcode %}
curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | PROFILE=~/.bashrc bash
{% endshellcode %}

Una vez terminada la instalación, cerrar la _terminal_ y volver a abrirla. Ya tendríamos que tener el comando `nvm` disponible.

<br>

## Primeros pasos con NVM

Si la instalación fue exitosa, al ejecutar `nvm` en nuestro terminal veremos el listado de comandos disponibles:

{% shellcode %}
nvm
{% endshellcode %}

En este tutorial vamos a ver:

- nvm install: nos permite descargar e instalar una nueva versión de Node.js junto con npm.
- nvm use: permite cambiar de una versión a otra.
- nvm run: ejecuta una versión de node.
- nvm ls: muestra las versiones instaladas en nuestro ambiente.
- nvm ls-remote: muestra las versiones disponibles para descargar desde un servidor remoto.

<br>

### Buscando una versión para instalar

Ejecutando `nvm ls-remote` nos mostrará un listado de versiones listas para instalar. A día de hoy, 29 de Junio de 2014, la última versión disponible es la `v0.11.13`. Para instalar esta versión, podemos ejecutar un comando de dos formas diferentes. __Mucha atención:__

{% shellcode %}
nvm install v0.11.13
{% endshellcode %}

Esa línea descargará los binarios ya compilados desde el servidor y los instalará en nuestro ambiente. Tan simple como eso. Sin embargo, existe una variante de este comando:

{% shellcode %}
nvm install -s v0.11.13
{% endshellcode %}

Agregando la opción `-s` al instalador, le estamos pidiendo que __descargue el código fuente de Node.js y lo compile en nuestro ambiente__. ¿Se entiende? Sin `-s`, descarga los binarios ya listos. Con `-s`, descarga el source y compila en nuestro ambiente. La ventaja de esta segunda opción es permitirnos personalizar la compilación de Node. Es para este proceso que necesitamos `build-essential` y `libssl-dev`, anteriormente instalados.

Si la instalación fue exitosa, ejecutar `node --version` debería mostrar la versión correcta.

### Instalando una segunda versión de Node

Hasta ahora, nada de lo que mostré parece ser sobresaliente, comparado con una instalación común y corriente de Node. La ventaja principal a la hora de usar NVM es poder instalar múltiples versiones de Node. Así que ahora vamos a probar los mismos pasos anteriores, pero con la versión v0.10.26