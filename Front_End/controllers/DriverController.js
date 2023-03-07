loadDriverSchedule();
generateDriverId();
$("#btnAddDriver").click(function () {

    let driverId =  $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverNic =$("#txtDriverNic").val();
    let driverLicenceNum= $("#txtDriverLiNum").val();
    let driverAvailable= $("#selectDriverAvailable").val();

    var driver={
        driverID:driverId,
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
                $("#CDNs").text(res.data.name);
                $("#DNIs").text(res.data.nic);
                $("#DLNs").text(res.data.drivingLicenceNum);
                loadDriverSchedule();
                    $("#dId").text(res.data.driverID);
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


function generateDriverId() {
    $.ajax({
        url: baseURL + "driver/generateDriverId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#txtDriverId').val(res.data);
            }
        }
    })
}

// function addSchedule(){
//     let driverId = $("#dId").text();
//     $.ajax({
//         url: baseURL + "driver/search/" + driverId,
//         method: "GET",
//         success: function (resp) {
//             let driver = resp.data;
//
//             // $("#CDNs").val(driver.name);
//             // $("#DNIs").val(driver.nic);
//             // $("#DLNs").val(driver.drivingLicenceNum);
//
//
//             $("#driScheduTable").empty();
//             $.ajax({
//                 url: baseURL + "rental",
//                 method: "GET",
//                 success: function (res) {
//                     // let rent = resp.data;
//
//                     for (let rent of res.data) {
//                         if (rent.driverID===driverId) {
//                             var row = '<tr><td>' + rent.cusNic + '</td><td>' + rent.registrationID + '</td><td>' + rent.pickUpDate + '</td><td>' + rent.returnDate + '</td><td>' + rent.pickupLocation + '</td><td>' + rent.returnLocation + '</td></tr>';
//                             $("#driScheduTable").append(row);
//                         }
//                     }
//
//                 },
//                 error: function (error) {
//                     let prase = JSON.parse(error.responseText);
//                     alert(prase.message);
//                 }
//             });
//
//         },
//         error: function (error) {
//             let prase = JSON.parse(error.responseText);
//             alert(prase.message);
//         }
//     })
// }

function loadDriverSchedule() {
    $('#tblDriverSchedule').empty();
    let status = "Accepted";
    let driverId = $("#dId").text();
    $.ajax({
        url:baseURL+"rental/getCarRents/" + status + "/" + driverId,
        method:"GET",
        success:function (res) {
            for (let carRent of res.data) {
                var row = '<tr><td>' + carRent.driverID + '</td><td>' + carRent.rentalId + '</td><td>' + carRent.registrationID + '</td><td>' + carRent.cusNic + '</td><td>' + carRent.pickUpDate + '</td><td>' + carRent.returnDate + '</td><td>' + carRent.pickupLocation + '</td><td>' + carRent.returnLocation + '</td></tr>';
                $("#tblDriverSchedule").append(row);
            }
        }
    })
}




      //========================================Driver Validation============================================

const driverIdRegEx = /^(D00-)[0-9]{1,4}$/;
const driverNameRegEx = /^[A-z ]{5,20}$/;
const driverNicRegEx = /^[0-9/A-z. ,]{7,}$/;
const driverLicenseRegEx = /^[0-9]{1,}$/;

let DriverValidations = [];
DriverValidations.push({reg: driverIdRegEx, field: $('#txtDriverId'),error:'Driver ID Pattern is Wrong' });
DriverValidations.push({reg: driverNameRegEx, field: $('#txtDriverName'),error:'Driver Name Pattern is Wrong'});
DriverValidations.push({reg: driverNicRegEx, field: $('#txtDriverNic'),error:'Driver License Number Pattern is Wrong'});
DriverValidations.push({reg: driverLicenseRegEx, field: $('#txtDriverLiNum'),error:'Driver NIC  Pattern is Wrong'});


$("#txtDriverId,#txtDriverName,#txtDriverNic,#txtDriverLiNum").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtDriverId,#txtDriverName,#txtDriverNic,#txtDriverLiNum").on('keyup', function (event) {
    checkDValidity();
});

$("#txtDriverId,#txtDriverName,#txtDriverNic,#txtDriverLiNum").on('blur', function (event) {
    checkDValidity();
});


$("#txtDriverId").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverIdRegEx, $("#txtDriverId"))) {
        $("#txtDriverName").focus();
    } else {
        focusTextD($("#txtDriverId"));
    }
});


$("#txtDriverName").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverNameRegEx, $("#txtDriverName"))) {
        focusTextD($("#txtDriverNic"));
    }
});


$("#txtDriverNic").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverLicenseRegEx, $("#txtDriverNic"))) {
        focusTextD($("#txtDriverLiNum"));
    }
});
$("#txtDriverLiNum").on('keydown', function (event) {
    if (event.key == "Enter" && checkD(driverNicRegEx, $("#txtDriverLiNum"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsD();
        }
    }
});



function checkDValidity() {
    let errorCount=0;
    for (let validation of DriverValidations) {
        if (checkD(validation.reg,validation.field)) {
            textSuccessD(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorD(validation.field,validation.error);
        }
    }
    setButtonStateD(errorCount);
}

function checkD(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorD(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextD(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessD(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextD(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextD(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextD(txtField) {
    txtField.focus();
}

function setButtonStateD(value){
    if (value>0){
        $("#btnAddDriver").attr('disabled',true);
    }else{
        $("#btnAddDriver").attr('disabled',false);
    }
}

function clearAllTextsD() {
    $("#txtDriverId").focus();
    $("#txtDriverId,#txtDriverName,#txtDriverNic,#txtDriverLiNum").val("");
    checkDValidity();
}