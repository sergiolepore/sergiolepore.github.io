---
layout: post
title: "#Symfony2 - Optimizando el Enrutador"
date: 2012-10-30 12:47
comments: true
categories: 
tags: [Desarrollo, PHP, Symfony, Tutoriales]
---

{% img left /images/programming/symfony/symfony2-books.jpg %}

¡Buenos días! Hoy les traigo un pequeño _"truquito"_ para __mejorar el rendimiento del enrutador de Symfony2__ {% emoji smile %}

Si han trabajado con este _pequeño_ framework, bien sabrán que la definición de rutas es muy maleable y abstracta, tanto así que permite que nos preocupemos solamente por el patrón y configuraciones que la conformarán, pero no por la lógica de ruteo en sí misma. Esta lógica está implementada por las clases de __Routing de Sf2__, que se encargan de leer los archivos de configuración, hacen matches contra las peticiones y luego despachan el `request` a donde corresponda. Fácil, ¿no?

Es muy obvio, pero vale aclararlo, que __todo este comportamiento tiene un efecto negativo en el rendimiento__, tanto así que es necesario __optimizarlo lo más que se pueda.__ Symfony2 optimiza el proceso de match de rutas mediante la compilación de los archivos de routing en un archivo ubicado en la cache (ver `app/cache/prod/appprodUrlMatcher.php`), pero aún así el proceso sigue siendo perjudicial para nuestro proyecto. ¿Por qué? Porque seguimos dependiendo de PHP para manejar las reglas de matching de URL. __¿Y que tal si las expresiones regulares las maneja nuestro servidor web?__ Eso es lo que quiero compartirles hoy.

<!-- more -->

El componente de enrutador de Symfony2 viene con una herramienta muy útil que permite generar las todas las expresiones regulares necesarias para que Apache (con `mod_rewrite`) se haga cargo de esta tarea. La utilidad se accede a través del siguiente comando:

{% shellcode %}
php app/console router:dump-apache
{% endshellcode %}

__Esto hará que se compilen todas las rutas en diversos RewriteRules que podremos añadir a nuestro .htaccess o directo sobre el VirtualHost.__

El resultado del comando se mostrará en consola, lo cual es cómodo si tienes pocas rutas. En cambio si tu proyecto tiene más de 10 definiciones, te recomiendo redirigir toda la salida del comando a un archivo:

{% shellcode %}
php app/console router:dump-apache > archivo_destino
{% endshellcode %}

Lindo, ¿verdad? {% emoji smile %}

Una cosita más, en la [documentación oficial](http://symfony.com/doc/current/book/routing.html) pueden aprender más acerca de cómo funciona el enrutador de Sf2.

¡Saludos!