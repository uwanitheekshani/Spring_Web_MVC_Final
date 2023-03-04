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
}