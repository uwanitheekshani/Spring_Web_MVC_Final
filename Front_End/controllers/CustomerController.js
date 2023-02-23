let baseURL="http://localhost:8080/Spring_Web_MVC_Final_war/";

// $("#btnLogIn2").click(function () {
//
//     let nicFileName = $("#register-form-NIC-image")[0].files[0].name;
//
//
//     let nic =  $("#txtNIC").val();
//     let address = $("#txtAddress").val();
//     let contactNumber =$("#txtPhone").val();
//     let name= $("#txtFName").val();
//     let date= $("#txtDate").val();
//     let drivingLicenceNumber= $("#txtDLN").val();
//     let email= $("#txtEmail2").val();
//     let password =$("#txtPassword2").val();
//     let user_name= $("#txtUserName").val();
//
//
//     var Customer = {
//         nic : nic,
//         address : address,
//         contactNo : contactNumber,
//         cusName : name,
//         date : date,
//         drivingLicenceNumber : drivingLicenceNumber,
//         email : email,
//         password : password,
//         user_name:user_name,
//         imageLocation : nicFileName
//     }
//
//     $.ajax({
//         url: baseURL+"customer",
//         method :"post",
//         data : JSON.stringify(Customer),
//         contentType:"application/json",
//         success: function (resp) {
//             console.log(resp);
//             alert(resp.message);
//
//             imagePath();
//
//         },
//         error: function(error) {
//             let prase = JSON.parse(error.responseText);
//             alert(prase.message);
//         }
//     });
// });
//
// function imagePath(){
//     var data = new FormData();
//     let nicFile = $("#register-form-NIC-image")[0].files[0];
//     let nicFileName = $("#register-form-NIC-image")[0].files[0].name;
//
//     data.append("myFile", nicFile, nicFileName);
//
//     $.ajax({
//         url: baseURL + "api/v1/upload",
//         method: 'post',
//         async: true,
//         contentType: false,
//         processData: false,
//         data: data,
//         success: function (resp) {
//             alert("Successfully Uploaded");
//             loadTheLastUploadedImage();
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }



$("#btnLogIn2").click(function (){
    addCustomer();
});

function addCustomer() {

    let nicNum =  $("#txtNIC").val();
    let address = $("#txtAddress").val();
    let contactNumber =$("#txtPhone").val();
    let name= $("#txtFName").val();
    let date= $("#txtDate").val();
    let drivingLicenceNumber= $("#txtDLN").val();
    let email= $("#txtEmail2").val();
    let password =$("#txtPassword2").val();
    let user_name= $("#txtUserName").val();

    var customer = {
        nic : nicNum,
        address : address,
        contactNo : contactNumber,
        cusName : name,
        date : date,
        drivingLicenceNumber : drivingLicenceNumber,
        email : email,
        password : password,
        user_name:user_name,
    }

    $.ajax({
        url: baseURL + "customer",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function (resp) {
            uploadCustomerImages(nicNum);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "customer Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            clearCustomerTextFields();
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "customer Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

function uploadCustomerImages(nicNum) {

    let nicFile = $("#register-form-NIC-image")[0].files[0];

    let nicFileName = nicNum + "-imageLocation-" + $("#register-form-NIC-image")[0].files[0].name;

    var data = new FormData();

    data.append("imageLocation", nicFile, nicFileName);

    $.ajax({
        url: baseURL + "customer/uploadImg/" + nicNum,
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

function clearCustomerTextFields() {
    $('#txtNIC').val("");
    $('#txtAddress').val("");
    $('#txtPhone').val("");
    $('#txtFName').val("");
    $('#txtDate').val("");
    $('#txtDLN').val("");
    $('#txtEmail2').val("");
    $('#txtPassword2').val("");
    $('#txtUserName').val("");
    $('#register-form-NIC-image').val("");
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