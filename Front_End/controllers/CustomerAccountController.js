CustomerAccount();

function CustomerAccount(){
        $("#orderTable").empty();
        $.ajax({
            url: baseURL+"rental",
            dataType: "json",
            success: function (resp) {
                console.log(resp);
                for (let acc of resp.data) {
                    var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.registrationID + '</td><td>' + acc.driverID + '</td><td>' + acc.total_damage_waiver_payment + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.pickupLocation + '</td><td>' + acc.returnLocation + '</td><td>' + acc.rental_status + '</td></tr>';
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