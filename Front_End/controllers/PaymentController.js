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
            console.log(resp.data);
        }

    });

    return response;
}


$("#selectReservation").change(function () {
    let rentalId = $("#selectReservation").val();
    $("#txtAdRenId").val(rentalId);
    let res = searchRental(rentalId);

    console.log(res);
    if (res.length > 0) {
        let cusN=res[0].cusNic;
        let pickUpDate=res[0].pickUpDate;
        let returnDate=res[0].returnDate;
        console.log(cusN);
        $("#CDN").text(cusN);
        $("#CPDd").text(pickUpDate);
        $("#CRDd").text(returnDate);

    }

});

$("#btnPay").click(function () {

    makePayment();
});

function makePayment(){
    let paymentId=$('#paymentId').val();
    let damageCost= $("#txtDmCost").val();
    let extraKmCost= $("#txtDaDes").val();
    // let DamageDes= $("#txtDmCost").val();
    let rentalId= $("#txtAdRenId").val();
    let totalDamageWaiwerAmount;
    let registrationId;
    let dailyRate;
    let paymentStatus="Paid";
    let date=$("#txtAdPAyDate").val();
    let pickUpDate= $("#CPDd").text();
    let returnDate= $("#CRDd").text();

    // let pickUpDate="";
    // let returnDate="";

    console.log(pickUpDate);
    var pickupDate = new Date(pickUpDate);
    var day = new Date(returnDate)
    var differenceInTime = day.getTime() - pickupDate.getTime();
    var differenceIndays = differenceInTime / (1000 * 3600 * 24);
    // console.log("date difference : "+differenceIndays);

    let rentAmount=(differenceIndays*dailyRate);
    $("#txtRetDamA").val(rentAmount)
    let total=rentAmount+(totalDamageWaiwerAmount-damageCost);

    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (let rent of resp.data) {
                if(rent.rentalId==rentalId) {
                  totalDamageWaiwerAmount=rent.total_damage_waiver_payment;
                    registrationId=rent.registrationID;
                    pickUpDate=rent.pickUpDate;
                    returnDate=rent.returnDate;
                }
            }

        }
    });


    $.ajax({
        url: baseURL + "car",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (let car of resp.data) {
                if(car.registrationId==registrationId) {
                    dailyRate=car.dailyRate;
                }
            }

        }
    });


    var payment = {
        paymentId: paymentId,
        date: date,
        rent_amount: rentAmount,
        extra_mileage: extraKmCost,
        total: total,
        damage_cost: damageCost,
        damageDescription: DamageDes,
        payment_status: paymentStatus,
        rentalId: rentalId,
    }

    $.ajax({
        url: baseURL+"payment",
        method: "post",
        data : JSON.stringify(payment),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Payment Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            // clearDriverTextFields();
        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Payment Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });


}


   //===================================Incomes=============================================

function loadAllDailyIncomes() {
    $('#tblDailyIncome').empty();
    $.ajax({
        url: baseUrl + "payment/dailyIncome",
        method: "GET",
        success: function (res) {
            for (const income of res.data) {
                console.log(income);
                let row = <tr><td>${income.rentPrice}</td><td>${income.totalPayment}</td></tr>;
                $('#tblDailyIncome').append(row);
            }
        }
    })
}