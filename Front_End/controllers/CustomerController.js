let baseURL="http://localhost:8080/Spring_Web_MVC_Final_war/";


$("#btnLogIn2").click(function (){
    addCustomer();
});

function addCustomer() {

    var Cdata = new FormData();

    let nicFile = $("#register-form-NIC-image")[0].files[0];
    let nicFileName =$("#register-form-NIC-image")[0].files[0].name;


    let nicNum =  $("#txtNIC").val();
    let address = $("#txtAddress").val();
    let contactNumber =$("#txtPhone").val();
    let name= $("#txtFName").val();
    let date= $("#txtDate").val();
    let drivingLicenceNumber= $("#txtDLN").val();
    let email= $("#txtEmail2").val();
    let password =$("#txtPassword2").val();
    let user_name= $("#txtUserName").val();
    let imageLocation = nicFileName;

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
        imageLocation:"uploads/"+ imageLocation
    }

    Cdata.append("cImageFile" , nicFile)
    Cdata.append("user", new Blob([JSON.stringify(customer)], {type: "application/json"}))

    $.ajax({
        url: baseURL + "customer",
        method: "POST",
        // contentType: "application/json",
        // data: JSON.stringify(customer),
        async: true,
        contentType: false,
        processData: false,
        // contentType: "application/json",
        data: Cdata,
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
            $("#storeContent").css('display','block');
            $("#mainh").css('display','none');
            $("#main3").css('display','none');
            $("#foot").css('display','none');
            $("#checkOutContent").css('display','none');
            $("#accountContent").css('display','none');
            $("#loginContent").css('display','none');
            $("#cusRegiContent").css('display','none');
            $("#cusUpdateContent").css('display','none');
            $("#ae").text(email);
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
        method: "Post",
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

var name;
var licenceNum;
var date;
var image;
$("#editUserInfo").click(function (){
    let email =  $("#ae").text();

    $.ajax({
        url: baseURL+"customerLogin?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {

            console.log(res.data);
            let userNic = res.data.nic;
            let userName = res.data.user_name;
            let password = res.data.password;
            let phone = res.data.contactNo;
            let address = res.data.address;
            let email = res.data.email;

             name = res.data.cusName;
            licenceNum = res.data.drivingLicenceNumber;
            date = res.data.date;
           image = res.data.imageLocation;

            $("#txtUNic").val(userNic);
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

    let cusNic = $("#txtUNic").val();
    let cusUserName = $("#txtUUserName").val();
    let cusPassword = $("#txtUPassword2").val();
    let cusPhone = $("#txtUPhone").val();
    let cusAddress = $("#txtUAddress").val();
    let cusEmail = $("#txtUEmail").val();



    var customer = {
        nic:cusNic,
        user_name: cusUserName,
        password: cusPassword,
        contactNo: cusPhone,
        address: cusAddress,
        email:cusEmail,

        cusName:name,
        drivingLicenceNumber: licenceNum,
        date:date,
        imageLocation:image
    }

    $.ajax({
        url: baseURL+'customer',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(customer),
        dataType:"json",
        success: function (res) {

            // alert(res.message);
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
        }

    });
});
