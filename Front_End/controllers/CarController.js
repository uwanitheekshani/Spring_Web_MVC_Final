

$("#btnAddC2").click(function () {

    let frontFileName = $("#uploadFVI")[0].files[0].name;
    let backFileName = $("#uploadBV")[0].files[0].name;
    let sideFileName = $("#uploadUSV")[0].files[0].name;
    let interiorFileName = $("#uploadUIV")[0].files[0].name;


    let registrationNum =  $("#txtRNber").val();
    let transmission = $("#txtTrnsm").val();
    let type =$("#txtType").val();
    let noOfPassengers= $("#txtNoOPass").val();
    let fuelType= $("#txtFuel").val();
    let monthlyRate= $("#txtMRt").val();
    let dailyRate= $("#txtMnthlyR").val();
    let prizeForExtrakm =$("#txtPfExk").val();
    let freeMileage= $("#txtFmlg").val();
    let lastServiceMileage =$("#txtLSrm").val();
    let brand= $("#txtCbrnd").val();
    let colour =$("#txtClr").val();
    let model= $("#txtMdl").val();
    let availability =$("#selectAvailable").val();

    var Car = {
        registrationId : registrationNum,
        Brand : brand,
        type : type,
        model : model,
        fuelType : fuelType,
        transmissionType : transmission,
        colour : colour,
        noOfPassengers : noOfPassengers,
        lastServiceMileage:lastServiceMileage,
        freeMileage : freeMileage,
        dailyRate : dailyRate,
        monthlyRate:monthlyRate,
        priceForExtraKm : prizeForExtrakm,
        availability : availability,
        image_1 : frontFileName,
        image_2 : backFileName,
        image_3 : sideFileName,
        image_4 : interiorFileName
    }

    $.ajax({
        url: baseURL+"car",
        method :"post",
        data : JSON.stringify(Car),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);

            carimagePath();

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });
});

function carimagePath(){
    var data = new FormData();
    let frontViewFile = $("#uploadFVI")[0].files[0];
    let backViewFile = $("#uploadBV")[0].files[0];
    let sideViewFile = $("#uploadUSV")[0].files[0];
    let interiorViewFile = $("#uploadUIV")[0].files[0];

    let frontFileName = $("#uploadFVI")[0].files[0].name;
    let backFileName = $("#uploadBV")[0].files[0].name;
    let sideFileName = $("#uploadUSV")[0].files[0].name;
    let interiorFileName = $("#uploadUIV")[0].files[0].name;

    data.append("myFile", frontViewFile, frontFileName);
    data.append("myFile", backViewFile, backFileName);
    data.append("myFile", sideViewFile, sideFileName);
    data.append("myFile", interiorViewFile, interiorFileName);

    $.ajax({
        url: baseURL + "api/v1/upload",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert("Successfully Uploaded");
            loadTheLastUploadedImage();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//Update customer details
// $("#btnUpCus").click(function () {
//
//     let cusUserName = $("#txtUUserName").val();
//     let cusPassword = $("#txtUPassword2").val();
//     let cusPhone = $("#txtUPhone").val();
//     let cusAddress = $("#txtUAddress").val();
//     let cusEmail = $("#txtUEmail").val();
//
//     var customer = {
//         user_name: cusUserName,
//         password: cusPassword,
//         contactNo: cusPhone,
//         address: cusAddress,
//         email:cusEmail
//     }
//
//     $.ajax({
//         url: baseURL+'customer',
//         method: 'put',
//         contentType:"application/json",
//         data:JSON.stringify(customer),
//         dataType:"json",
//         success: function (res) {
//             alert(res.message);
//         },
//         error:function (error){
//             let cause= JSON.parse(error.responseText).message;
//             alert(cause);
//         }
//
//     });
// });