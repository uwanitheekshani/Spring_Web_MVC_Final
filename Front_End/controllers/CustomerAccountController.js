CustomerAccount();

function CustomerAccount(){
        $("#orderTable").empty();
        $.ajax({
            url: baseURL+"rental",
            dataType: "json",
            success: function (resp) {


                for (let acc of resp.data) {
                    var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.registrationID + '</td><td>' + acc.driverID + '</td><td>' + acc.total_damage_waiver_payment + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.pickupLocation + '</td><td>' + acc.returnLocation + '</td><td>' + acc.payment_slip + '</td><td>' + acc.rental_status + '</td></tr>';
                    $("#orderTable").append(row);

                }
                bindRentRowClickEvents();
            }
        });
}

$("#btnRentCancel").click(function () {
    let rentalID = $("#cusrentId").val();
    $.ajax({
        url: baseURL+"rental?rentalId=" + rentalID + "",
        method: "delete",
        dataType:"json",
        success: function (resp) {
            alert(resp.message);
            // resp.data.image_1;
            CustomerAccount();
        },
        error:function (error){
            alert(JSON.parse(error.responseText).message);
        }
    });
});


function bindRentRowClickEvents() {
    $("#orderTable>tr").click(function () {
        let rentalId = $(this).children(":eq(0)").text();
        let registrationID = $(this).children(":eq(1)").text();
        let driverID = $(this).children(":eq(2)").text();
        let total_damage_waiver_payment = $(this).children(":eq(3)").text();
        let pickUpDate = $(this).children(":eq(4)").text();
        let returnDate = $(this).children(":eq(5)").text();
        let pickupLocation = $(this).children(":eq(6)").text();
        let returnLocation = $(this).children(":eq(7)").text();
        let rental_status = $(this).children(":eq(8)").text();

        $("#cusrentId").val(rentalId);
        $("#txtCusPickDate").val(pickUpDate);
        $("#txtCusReturnDate").val(returnDate);
        $("#txtCusPickLocation").val(pickupLocation);
        $("#txtCusReturnLocation").val(returnLocation);
    });
}

   //==================================================


// Update rent details
$("#btnRentUpdate").click(function () {

    let rentalId = $("#cusrentId").val();
    let cusNic = $("#anic").text();
    let pickUpDate = $("#txtCusPickDate").val();
    let returnDate =$("#txtCusReturnDate").val();
    let pickupLocation = $("#txtCusPickLocation").val();
    let returnLocation = $("#txtCusReturnLocation").val();
    let driverOption = $("#aDOption").val();

    console.log(rentalId);
    let rental_status = $("#orderTable").children().eq(0).children(":eq(9)").text();
    let payment_slip = $("#orderTable").children().eq(0).children(":eq(8)").text();
    let total_damage_waiver_payment = $("#orderTable").children().eq(0).children(":eq(3)").text();
    let driverID = $("#orderTable").children().eq(0).children(":eq(2)").text();
    let registrationID = $("#orderTable").children().eq(0).children(":eq(1)").text();


    var rentAcc = {
        rentalId: rentalId,
        cusNic: cusNic,
        pickUpDate: pickUpDate,
        returnDate: returnDate,
        rental_status: rental_status,
        payment_slip: payment_slip,

        total_damage_waiver_payment: total_damage_waiver_payment,
        pickupLocation: pickupLocation,
        returnLocation: returnLocation,
        driverID: driverID,

        registrationID: registrationID,
        driverOption: driverOption,

    }

    console.log(rentAcc);

    $.ajax({
        url: baseURL+'rental',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(rentAcc),
        // dataType:"json",
        success: function (res) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            CustomerAccount();
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Rental Updated Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
});

