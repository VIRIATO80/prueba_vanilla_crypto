require('../css/style.css');

function cargarMonedas() {
    fetch('http://localhost:3000/api/users/all-monedas').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {

        //Celda marcada con id monedas
        const parent = document.querySelector('#monedas');
        // Recorremos la lista de monedas generando un par de columnas por cada iteración
        // Cada iteración debe generar esto --> 
        //  <div class="col-6">BTC</div>
        //  <div class="col-6">44444</div>
        let contenidoFinalTabla = '';
        for(let i=0; i < data.monedas.rates.length; i++) {
        const rate = data.monedas.rates[i];
        const fila =  '<div class="col-6">' + rate.asset_id_quote + '</div><div class="col-6">'+ rate.rate +'</div>';
        contenidoFinalTabla += fila;        
        }

        // Tras recorrer todas las monedas y tener el html de la tabla montado, es cuando lo inyectamos en el div padre que estaba vacío (id=monedas)
        parent.innerHTML += contenidoFinalTabla;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

document.querySelector('#boton').addEventListener('click', function(event) {
    console.log(event);
    cargarMonedas();
});
