
loadAllCars();

$("#btnAddC2").click(function (){
    addCar();
    loadAllCars();
});

    function addCar() {

        let registrationNum = $("#txtRNber").val();
        let transmission = $("#txtTrnsm").val();
        let type = $("#txtType").val();
        let noOfPassengers = $("#txtNoOPass").val();
        let fuelType = $("#txtFuel").val();
        let monthlyRate = $("#txtMRt").val();
        let dailyRate = $("#txtMnthlyR").val();
        let prizeForExtrakm = $("#txtPfExk").val();
        let freeMileage = $("#txtFmlg").val();
        let lastServiceMileage = $("#txtLSrm").val();
        let brand = $("#txtCbrnd").val();
        let colour = $("#txtClr").val();
        let model = $("#txtMdl").val();
        let availability = $("#selectAvailable").val();

        var car = {
            registrationId: registrationNum,
            brand: brand,
            type: type,
            model: model,
            fuelType: fuelType,
            transmissionType: transmission,
            colour: colour,
            noOfPassengers: noOfPassengers,
            lastServiceMileage: lastServiceMileage,
            freeMileage: freeMileage,
            dailyRate: dailyRate,
            monthlyRate: monthlyRate,
            priceForExtraKm: prizeForExtrakm,
            availability: availability,
        }

        $.ajax({
            url: baseURL + "car",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(car),
            success: function (resp) {
                uploadCarImages(registrationNum);
                loadAllCars();
                bindCarRowClickEvents();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "car Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                clearCarTextFields();
            },
            error: function (error) {
                let errorReason = JSON.parse(error.responseText);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "car Not Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }


    function uploadCarImages(registrationNum) {

        let frontViewFile = $("#uploadFVI")[0].files[0];
        let backViewFile = $("#uploadBV")[0].files[0];
        let sideViewFile = $("#uploadUSV")[0].files[0];
        let interiorViewFile = $("#uploadUIV")[0].files[0];

        let frontFileName = registrationNum + "-image_1-" + $("#uploadFVI")[0].files[0].name;
        let backFileName = registrationNum + "-image_2-" + $("#uploadBV")[0].files[0].name;
        let sideFileName = registrationNum + "-image_3-" + $("#uploadUSV")[0].files[0].name;
        let interiorFileName = registrationNum + "-image_4-" + $("#uploadUIV")[0].files[0].name;


        var data = new FormData();

        data.append("image_1", frontViewFile, frontFileName);
        data.append("image_2", backViewFile, backFileName);
        data.append("image_3", sideViewFile, sideFileName);
        data.append("image_4", interiorViewFile, interiorFileName);


        $.ajax({
            url: baseURL + "car/uploadImg/" + registrationNum,
            method: "PUT",
            async: true,
            contentType: false,
            processData: false,
            data: data,
            success: function (res) {
                console.log("Uploaded");
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Images Upload Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                let errorReason = JSON.parse(error.responseText);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Images Not Upload Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

function clearCarTextFields() {
    $('#txtRNber').val("");
    $('#txtTrnsm').val("");
    $('#txtType').val("");
    $('#txtNoOPass').val("");
    $('#txtFuel').val("");
    $('#txtMRt').val("");
    $('#txtMnthlyR').val("");
    $('#txtPfExk').val("");
    $('#txtFmlg').val("");
    $('#txtLSrm').val("");
    $('#txtCbrnd').val("");
    $('#txtClr').val("");
    $('#txtMdl').val("");
    $('#selectAvailable').val("");
    $('#uploadFVI').val("");
    $('#uploadBV').val("");
    $('#uploadUSV').val("");
    $('#uploadUIV').val("");
}


//Load all cars
function loadAllCars() {
    $("#carViewTable").empty();
    $.ajax({
        url: baseURL+"car",
        dataType: "json",
        success: function (resp) {

            console.log(resp);
            for (let car of resp.data) {
                var row = '<tr><td>' + car.registrationId + '</td><td>' + car.brand + '</td><td>' + car.type + '</td><td>' + car.fuelType + '</td><td>' + car.transmissionType + '</td><td>' + car.noOfPassengers + '</td><td>' + car.freeMileage + '</td><td>' + car.priceForExtraKm + '</td><td>' + car.dailyRate + '</td><td>' + car.monthlyRate + '</td></tr>';
                $("#carViewTable").append(row);

            }
            bindCarRowClickEvents();
            setCarTextFieldValues("","","","","","","","","","");
            // $("#txtCustomerID").focus();
        }
    });

}


//Event binding for table rows
function bindCarRowClickEvents() {
    $("#carViewTable>tr").click(function () {
        let registrationId = $(this).children(":eq(0)").text();
        let brand = $(this).children(":eq(1)").text();
        let type = $(this).children(":eq(2)").text();
        let fuelType = $(this).children(":eq(3)").text();
        let transmissionType = $(this).children(":eq(4)").text();
        let noOfPassengers = $(this).children(":eq(5)").text();
        let freeMileage = $(this).children(":eq(6)").text();
        let priceForExtraKm = $(this).children(":eq(7)").text();
        let dailyRate = $(this).children(":eq(8)").text();
        let monthlyRate = $(this).children(":eq(9)").text();
        // console.log(registrationId, brand, type, fuelType);

        //setting table details values to text fields
        $("#txtCNu").val(registrationId);
        $("#txtVCbrnd").val(brand);
        $("#txtCT").val(type);
        $("#txtFT").val(fuelType);
        $("#txtVCTrans").val(transmissionType);
        $("#txtNOP").val(noOfPassengers);
        $("#txtFM").val(freeMileage);
        $("#txtVCcperex").val(priceForExtraKm);
        $("#txtDai").val(dailyRate);
        $("#txtMn").val(monthlyRate);
    });
}

function setCarTextFieldValues(registrationId, brand, type, fuelType,transmissionType,noOfPassengers,freeMileage,priceForExtraKm,dailyRate,monthlyRate) {
    $("#txtVCbrnd").val(brand);
    $("#txtVCTrans").val(transmissionType);
    $("#txtVCcperex").val(priceForExtraKm);
    $("#txtCNu").val(registrationId);
    $("#txtNOP").val(noOfPassengers);
    $("#txtDai").val(dailyRate);
    $("#txtCT").val(type);
    $("#txtFM").val(freeMileage);
    $("#txtMn").val(monthlyRate);
    $("#txtFT").val(fuelType);
}


var model;
var colour;
var lastServiceMileage;
var availability;
// var frontImageView;
// var backImageView;
// var sideImageView;
// var interiorImageView;



// function getCarDetails(){
//     let registrationId =  $("#txtCNu").text();
//     $.ajax({
//         url: baseURL+"car?registrationId=" + registrationId,
//         method: "get",
//         success(resp) {
//
//             frontImageView=resp.data.image_1;
//             backImageView=resp.data.image_2;
//
//             $("#txtBManageCustomerID").val(resp.data.customer.custNICNumber);
//             $("#txtBManageCustomerName").val(resp.data.customer.custName);
//
//
//         }
//     });
// }

// Update car details
$("#btnUpdate").click(function () {

    let registrationId = $("#txtCNu").val();
    let brand = $("#txtVCbrnd").val();
    let type = $("#txtCT").val();
    let fuelType =$("#txtFT").val();
    let transmissionType = $("#txtVCTrans").val();
    let noOfPassengers = $("#txtNOP").val();
    let freeMileage = $("#txtFM").val();
    let priceForExtraKm = $("#txtVCcperex").val();
    let dailyRate =  $("#txtDai").val();
    let monthlyRate = $("#txtMn").val();


    var car = {
        registrationId: registrationId,
        brand: brand,
        type: type,
        fuelType: fuelType,
        transmissionType: transmissionType,
        noOfPassengers: noOfPassengers,
        freeMileage: freeMileage,
        priceForExtraKm: priceForExtraKm,
        dailyRate: dailyRate,
        monthlyRate: monthlyRate,


        model: model,
        colour: colour,
        lastServiceMileage: lastServiceMileage,
        availability: availability,




        // cusName:name,
        // drivingLicenceNumber: licenceNum,
        // date:date,
        // imageLocation:image
    }

    $.ajax({
        url: baseURL+'car',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(car),
        dataType:"json",
        success: function (res) {
            alert(res.message);
            loadAllCars();
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
        }

    });
});

$("#btnDelete").click(function () {
    let registrationId = $("#txtCNu").val();
    $.ajax({
        url: baseURL+"car?registrationId=" + registrationId + "",
        method: "delete",
        dataType:"json",
        success: function (resp) {
            alert(resp.message);
            loadAllCars();
        },
        error:function (error){
            alert(JSON.parse(error.responseText).message);
        }
    });
});







