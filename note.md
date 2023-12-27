## Lista de comandos usandos y su significado

1. npx create-next-app `nombreproyecto` ***Crear un proyecto de next, y sus dependencias***
2. npm i prisma -D: *instalar primas*
3. npx prisma init --datasource-provider `tipo de bd` ***inicializar prisma y su configuracion***
4. npx prisma migrate dev --name `nombre de a  migracion` ***Convertir los modelos de prisma a sintaxi de db***
5. 

`😉Instalar la extencion prisma`

`npx prisma studio` **Para poder ver la base de datos creada por la migracion**

## Carpetas utilizadas
* libs: *Para tener codigo reutilizable*
* components: *para tener los componentes de la aplicacion reutilizables*
* context: *para agregar el contexto*
* interfaces: *para trabajara con typescript*
* 
**en libs/priam.ts: esta es el archivos para poder conectar prisma usando el modulo instalado a la hora de generar la migracion, puesto que este `prisma/client`: nos permitira poder conectarnos a la base de datos desde codigo generado por prisma, ya agrega los tipos de datos**

``A la hora de estar trabajando con una instancia de prima client en desarrollo, cuando se ejecuta codigo de backend (que es cuando vamos a necesitar la coneccion de prima nextjs lo que hace es ejecutarse, por lo cual estara llamando conecciones innecesarias) por lo que creamos una validacion con el obejeto GLOBAL, para verificar si existe una coneccion.``

***RECORDAR AMPLIAR LA VARIABLE global***

## Rest API
*+ Es simplemente codigo de backedn que puede devolver datos en formato json, en lugar de devolver paginas. Esto resulta muy util, puesto que esl frontend puede ser cualquier frontend incluso una movil app. En este caso es React*

**El crear un api es solo una opcion por que ultimamente Nextjs tiene una nueva caracteristica llamads "server action" que es basicamente ejecutar codigo de backend en componentes de React**

`Para testiar la API, demos usar clientes rest como: "insomnia o postman"`

🧐 Cuando creamos una carpeta con [], indica que el contenido es dinamico.

*😬 En ts devemos de comprobar si el error existe o no*

Aparenntemente como guarda n memoria cache las rutas de notes fallan en desarrollo

### Ojo👀

*React Server Componente rsc: es basicamente codigo de react que se ejecuta en el backend. y como es codigo de backend puede llamar codigo de otra ruta (rutas de la API). **Si fuera un componente de react no puede hacer esto directamente. Recordar que por defectos son del server y si queremos del clinete devemos idicarlo con el `"use client"`***

`Esto esta bien en temas de seos cuando querramos cargar datos en una pagina, y queremos que se muestren prerenderizado desde el seervidor, pero cuando es en interactividad igual este note tenemos que convertirlo aun componente cliente por que necesita ejecutar CLICK o necesita ser logica que tenemos que manejar desde el lado cliente. 
Hay partes donde solo se necesita codigo del servodor nada mas, al final tenemos que ver cual es el idonio entre uno y el otro.`

El crear un contexto para los componentes (se podria tambien por medio de los prop, permite enclobar la aplicacion en un solo contexto, lo que permite acceder a los estados de la aplicacion. "Esto por que la lista esta arriba de el formulario"


*Este note provider lo dememos de crear y agregarlo en el layout principal, para que contenga al parametro `children`*


## OJO 👀. 

*Como estamos importando mucho el contexto vamos a crear un hook.*

`🎇Consejo: hala hora de crear nuestra interfaces, si tenemos que crear una para trabajar con un tipo de datos, en ves de crear una, podemos simplemente importarla desde prisma, asi nos evitamos estar poniendo cada campo. *Esto como por ejemplo con la entidad Note del curso de prisma y ts*`

Uso un `hook de ref`, para colocar el cursor en el primer input una ves que se han enviado los datos.