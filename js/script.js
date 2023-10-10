const IMAGES_DATA = {
    categorias: {
        sinreserva: [
            "Atp-",
            "13",
            "16",
            "18",
            "Cxxx-"
        ],
        conreserva: [
            "Atp-Adv",
            "13Adv",
            "16-",
            "18Adv"
        ]
    },
    leyendas: [
        "7-45",
        "10-46",
        "Adulta-44", 
        "ConReservas-43"
    ],
    descriptores: [
        "ComplejidadTematicas", 
        "ComportamientosPeligrosos", 
        "Discriminacion", 
        "LenguajeInapropiado", 
        "Miedo", 
        "Sexo", 
        "SustanciasPsicoactivas", 
        "Violencia"
    ],
    ddDataSinReserva: [],
    ddDataConReserva: [],
    ddDataLeyendas: []
}
let selectCatSinReserva = $("#select-categoria-sinreserva");
let selectCatConReserva = $("#select-categoria-conreserva");
let selectLeyenda = $("#select-leyenda");
let checkboxDescriptores = $("#checkbox-descriptores");
let categorias = IMAGES_DATA.categorias;
function cargarSelectCategoriasSinreserva(){
    selectCatSinReserva.innerHTML = "";
    for (const cat of categorias.sinreserva) {
        let imgUrl = "assets/calificacion-edad/Caec_" + cat + "Trans.png";
        selectCatSinReserva.innerHTML += `<option></option>`;
        IMAGES_DATA.ddDataSinReserva.push({
            imageSrc: imgUrl,
            value: imgUrl,
            selected: false
        })
    }
    selectCatSinReserva.ddslick({
        data: IMAGES_DATA.ddDataSinReserva,
        width: 350,
        selectText: "Categoría sin reservas",
        onSelected: function(data){
            document.getElementById("logo-categoria").innerHTML = `
                <div><img class="logo-categoria" src="${data.selectedData.value}"></div>
            `
        }   
    });
}
function cargarSelectCategoriasConreserva(){
    selectCatConReserva.innerHTML = "";
    for (const cat of categorias.conreserva) {
        let imgUrl = "assets/calificacion-edad/Caec_" + cat + "Trans.png";
        selectCatConReserva.innerHTML += `<option></option>`;
        IMAGES_DATA.ddDataConReserva.push({
            imageSrc: imgUrl,
            value: imgUrl,
            selected: false,
        })
    }
    selectCatConReserva.ddslick({
        data: IMAGES_DATA.ddDataConReserva,
        selectText: "Categoría con reservas",
        width: 350,
        onSelected: function(data){
            document.getElementById("logo-categoria").innerHTML = `
                <div><img class="logo-categoria" src="${data.selectedData.value}"></div>
            `
        }   
    });
}
function cargarSelectLeyendas(){
    let leyendas = IMAGES_DATA.leyendas;
    for (const leyenda of leyendas) {
        let imgUrl = "assets/leyendas/Caec_Leyenda-" + leyenda + ".png";
        selectLeyenda.innerHTML += `<option></option>`;
        IMAGES_DATA.ddDataLeyendas.push({
            imageSrc: imgUrl,
            value: imgUrl,
            selected: false
        })
    }
    selectLeyenda.ddslick({
        data: IMAGES_DATA.ddDataLeyendas,
        selectText: "Leyenda",
        width: 350,
        onSelected: function(data){
            if(data.selectedData.value=="sinleyenda"){
                document.getElementById("logo-leyenda").innerHTML = "";
                document.getElementById("categoria-separacion").style.display = "none"
            } else {
                document.getElementById("categoria-separacion").style.display = "flex"
                document.getElementById("logo-leyenda").innerHTML = `
                    <div><img class="logo-leyenda" src="${data.selectedData.value}"></div>
                `
            }
        }
    })
}
/*
function hayDescriptores() {
    let descriptores = document.getElementById("imagenContainer").children ?? null;
    if (descriptores) {
        return true;
    } else{
        return false;
    }
}
function cargarBarraVertical() {
    let barra = document.getElementById("barra-vertical");
    if(hayDescriptores()) {
        barra.style.display = "block";
    }
    else {
        barra.style.display = "none";
    }
}
*/
function cargarCheckboxDescriptores() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var imagenContainer = document.getElementById("imagenContainer");
    var imagenesSeleccionadas = []; 
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var descriptor = checkbox.getAttribute("name");
        /*cargarBarraVertical();*/
        if (checkbox.checked) {
          var imagen = document.createElement("img");
          imagen.src = `./assets/descriptores-tematicos/descriporestrans/${descriptor}.png`;
          imagen.style.objectFit = "contain";
          imagen.style.width = "70%"; 
          imagenesSeleccionadas.push({ checkbox, imagen }); // Agregar checkbox e imagen al array
        } else {
          // Filtrar el array para eliminar el elemento correspondiente
          imagenesSeleccionadas = imagenesSeleccionadas.filter(function (item) {
            return item.checkbox !== checkbox;
          });
        }
        // Actualizar el contenido del contenedor de imágenes
        imagenContainer.innerHTML = "";
        imagenesSeleccionadas.forEach(function (item) {
          imagenContainer.appendChild(item.imagen);
        });
      });
    });
  }
  function descargarLogo(){
    let div = document.querySelector("#logo");
    let w = div.offsetWidth - 1;
    let h = div.offsetHeight - 1;
    html2canvas(div, {
        border: 0,
        height: h ,
        width: w,
        scale: 5,
        imageSmoothingEnabled: false
    })
    .then((canvas2) => {
        let a = document.createElement('a');
        document.body.appendChild(a)
        a.href = canvas2.toDataURL("image/png");
        //nombre del archivo con el cual se descarga 
        let nombreLogo = prompt("Ingrese el nombre del archivo: ");
        if (!nombreLogo) {
            // Mostrar un mensaje de error
            alert("Ingrese el nombre del archivo.");
            return;
          }
        a.download = nombreLogo + '.png';
        a.click();
    })
} 
document.addEventListener("DOMContentLoaded", function(){
    cargarSelectCategoriasSinreserva()
    cargarSelectCategoriasConreserva()
    cargarSelectLeyendas()
    cargarCheckboxDescriptores();
    /* Funcion para sacar estilos de hover*/
    const boton = document.getElementById("miBoton");
    setTimeout(function () {
        boton.style.transition = "background-color 0.3s, color 0.3s, transform 0.5s";
    }, 3000);
})