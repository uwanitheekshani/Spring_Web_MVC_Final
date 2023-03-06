generatePaymentId();
loadAllRentalsId();

function generatePaymentId() {
    $.ajax({
        url: baseURL + "payment/generatePaymentId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#paymentId').val(res.data);
            }
        }
    })
}


function loadAllRentalsId() {
    $("#selectReservation").empty();
    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
                for (let rent of resp.data) {
                    if(rent.rental_status=="Accepted") {
                        $("#selectReservation").append(`<option value="${rent.rentalId}">${rent.rentalId}</option>`);
                    }
                }

        }
    });
}

function searchRental(rentalId) {
    let response = "";
    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        async: false,
        success: function (resp) {
            response = resp.data.filter((i) => {
                return i.rentalId == rentalId;
            });
        }
    });
    return response;
}


$("#selectReservation").change(function () {
    let rentalId = $("#selectReservation").val();
    $("#txtAdRenId").val(rentalId);
    let res = searchRental(rentalId);
    if (res.length > 0) {
        $("#CDN").val(res[0].cusNic);
        $("#CPDd").val(res[0].pickUpDate);
        $("#CRDd").val(res[0].returnDate);
    }

});