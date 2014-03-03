---
layout: post
title: "#Doctrine2: Comportamiento #softdelete en #Symfony2"
date: 2012-12-04 10:03
comments: true
categories: 
tags: [Desarrollo, PHP, Symfony, Tutoriales]
---

{% img center /images/programming/symfony/symfony2-books.jpg %}

¡Buenos días! ¡Mucho tiempo que no compartía un artículo con ustedes! Hoy les traigo un pequeño _how-to_ sobre cómo __habilitar la funcionalidad SoftDeleteable de Doctrine2 usando Symfony2.__

Para los que alguna vez usamos la primera versión de __Doctrine__, bien recordamos que el comportamiento de _SoftDelete_ era nativo en el ORM. Con la versión 2 las cosas han cambiado. Este tipo de funciones ya no son nativas pero se pueden habilitar a través de extensiones. <br><br>

<!-- more -->

# Requisitos

* Symfony 2.1 con composer
* Doctrine 2.x
* Annotation Mapping para Entidades
* YML para la configuración de servicios

<br><br>

# 1 - Instalando DoctrineExtensions

Usando `composer.phar`, la instalación de módulos, bundles, extensiones o plugins es muy sencilla. Lo primero que tenemos que hacer es abrir nuestro `composer.json` y agregar la siguiente línea al array de requires:

{% codeblock composer.json lang:json %}
{
  "require": {
    "gedmo/doctrine-extensions": "dev-master"
  }
}
{% endcodeblock %}

Guardamos el archivo y procedemos a actualizar las dependencias de nuestro proyecto:

{% blockquote %}
php composer.phar update
{% endblockquote %}
<br><br>

# 2 - Configurando las extensiones como Servicios

Ahora que ya tenemos las extensiones instaladas, debemos de configurar Doctrine para utilizarlas. Voy a ser breve en este tutorial ya que __sólo explicaré como habilitar SoftDelete__, pero `Gedmo/DoctrineExtensions` nos permite utilizar los siguientes comportamientos: _Translatable, Sluggable, Loggable, Timestampable, Tree y Sortable_. Si te interesa alguno de ellos, [pásate por aquí](https://github.com/l3pp4rd/DoctrineExtensions/blob/master/doc/symfony2.md) para aprender a usarlos.

__Symfony2__ tiene una arquitectura muy bella que permite configurar casi todas las dependencias y clases a modo de servicios y completamente _desacoplados_ (gracias al [_patrón de inyección de dependencias y el DIC_](http://symfony.com/doc/current/book/service_container.html)). Para las extensiones de Doctrine vamos a crear un nuevo archivo en `app/config` con el nombre de `doctrine_extensions.yml` y luego lo importaremos en el archivo `app/config/config.yml`:

{% codeblock config.yml lang:yml %}
imports:
    - { resource: doctrine_extensions.yml }
{% endcodeblock %}

Dentro del archivo `doctrine_extensions.yml`, copiaremos lo siguiente:

{% codeblock doctrine_extensions.yml lang:yml %}
services:
    extension.listener:
        class: Acme\DemoBundle\Listener\DoctrineExtensionListener
        calls:
            - [ setContainer, [ @service_container ] ]
        tags:
            - { name: kernel.event_listener, event: kernel.request, method: onKernelRequest }

    gedmo.listener.softdeleteable:
        class: Gedmo\SoftDeleteable\SoftDeleteableListener
        calls:
            - [ setAnnotationReader, [ @annotation_reader ] ]
        tags:
            - { name: doctrine.event_subscriber, connection: default }
{% endcodeblock %}

Con esto ya hemos configurado las extensiones como un servicio que será ejecutado cada vez que el _Kernel_ reaccione (para configurar Doctrine) y cada vez que Doctrine dispare un evento (como la eliminación de una entidad, que es lo que nos interesa).

Ahora necesitamos el _Listener_ que hará que Doctrine incorpore las extensiones configuradas. Para ello debemos crear la clase `Acme/DemoBundle/Listener/DoctrineExtensionListener.php` con el siguiente contenido:

{% codeblock DoctrineExtensionListener.php lang:php %}
<?php
namespace Acme\DemoBundle\Listener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class DoctrineExtensionListener implements ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    public function setContainer(ContainerInterface $container = null) 
    {
        $this->container = $container;
    }

    public function onKernelRequest(GetResponseEvent $event) 
    {
        $doctrine = $this->container->get('doctrine');
        $doctrine->getEntityManager()->getConfiguration()->addFilter(
            'soft-deleteable',
            'Gedmo\SoftDeleteable\Filter\SoftDeleteableFilter'
        );

        $em = $doctrine->getEntityManager();
        $em->getFilters()->enable('soft-deleteable');
    }
}
?>
{% endcodeblock %}

Vale aclarar que __`Acme\DemoBundle` debe ser reemplazado por el Bundle que ustedes utilicen__, y recuerden de actualizar el `doctrine_extensions.yml` con el nombre de su clase!!! <br><br>

# 3 - Configurar las entidades

Habilitar la extensión __no__ hará que todas las entidades que eliminemos hereden el comportamiento _automágicamente_.

Para que un objeto sea _SoftDeleteable_ debemos configurarlo. A continuación voy a mostrar cómo se hace con _Annotations_ de PHP, pero es igual para YML o XML:

{% codeblock Entity.php lang:php %}
<?php

namespace Acme\DemoBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Entidad
 *
 * @ORM\Table()
 * @ORM\Entity()
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 */
class Entidad
{
    // ...

    /**
     * @ORM\Column(name="deletedAt", type="datetime", nullable=true)
     */
    private $deletedAt;

    // ...
}
?>
{% endcodeblock %}

<br><br>

# 3 - Probar el comportamiento

Este es el último paso de nuestra travesía. Si eliminamos un objeto usando Doctrine y luego revisamos la base de datos, veremos que el campo _deletedAt_ tiene el _timestamp_ de eliminación {% emoji smile %} __¡Esto es SoftDeleteable Behavior!__

{% codeblock Controller.php lang:php %}
<?php

namespace Acme\DemoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MiControlador extends Controller
{
    public function eliminarAction() 
    {
        $em = $this->getDoctrine()->getEntityManager();
        $entidad = $em->getRepository('DemoBundle:Entidad')->find(1); // suponemos que hay un Entidad id 1
        // $entidad existe
        $entidad->getDeletedAt(); // retorna NULL

        $em->remove($entidad);
        $em->flush();

        $entidad = $em->getRepository('DemoBundle:Entidad')->find(1);
        // $entidad ahora es NULL

        // desactivando el filtro softdeleteable, podremos retornar las entidades eliminadas anteriormente
        $em->getFilters()->disable('soft-deleteable');

        $entidad = $em->getRepository('DemoBundle:Entidad')->find(1);
        // $entidad vuelve a ser un objeto tipo Entidad
        $entidad->getDeletedAt(); // retorna un \DateTime
    }
}
?>
{% endcodeblock %}

<br><br>

Bien, eso fue todo. ¡Espero les haya sido de utilidad!

¡Hasta la próxima!

<br><br>

{% rawblock %}
<pre>
            /\___/\
            )     (
           =\     /=
             )   (
            /     \
            )     (
           /       \
           \       /
            \__ __/
               ))
              //
             ((
              \)
</pre>
{% endrawblock %}