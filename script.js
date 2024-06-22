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
