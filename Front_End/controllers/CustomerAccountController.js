CustomerAccount();

function CustomerAccount(){
        $("#orderTable").empty();
        $.ajax({
            url: baseURL+"rental",
            dataType: "json",
            success: function (resp) {
                console.log(resp);
                for (let acc of resp.data) {
                    var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.registrationId + '</td><td>' + acc.driver_id + '</td><td>' + acc.total_damage_waiver_payment + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.rental_status + '</td></tr>';
                    $("#orderTable").append(row);

                }

            }
        });
//
//     // $.ajax({
//     //     url: baseURL+"rentalDetails",
//     //     dataType: "json",
//     //     success: function (resp) {
//     //         console.log(resp);
//     //         for (let i = 0; i < resp; i++) {
//     //             resp.data.registrationId=$("#orderTable").children().eq(i).children(":eq(1)").text();
//     //             resp.data.driver_id=$("#orderTable").children().eq(i).children(":eq(2)").text();
//     //             resp.data.pickUpDate=$("#orderTable").children().eq(i).children(":eq(4)").text();
//     //             resp.data.returnDate=$("#orderTable").children().eq(i).children(":eq(5)").text();
//     //             // var row = '<tr><td>' + cus.id + '</td><td>' + cus.name + '</td><td>' + cus.address + '</td><td>' + cus.salary + '</td></tr>';
//     //             // $("#tblCustomer").append(row);
//     //         }
//     //
//     //     }
//     // });
//
//
}