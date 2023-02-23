$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverNic =$("#txtDriverNic").val();
    let driverLicenceNum= $("#txtDriverLiNum").val();
    let driverAvailable= $("#selectDriverAvailable").val();

    var driver={
        driverId:driverId,
        name:driverName,
        nic:driverNic,
        drivingLicenceNum:driverLicenceNum,
        availability:driverAvailable
    }

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"driver",
        method: "post",
        data : JSON.stringify(driver),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Admin Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            clearDriverTextFields();
        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Admin Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function clearDriverTextFields() {
    $('#txtDriverId').val("");
    $('#txtDriverName').val("");
    $('#txtDriverNic').val("");
    $('#txtDriverLiNum').val("");
    $('#selectDriverAvailable').val("");
}