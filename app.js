
let contenedorPadre = document.getElementById("contenedorPadre");
let mostrar_carrito = document.getElementById("mostrar_carrito");
let modalContainer = document.getElementById("modal-container");

let productos = [
    {
        
        nombre: "Jabón Artesanal",
        precio: 8000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://d1ih8jugeo2m5m.cloudfront.net/2022/03/como-hacer-jabones-artesanales-1-1200x685.jpg",
        cantidad: 1,
    },

    {
        nombre: "Shampoo Romero",
        precio: 12000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://m.media-amazon.com/images/I/41rAfvVUg-L.jpg",
        cantidad: 1,
    },

    {
        nombre: "Cepillo para Cabello",
        precio: 7000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://kavila.co/wp-content/uploads/2021/04/WhatsApp-Image-2021-04-06-at-6.42.41-PM.jpeg",
        cantidad: 1,
    },

    {
        nombre: "Aceite de Coco",
        precio: 15000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://www.semana.com/resizer/bYO2s40r6Bs9pq4GAIt9WWJrw8k=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/V7NJXAQYLRDULOITYF7WLL4JFQ.jpg",
        cantidad: 1,
    },

    {
        nombre: "Cepillo de dientes",
        precio: 6000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://materialesecologicos.es/wp-content/uploads/2018/08/cepillo-dientes-bambu-cerdas-carbon-activo.jpg",
        cantidad: 1,
    },

    
    {
        nombre: "Kit Corporal",
        precio: 25000,
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam repellat officia, sequi repudiandae reiciendis nihil, similique quaerat.",
        img: "https://www.productosdelbosqueseco.com/wp-content/uploads/2021/12/infusionescorazonmini-4.jpg",
        cantidad: 1,
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((ListaProductos) => {

    let content = document.createElement ("div");
    content.className = "cards";
    content.innerHTML = `
    <img src = "${ListaProductos.img}">
    <h2>${ListaProductos.nombre}</h2>
    <p>${ListaProductos.descripcion}</p>
    <span class= "precio">${ListaProductos.precio} </span>
    `;

    contenedorPadre.append(content);

    let btn_comprar = document.createElement("button");
    btn_comprar.innerText = "Comprar";
    btn_comprar.className = "comprar";

    content.append(btn_comprar);

    btn_comprar.addEventListener("click", () => {

        let repeat = carrito.some ((repeatProduct) => repeatProduct.nombre === ListaProductos.nombre);
        console.log(repeat);

        if(repeat === true){
            carrito.map((prod) =>{
                if(prod.nombre === ListaProductos.nombre){
                    ListaProductos.cantidad ++;
                }
            })
        } else{
            carrito.push({
                img: ListaProductos.img,
                nombre: ListaProductos.nombre,
                cantidad: ListaProductos.cantidad,
                precio: ListaProductos.precio,
        
        });
        console.log(carrito);
        guardarLocalS();
    }

    });

});



/*Mostrar carrito*/

let renderCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    let modalHeader = document.createElement("div");
    modalHeader.className= "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">carrito</h1>
    `;
    modalContainer.append(modalHeader);

    let modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);

    carrito.forEach((ListaProductos) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${ListaProductos.img}">
        <h3>${ListaProductos.nombre}</h3>
        <p>${ListaProductos.precio} </p>
        <p>cant:${ListaProductos.cantidad}</p>
        `;

        modalContainer.append(carritoContent)

        let eliminar = document.createElement ("span");
        eliminar.innerText = "x";
        eliminar.className = "delete product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);

        
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `El total de tu compra es: ${total} `;
    modalContainer.append(totalBuying);
};

mostrar_carrito.addEventListener("click", renderCarrito);

let eliminarProducto = () => {
    let foundId = carrito.find((element) => element.nombre);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    renderCarrito();
    saveLocal();
};

let guardarLocalS = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


