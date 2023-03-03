

function CustomerAccount(){
        $("#tblCustomer").empty();
        $.ajax({
            url: baseURL+"customer",
            dataType: "json",
            success: function (resp) {
                console.log(resp);
                for (let cus of resp.data) {
                    var row = '<tr><td>' + cus.id + '</td><td>' + cus.name + '</td><td>' + cus.address + '</td><td>' + cus.salary + '</td></tr>';
                    $("#tblCustomer").append(row);
                }
                bindRowClickEvents();
                setTextFieldValues("","","","");
                $("#txtCustomerID").focus();
            }
        });


}