generatePaymentId();
loadAllRentalsId();
// selectReservation();

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
    $("#selectReservation").prepend(`<option>---Select Id---</option>`)
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
    let rentalId= $("#txtAdRenId").val();

    $.ajax({
        url: baseURL + "rental",
        dataType: "json",
        success: function (resp) {

            let totalDamageWaiwerAmount = null;
            let registrationId = null;

            for (let rent of resp.data) {
                if(rent.rentalId==rentalId) {
                    let pickUpDate= new Date($("#CPDd").text());
                    let returnDate= new Date($("#CRDd").text());

                    totalDamageWaiwerAmount=rent.total_damage_waiver_payment;
                    registrationId=rent.registrationID;

                    var differenceInTime = pickUpDate.getTime() - returnDate.getTime();
                    var differenceIndays = differenceInTime / (1000 * 3600 * 24);


                    let paymentId=$('#paymentId').val();
                    let damageCost= $("#txtDmCost").val();
                    let extraKmCost= parseFloat($("#txtExtraKC").val()) || 0;
                    let damageDes= $("#txtDaDes").val();
                    let paymentStatus="Paid";
                    let date=$("#txtAdPAyDate").val();

                    $.ajax({
                        url: baseURL + "car",
                        dataType: "json",
                        success: function (resp) {
                            let dailyRate=0;

                            for (let car of resp.data) {
                                if(car.registrationId==registrationId) {
                                    dailyRate=car.dailyRate;

                                }
                            }

                            var rentAmount = -(differenceIndays*dailyRate);
                            console.log(rentAmount)

                            let total=rentAmount+(totalDamageWaiwerAmount-damageCost)+extraKmCost;
                            // let allTot=total;

                            $('#txtRetDamA').val(rentAmount);
                            $('#txtDriverWag').val(total);

                            var payment = {
                                paymentId: paymentId,
                                date: date,
                                rent_amount: rentAmount,
                                extra_mileage: extraKmCost,
                                total: total,
                                damage_cost: damageCost,
                                damageDescription: damageDes,
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
                    });


                }
            }

        }
    });





    //
    // let total=rentAmount+(totalDamageWaiwerAmount-damageCost);

    // var payment = {
    //     paymentId: paymentId,
    //     date: date,
    //     rent_amount: rentAmount,
    //     extra_mileage: extraKmCost,
    //     total: total,
    //     damage_cost: damageCost,
    //     damageDescription: damageDes,
    //     payment_status: paymentStatus,
    //     rentalId: rentalId,
    // }

    // console.log(payment)
    // $.ajax({
    //     url: baseURL+"payment",
    //     method: "post",
    //     data : JSON.stringify(payment),
    //     contentType:"application/json",
    //     success: function (resp) {
    //         console.log(resp);
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'success',
    //             title: "Payment Added Successfully",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //         // clearDriverTextFields();
    //     },
    //     error: function(error) {
    //         let prase = JSON.parse(error.responseText);
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'error',
    //             title: "Payment Not Added Successfully",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    // });


}


   //===================================Incomes=============================================

// function loadAllDailyIncomes() {
//     // $('#tblDailyIncome').empty();
//     $.ajax({
//         url: baseURL + "payment/dailyIncome",
//         method: "GET",
//         success: function (res) {
//             let tot=0;
//             for (let income of res.data) {
//                 console.log(income);
//                 for (i=0;i<income.length;i++) {
//                     tot+ = income.total;
//                     $("#admin-daily-income").text(tot);
//                 }
//             }
//         }
//     })
// }