async function obtenerDatos(){
    let respuesta = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados")
    let datos = await respuesta.json();
    console.log(datos);

    datos.forEach(element => {

        document.getElementById('table').innerHTML+=`  <tr>
            <th scope="row"> ${element.id}</th>
            <td >${element.nombre} ${element.apellido}</td>
            <td> ${element.area}</td>
            <td> ${element.domicilio}</td>
            <td><button class="ver btn btngreen" data-toggle="modal" data-target="#modalPersona" id="${element.id}">Ver ${element.id}</button></td>
            </tr>`      
    
   });

   let btn = document.querySelectorAll(".ver");
   btn.forEach(item => {
    item.addEventListener('click', (e) => {
       mostrarUno(e.target.id);
    });
   })

} 

async function mostrarUno(id){
    let respuesta2 = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/"+id)
    let datos2 = await respuesta2.json();
    console.log(datos2);
    
    document.getElementById('pname').innerHTML= datos2.nombre + " " + datos2.apellido;
    document.getElementById('parea').innerHTML= datos2.area;
    document.getElementById('paddress').innerHTML= datos2.domicilio;
    document.getElementById('pphoto').src= datos2.foto;
}

async function modificarDatos(myData){
    const respuesta = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/"+myData.id, {
        method: "PUT",
        body:JSON.stringify(myData),
        headers:{"Content-type":"application/json"}
    });
    const data = await respuesta.json();
        console.log(data);
}

const mydata ={
    "nombre":"José",
    "apellido":"Buschiazzo",
    "area":"IT",
    "domicilio":"1234 Río Grande",
    "foto":"https://www.comunicaz.es/wp-content/uploads/2013/08/La-importancia-del-empleado.jpg",
    "id":"100"
}

let botonAgregar = document.querySelector(".addBtn");
botonAgregar.addEventListener('click', (e) => {modificarDatos(mydata)}); // solo funca con esa "e" de merda, 1hr al vicio

obtenerDatos();