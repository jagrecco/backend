const express = require("express");
const fs = require("fs");

let arrayOjt

class Contenedor {

	constructor(archivo){
		this.archivo=archivo
	}

	leerObjetos(cualObjeto){
		try{

            if (cualObjeto==null) {

                const contenido = fs.readFileSync(this.archivo,"utf-8")
    
                arrayOjt=JSON.parse(contenido)

            } else {

                const contenido = fs.readFileSync(this.archivo,"utf-8")
    
                arrayOjt=JSON.parse(contenido)
                
                const objetoRandom=arrayOjt.find(element =>{

                    if (element.id==cualObjeto) {
                        return element
                    }
                })

                arrayOjt=objetoRandom

            }
            
            return arrayOjt
   
		}
		catch(err){
			console.log (err)
		}
	}

}

const app = express();

const PORT = 8080;

const prueba = new Contenedor("productos.txt")

prueba.leerObjetos()

app.get("/", (req, res) => {
  res.send('<h1>¡Bienvenidos al servidor mi primer express!</h1>'
  );
  
});

app.get("/productos", (req, res) => {

    const prods=prueba.leerObjetos()
    let htmlSalida=""

    prods.forEach(element =>{
        htmlSalida= htmlSalida + `<p>id:${element.id}</p><h3>Titulo: ${element.title}</h3><p>price: $${element.price}</p><a href=${element.thumbnail}>${element.thumbnail}</a>`
    })

    res.send(htmlSalida)
    
});


app.get("/productoRandom", (req, res) => {

    const idRamdom=Math.floor(Math.random() * 3) + 1
    
    const prods=prueba.leerObjetos(idRamdom)

    let htmlSalida=`<p>id:${prods.id}</p><h3>Titulo: ${prods.title}</h3><p>price: $${prods.price}</p><a href=${prods.thumbnail}>${prods.thumbnail}</a>`
    
    res.send(htmlSalida)
    
});


const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT} y re feliz`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));