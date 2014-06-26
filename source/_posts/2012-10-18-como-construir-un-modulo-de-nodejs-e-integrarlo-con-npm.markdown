---
layout: post
title: "Node.js: Cómo construir un paquete para npm"
date: 2012-10-18 16:13
comments: true
categories: 
tags: [Desarrollo, Node.js, Tutoriales, npmjs]
---

{% img left /images/misc/npm.png %}

¡Buen día gente! Hoy decido comenzar una serie de tutoriales para orientar a los nuevos usuarios de _Node.js_ acerca de qué cosas hacer y cómo hacerlas con esta maravillosa plataforma {% emoji blush %}

El tutorial de hoy girará en torno a cómo se crean módulos para __Node__ y cómo se publican en __npmjs.org__ para que estén al alcance de toda la comunidad. Si por esas casualidades llegaste al blog y no sabes de qué estoy hablando, a continuación te presento a las estrellas.

<!-- more -->

<br>

# Node.js

Tal cual lo dice su [sitio oficial](http://nodejs.org/), Node.js es una plataforma construida sobre el [motor JavaScript V8](https://developers.google.com/v8/) y orientada al desarrollo de todo tipo de aplicaciones de red de forma rápida, fácil y escalable. Node.js es, básicamente, Javascript implementado en el servidor.

<br>

# npm

_npm_ es el gestor de paquetes de Node.js por excelencia. Esta una herramienta de línea de comandos que __permite gestionar todas las dependencias de una aplicación hecha en Node.js.__ Si, por ejemplo, queremos usar el módulo de [underscore](https://github.com/jashkenas/underscore) en nuestro proyecto, solo tenemos que ejecutar el siguiente comando:

{% shellcode %}
npm install underscore
{% endshellcode %}

Puedes encontrar más info de _npm_ en su [sitio oficial](http://npmjs.org/).

Bien, aclarados estos dos puntos, vamos a construir nuestro primer módulo.

<br>

# Requisitos

* Node.js y npm (muy obvio, pero vale aclararlo).
* Café, mucho café {% emoji grin %}

<br>

# Objetivo

Vamos a crear una aplicación que reemplace parámetros del tipo __%clave%__ con una cadena que nosotros le vamos a proveer. Por ejemplo:

<pre>
-> Cadena de entrada: %home_dir%/Proyectos
-> Operación: %home_dir% => /home/sergio
-> Cadena de salida: /home/sergio/Proyectos
</pre>

¡Manos a la obra! <br><br>

# Node.js: Estructura de directorios

Esto no es precisamente un estándar sino más bien una convención entre desarrolladores acerca de cómo ordenar nuestro código fuente escrito para NodeJS. Para este proyecto vamos a ordenarlo de la siguiente manera:

<pre>param_replacer/
 ├── bin/
 |   └─ param_replacer
 ├── lib/
 |   └─ param_replacer.js
 ├── index.js
 ├── README.md
 └── package.json
</pre>

<br>

__¿Qué hay en bin/ ?__

Puedes colocar un script que permita la ejecución de tu aplicación desde la línea de comandos sin llamar a node. No es mágico, obviamente, pero sirve de mucho para cuando instalemos el paquete. Para nuestra aplicación de ejemplo no lo vamos a utilizar, así que será tema de otro artículo.

__¿Qué hay en lib/ ?__

Dentro de lib "aislaremos" todo el código de la aplicación. Es una manera de tener ordenado el directorio principal del paquete.

__¿Qué hay en el directorio principal?__

En el mismo creamos un index.js que sirve de atajo al script principal de nuestra aplicación, un _README.md_ (o _README.markdown_) que será mostrado como readme por defecto en la página de nuestro paquete, en el sitio de _npm_, y por último tenemos nuestro apreciado package.json. Este último archivo es indispensable a la hora de publicar nuestros módulos en _npm_, ya que el mismo contiene toda la info relevante como nombre del paquete, versión, colaboradores, keywords, dependencias, etc.

En breve veremos más acerca de _package.json_ y cómo configurar cada detalle del mismo. <br><br>

# Node.js: La función de reemplazo

Comenzaremos a programar {% emoji smile %} Como les comenté, toda la lógica de la aplicación fue a parar a _lib/param\_replacer.js_. Editemos ese archivo y juguemos.

{% gist f623e4627f78d1a4693b {"file":"param_replacer(1).js","direct_link":"https://gist.github.com/sergiolepore/f623e4627f78d1a4693b#file-param_replacer-1-js"} %}

Como vemos en la salida, nuestro script está reemplazando cualquier cosa encerrada entre % por un valor único. Podríamos mejorar un poco su comportamiento haciendo lo siguiente:

{% gist f623e4627f78d1a4693b {"file":"param_replacer(2).js"} %}

Mucho mejor. Con esta forma de aislar parámetros con sus reemplazos podemos jugar de muchas maneras, como por ejemplo, hacer un "hello world" multi idiomas:

{% gist f623e4627f78d1a4693b {"file":"param_replacer(3).js"} %}

Y ejecutamos:

{% shellcode {"cwd":"~/Proyecto/PaqueteNodejs"} %}
node lib/param_replacer.js
{% endshellcode %}

Bien, con esto ya tenemos la funcionalidad principal cubierta. Pero no es más que simple Javascript. ¿Dónde está la magia de _Node.js_ y _npm_? Sigamos debajo... <br><br>

# Node.js: Código modular

Una de las cosas que hacen a _Node.js_ una plataforma sólida es la manera en la que soluciona el aislar y exponer el código, _similar_ al `require` de PHP, pero robusto como el `import` de Python.

Los módulos en _Node.js_ se definen en un archivo `.js`, `.json` o `.node` y luego pueden ser importados en otros lugares de nuestra aplicación mediante el método `require`. Por ejemplo, si tenemos un módulo definido dentro de `lib/param_replacer.js`  y queremos usarlo dentro de un archivo `lib/otro_archivo.js`, solo basta con escribir:

{% gist f623e4627f78d1a4693b {"file":"otro_archivo.js"} %}

Dentro de la variable `replacer` tendremos a nuestro querido reemplazador de parámetros. Pero, ¿cómo se define un módulo? <br><br>

## Creando un módulo

Cuando invocamos al `require`, _Node.js_ lee el archivo que solicitamos y asigna el contenido del módulo a nuestra variable. Nuestro archivo no expone absolutamente todo el código, sino aquel que sea "exportado". Para ello se utiliza el método `exports`.

Modifiquemos nuestro `param_replacer.js` para que pueda exponer su funcionalidad:

{% gist f623e4627f78d1a4693b {"file":"param_replacer(4).js"} %}

Con esta modificación, nuestro código quedó completamente aislado en un archivo separado del resto, y expone un único método llamado `replace` que no es ni más ni menos que una función anónima.

Para ver a nuestro renovado replacer en acción, copiar el siguiente código en `index.js`:

{% gist f623e4627f78d1a4693b {"file":"index.js"} %}

Y ejecutamos:

{% shellcode {"cwd":"~/Proyecto/PaqueteNodejs"} %}
node index.js
{% endshellcode %}

Genial, nuestra aplicación se comporta de la misma manera, pero ahora es modular {% emoji smile %} ¿Qué mas hay que hacer? <br><br>

# Node.js: Carga de módulos

Ya vimos que desde el `index.js` de nuestro módulo se pueden hacer algunas pruebas rápidas, pero en estos casos el index cumple una función muy importante. Según la documentación de _Node.js_, cuando hacemos un `require` el compilador comienza a buscar por el archivo que estemos solicitando (algo obvio). Puede buscar un archivo específico (si defines su extensión) o bien por un archivo con extensiones `.js`, `.json` o `.node`, en ese orden de _fallbacks_. Veamos un ejemplo de todo esto.

Imaginemos que tenemos un módulo llamado `mi_libreria.js` y queremos usarlo en otro archivo:

{% gist f623e4627f78d1a4693b {"file":"index(2).js"} %}

En este caso, _Node.js_ buscará sólamente el archivo especificado. Pero también podemos usar el `require` de esta otra forma:

{% gist f623e4627f78d1a4693b {"file":"index(3).js"} %}

Al no especificar una extensión, _Node.js_ buscará primero un archivo llamado `mi_libreria.js`. En caso de no encontrarlo, intentará con `mi_libreria.json` y si así mismo falla, tratará con `mi_libreria.node`.

¿Y dónde intervienen los `index.js`?

En caso de tener problemas con la carga especificada anteriormente, el cargador de archivos intentará una última cosa... Buscar un archivo `index` dentro del directorio `mi_libreria`. Con los index sucede lo mismo que con otros archivos, buscará: <br><br>

<pre>
- ./mi_libreria/index.js
- ./mi_libreria/index.json
- ./mi_libreria/index.node
</pre>

Si todo falla, el compilador explota de manera horrenda. {% emoji grin %}

Entonces, ¿qué hacemos con el `index.js` actual? Apenas comencé el artículo, les comenté que se iba a usar de atajo para incluir nuestra librería principal. Así que reemplacemos todo el contenido por esto:

{% gist f623e4627f78d1a4693b {"file":"index(4).js"} %}

Con esta modificación podemos utilizar la librería como un paquete completo, sólo copiando el directorio donde estamos trabajando (param\_replacer/) y haciendo `require('param_replacer');` cuando lo necesitemos...

{% rawblock %}
<pre>mi_app/
 ├── liberias/
 |   └─ libs.js
 ├── node_modules/
 |   └─ param_replacer/
 ├── app.js ← este archivo puede hacer require('param_replacer') y todo funciona de maravillas
 └── otro.js
</pre>
{% endrawblock %}

Y esto no es todo, como les mostré arriba, existe un directorio mágico llamado node_modules que es el que contiene módulos de nuestras aplicaciones. El cargador de _Node.js_ también buscará por módulos dentro de ese directorio, siguiendo los criterios de carga que ya vimos. Genial, ¿no? Si quieren aprender más sobre esto, consulten la [documentación oficial](http://nodejs.org/docs/latest/api/modules.html).

Y este es el momento justo de presentar a nuestro héroe, __npm__. <br><br>

# npm: Configurando el paquete

Al momento en que publiquemos en _npm_, todo el contenido que tenemos dentro del directorio _param\_replacer_ será el contenido del paquete que estará en los [repositorios de _npm_](https://npmjs.org/). Además, un archivo `package.json` sirve para configurar este paquete. Veamos un ejemplo:

{% gist f623e4627f78d1a4693b {"file":"package.json"} %}

En [este](https://www.npmjs.org/doc/files/package.json.html) o [este otro](http://package.json.nodejitsu.com/) enlace encontrarán una descripción completa sobre todas las configuraciones que podemos cubrir con `package.json`. <br><br>

# npm: Publicando nuestro primer paquete

En este punto voy a considerar que nunca has creado una cuenta en NPM, así que voy a arrancar desde cero. Antes que nada necesitamos registrar un usuario para poder publicar. Se puede hacer de dos maneras, la _trivial_ y la _geek_ {% emoji grin %} <br><br>

## Forma trivial

Simplemente ingresando en la [página de registro](https://npmjs.org/signup), podemos completar nuestros datos y darnos de alta. ¡Recuerden su nombre de usuario y contraseña!.

A continuación, vas a la consola y ejecutas:

{% shellcode {"cwd":"~/Proyecto/PaqueteNodejs"} %}
npm adduser
{% endshellcode %}

Provees tus credenciales y listo. <br><br>

## Forma geek

Decidí llamarlo así ya que no se usan los métodos web, sino que se usa la aplicación de consola. Ejecutar lo siguiente:

{% shellcode {"cwd":"~/Proyecto/PaqueteNodejs"} %}
npm adduser
{% endshellcode %}

Es el mismo comando que usamos en la forma trivial. El mismo registra un nuevo usuario y configura, o configura solamente tu cuenta, dependiendo de si tenias un usuario registrado previamente (caso de que hayas registrado en web, o cambies de PC).

Para finalizar, sigues los pasos y ¡voila! Ya podemos publicar nuestro trabajo. <br><br>

## Publicando el paquete

Asegúrate de estar en el directorio principal (donde está el `package.json`). Una vez ahí, ejecuta:

{% shellcode {"cwd":"~/Proyecto/PaqueteNodejs"} %}
npm publish
{% endshellcode %}

Ahora intenta instalarlo en alguno de tus proyectos:

{% shellcode {"cwd":"~/Proyecto/OtroProyecto"} %}
npm install param_replacer
{% endshellcode %}

O instálalo para que esté disponible de modo global (en todos tus proyectos):

{% shellcode %}
npm install -g param_replacer
{% endshellcode %}

<br><br>

# npm: Administrando nuestros paquetes

Como es obvio, en todo proyecto siempre hay corrección de errores o se añaden funcionalidades nuevas. Para actualizar el paquete publicado, solo tienes que cambiar el valor de version y ejecutar nuevamente `npm publish`.

Si cometiste un error, ¡no importa! `npm uninstall` y `npm unpublish` lo solucionarán.

<br><br>

Bueno gente, eso fue todo por el momento. Si lo desean, pueden echarle un ojo a este proyecto en [Github](https://github.com/sergiolepore/param_replacer) y si tienen alguna duda, ¡no duden en hacérmela saber!

¡Hasta la próxima!