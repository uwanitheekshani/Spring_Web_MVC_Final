let baseURL="http://localhost:8080/Spring_Web_MVC_Final_war/";


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


$("#editUserInfo").click(function (){
    let email =  $("#ae").text();

    $.ajax({
        url: baseURL+"customerLogin?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {
            console.log(res.data);
            let userName = res.data.user_name;
            let password = res.data.password;
            let phone = res.data.contactNo;
            let address = res.data.address;
            let email = res.data.email;

            $("#txtUUserName").val(userName);
            $("#txtUPassword2").val(password);
            $("#txtUPhone").val(phone);
            $("#txtUAddress").val(address);
            $("#txtUEmail").val(email);

        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            alert("Invalid email or password");
        }
    });
});

// Update customer details
$("#btnUpCus").click(function () {

    let cusUserName = $("#txtUUserName").val();
    let cusPassword = $("#txtUPassword2").val();
    let cusPhone = $("#txtUPhone").val();
    let cusAddress = $("#txtUAddress").val();
    let cusEmail = $("#txtUEmail").val();

    var customer = {
        user_name: cusUserName,
        password: cusPassword,
        contactNo: cusPhone,
        address: cusAddress,
        email:cusEmail
    }

    $.ajax({
        url: baseURL+'customer',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(customer),
        // dataType:"json",
        success: function (res) {
            alert(res.message);
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
        }

    });
});

// function loadAllCustomers() {
//
//
//     // var customer = {
//     //     nic : nicNum,
//     //     address : address,
//     //     contactNo : contactNumber,
//     //     cusName : name,
//     //     date : date,
//     //     drivingLicenceNumber : drivingLicenceNumber,
//     //     email : email,
//     //     password : password,
//     //     user_name:user_name,
//     // }
//
//     $.ajax({
//         url: baseURL+"customer",
//         dataType: "json",
//         success: function (resp) {
//             console.log(resp);
//             // for (let cus of resp.data) {
//             //    cus.nic;
//             // }
//             resp.data.nic
//             bindRowClickEvents();
//             setTextFieldValues("","","","");
//             $("#txtCustomerID").focus();
//         }
//     });
//
// }


// function updateCustomer(){
//
//     var newDetails = {
//         nic: $("#customer-profile-nic").val(),
//         address: $("#customer-profile-address").val(),
//         contactNumber: $("#customer-profile-mobile").val(),
//         name: $("#customer-profile-name").val(),
//         email: $("#customer-profile-email").val(),
//         password: customer.password,
//         user_name: customer.user_name,
//         imageLocation: customer.imageLocation,
//     }
//
//     $.ajax({
//         url: baseUrl + "customer/updateCustomer",
//         method: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify(newDetails),
//         success: function (res) {
//             if (res.status === 200) {
//                 alert(res.message)
//             } else {
//                 alert("Cant update your Details in this moment")
//             }
//         },
//         error: function (ob) {
//             console.log(ob.responseJSON.message);
//         }
//     });
// }