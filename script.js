document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    function initMap() {
        var mapOptions = {
            center: new google.maps.LatLng(4.7110, -74.0721),
            zoom: 10,
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Add markers to the map
        var markers = [
            { position: { lat: 4.7110, lng: -74.0721 }, title: 'Punto de pago 1' },
            { position: { lat: 4.6510, lng: -74.0821 }, title: 'Punto de pago 2' },
            { position: { lat: 4.7010, lng: -74.0621 }, title: 'Punto de pago 3' }
        ];

        markers.forEach(function(marker) {
            new google.maps.Marker({
                position: marker.position,
                map: map,
                title: marker.title
            });
        });
    }
    initMap();
});

document.addEventListener("DOMContentLoaded", function() {
    // Event listener for the payment options button
    document.getElementById('payment-options-button').addEventListener('click', function() {
        // Show the payment options modal
        $('#paymentOptionsModal').modal('show');
    });

    // Event listener for the billing modal button (first option)
    document.getElementById('openBillingModal').addEventListener('click', function() {
        // Hide the payment options modal and show the billing modal
        $('#paymentOptionsModal').modal('hide');
        $('#billingModal').modal('show');
    });

    // Event listener for the billing modal button (second option)
    document.getElementById('openCardPaymentModal').addEventListener('click', function() {
        // Hide the payment options modal and show the billing modal
        $('#paymentOptionsModal').modal('hide');
        $('#billingModal').modal('show');
    });

    // Event listener for the continue button in the billing modal
    document.getElementById('continueToPayment').addEventListener('click', function() {
        // Validate the billing form
        if (document.getElementById('billingForm').checkValidity()) {
            // Hide the billing modal and show the payment modal
            $('#billingModal').modal('hide');
            $('#paymentModal').modal('show');
        } else {
            alert('Por favor complete todos los campos obligatorios.');
        }
    });

    // Validation for the payment form
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value;
        const cvc = document.getElementById('cvc').value;
        const expiryMonth = document.getElementById('expiryMonth').value;
        const expiryYear = document.getElementById('expiryYear').value;
        const installments = document.getElementById('installments').value;

        // Validate card number (16 digits)
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(cardNumber)) {
            alert('El número de tarjeta debe tener 16 dígitos.');
            return;
        }

        // Validate CVC (3 digits)
        const cvcRegex = /^\d{3}$/;
        if (!cvcRegex.test(cvc)) {
            alert('El CVC debe tener 3 dígitos.');
            return;
        }

        // Validate expiry date (month and year selected)
        if (expiryMonth === "" || expiryYear === "") {
            alert('Por favor seleccione una fecha de vencimiento válida.');
            return;
        }

        // Validate number of installments
        if (installments === "") {
            alert('Por favor seleccione el número de cuotas.');
            return;
        }

        // If all validations pass
        alert('Pago realizado con éxito');
    });

    // Ensure only numeric input for card number and CVC
    document.getElementById('cardNumber').addEventListener('input', function(event) {
        this.value = this.value.replace(/\D/g, '');
    });

    document.getElementById('cvc').addEventListener('input', function(event) {
        this.value = this.value.replace(/\D/g, '');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Consultar la placa almacenada en localStorage
    var placa = localStorage.getItem('placa');
    if (placa) {
        consultarPlaca(placa);
        actualizarPlacas(placa);
    }

    // Manejar el envío del formulario directo
    document.getElementById("formGetEstadoCuenta").addEventListener("submit", function(event) {
        event.preventDefault();
        var busqueda = document.getElementById("txtBusqueda").value;

        if(busqueda.trim() === "") {
            alert("Por favor ingrese un número de identificación o placa del vehículo.");
            return;
        }

        // Consultar la placa ingresada directamente
        consultarPlaca(busqueda);
        actualizarPlacas(busqueda);
    });
});

function consultarPlaca(placa) {
    if (placa) {
        fetch(`/proxy.php?placa=${placa}`)
            .then(response => response.text())
            .then(data => {
                const filteredData = filtrarDatos(data);
                document.getElementById('placa').innerText = filteredData.placa;
                document.getElementById('numeroVin').innerText = filteredData.numeroVin;
                document.getElementById('marca').innerText = filteredData.marca;
                document.getElementById('modelo').innerText = filteredData.modelo;
            })
            .catch(error => {
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.innerHTML = `<p style="color: red;">Error al consultar la placa. Intente nuevamente.</p>`;
                console.error('Error:', error);
            });
    }
}

function actualizarPlacas(placa) {
    document.querySelectorAll('.placa').forEach(function(td) {
        td.innerText = placa;
    });
}

function filtrarDatos(data) {
    const result = {};

    const placaMatch = data.match(/PLACA:\s*([A-Z0-9]+)/);
    const vinMatch = data.match(/NUMERO VIN:\s*([A-Z0-9*]+)/);
    const marcaMatch = data.match(/MARCA:\s*([A-Z]+)/);
    const modeloMatch = data.match(/MODELO:\s*([0-9]+)/);

    result.placa = placaMatch ? placaMatch[1] : 'No disponible';
    result.numeroVin = vinMatch ? vinMatch[1] : 'No disponible';
    result.marca = marcaMatch ? marcaMatch[1] : 'No disponible';
    result.modelo = modeloMatch ? modeloMatch[1] : 'No disponible';

    return result;
}