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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Customer Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Images Not Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });
});



             // ===============================Customer validation===========================================

$("#txtFName").focus();

// customer reguler expressions
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusUserNameRegEx = /^[a-z ]{5,10}$/;
const cusnicRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusPasswordRegEx = /^[0-9/A-z. ,]{3,}$/;
const cusEmailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const cusPhoneRegEx = /^07(7|6|8|1|2|5|0|4)-[0-9]{7}$/;
const cusAddressRegEx = /^[A-z0-9 ,/]{4,20}$/;
const cusDrivingLicNumdRegEx = /^[0-9]{1,}$/;

let customerValidations = [];
customerValidations.push({reg: cusNameRegEx, field: $('#txtFName'),error:'Customer Name Pattern is Wrong' });
customerValidations.push({reg: cusUserNameRegEx, field: $('#txtUserName'),error:'Customer User Name Pattern is Wrong'});
customerValidations.push({reg: cusnicRegEx, field: $('#txtNIC'),error:'Customer Nic Pattern is Wrong'});
customerValidations.push({reg: cusPasswordRegEx, field: $('#txtPassword2'),error:'Customer Password Pattern is Wrong'});
customerValidations.push({reg: cusEmailRegEx, field: $('#txtEmail2'),error:'Customer Email Pattern is Wrong'});
customerValidations.push({reg: cusPhoneRegEx, field: $('#txtPhone'),error:'Customer Phone Pattern is Wrong'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtAddress'),error:'Customer Address Pattern is Wrong'});
customerValidations.push({reg: cusDrivingLicNumdRegEx, field: $('#txtDLN'),error:'Customer DriverLicenceId Pattern is Wrong'});


//disable tab key of all four text fields using grouping selector in CSS
$("#txtFName,#txtUserName,#txtNIC,#txtPassword2,#txtEmail2,#txtPhone,#txtAddress,#txtDLN,#txtDate,#register-form-NIC-image").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtFName,#txtUserName,#txtNIC,#txtPassword2,#txtEmail2,#txtPhone,#txtAddress,#txtDLN").on('keyup', function (event) {
    checkValidity();
});

$("#txtFName,#txtUserName,#txtNIC,#txtPassword2,#txtEmail2,#txtPhone,#txtAddress,#txtDLN").on('blur', function (event) {
    checkValidity();
});


$("#txtFName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txtFName"))) {
        $("#txtNIC").focus();
    } else {
        focusText($("#txtFName"));
    }
});


$("#txtNIC").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusnicRegEx, $("#txtNIC"))) {
        focusText($("#txtEmail2"));
    }
});


$("#txtEmail2").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusEmailRegEx, $("#txtEmail2"))) {
        focusText($("#txtAddress"));
    }
});

$("#txtAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txtAddress"))) {
        focusText($("#txtUserName"));
    }
});

// $("#txtDate").on('keydown', function (event) {
//     if (event.key == "Enter" && check(cusAddressRegEx, $("#txtDate"))) {
//         focusText($("#txtUserName"));
//     }
// });

$("#txtUserName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusUserNameRegEx, $("#txtUserName"))) {
        focusText($("#txtPassword2"));
    }
});

$("#txtPassword2").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusPasswordRegEx, $("#txtPassword2"))) {
        focusText($("#txtPhone"));
    }
});

$("#txtPhone").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusPhoneRegEx, $("#txtPhone"))) {
        focusText($("#txtDLN"));
    }
});


$("#txtDLN").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusDrivingLicNumdRegEx, $("#txtDLN"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTexts();
        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#btnLogIn2").attr('disabled',true);
    }else{
        $("#btnLogIn2").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtFName").focus();
    $("#txtFName,#txtUserName,#txtNIC,#txtPassword2,#txtEmail2,#txtPhone,#txtAddress,#txtDLN").val("");
    checkValidity();
}

