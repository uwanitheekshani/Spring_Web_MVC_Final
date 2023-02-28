$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverNic =$("#txtDriverNic").val();
    let driverLicenceNum= $("#txtDriverLiNum").val();
    let driverAvailable= $("#selectDriverAvailable").val();

    var driver={
        driver_id:driverId,
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
                title: "Driver Added Successfully",
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
                title: "Driver Not Added Successfully",
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


$("#btnDLogIn").click(function (){

    let drivingLiNum = $("#txtDdUsNa").val();
    let name = $("#txtDdPass").val();

    $.ajax({
        url: baseURL+"driver?drivingLiNum="+drivingLiNum,
        method: "get",
        dataType:"json",
        success: function (res) {
            if (res.data.name==name){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                    $("#mainh").css('display','none');
                    $("#main3").css('display','none');
                    $("#foot").css('display','none');
                    $("#storeContent").css('display','none');
                    $("#checkOutContent").css('display','none');
                    $("#accountContent").css('display','none');
                    $("#loginContent").css('display','none');
                    $("#cusRegiContent").css('display','none');
                    $("#cusUpdateContent").css('display','none');
                    $("#admindashMain2").css('display','none');
                    $("#headContent").css('display','none');
                    $("#driverDashLogin").css('display','none');
                    $("#drivershe2").css('display','block');

                    $("#adminDash").css('display','none');
                    $("#carContent").css('display','none');
                    $("#veriCusDet").css('display','none');
                    $("#employeeAdd").css('display','none');
                    $("#paymentsDet").css('display','none');
                    $("#reservDet").css('display','none');
                    $("#viewCarDet").css('display','none');

            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid driver Id or name",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearDriverLoginTextFields();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Invalid driver Id or name",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function clearDriverLoginTextFields() {
    $('#txtDdUsNa').val("");
    $('#txtDdPass').val("");
}