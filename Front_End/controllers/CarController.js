
loadAllCars();

$("#btnAddC2").click(function (){
    addCar();
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
            // setTextFieldValues("","","","");
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
        // console.log(id, name, address, salary);

        //setting table details values to text fields
        $("#txtRNber").val(registrationId);
        $("#txtCbrnd").val(brand);
        $("#txtType").val(type);
        $("#txtFuel").val(fuelType);
        $("#txtTrnsm").val(transmissionType);
        $("#txtNoOPass").val(noOfPassengers);
        $("#txtFmlg").val(freeMileage);
        $("#txtPfExk").val(priceForExtraKm);
        $("#txtMnthlyR").val(dailyRate);
        $("#txtMRt").val(monthlyRate);
    });
}






