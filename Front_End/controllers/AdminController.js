$("#btnAddAdmin").click(function () {

    let adminId =  $("#txtAdminId").val();
    let adminEmail = $("#txtAdminEmail").val();
    let adminUserName =$("#txtAUserName").val();
    let adminPassword= $("#txtAPassword").val();

    var Admin={
        adminId:adminId,
        email:adminEmail,
        userName:adminUserName,
        password:adminPassword
    }

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"admin",
        method: "post",
        data : JSON.stringify(Admin),
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
            // clearAdminTextFields();
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




$("#btnALogIn").click(function (){

    let email = $("#txtAdUsNa").val();
    let password = $("#txtAdPass").val();

    $.ajax({
        url: baseURL+"admin?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {
            if (res.data.password==password){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                $("#admindashMain1").css('display','block');
                $("#admindashMain2").css('display','block');
                $("#adminDashLogin").css('display','none');
                $("#accountContent").css('display','none');
                $("#checkOutContent").css('display','none');
                $("#storeContent").css('display','none');
                $("#cusUpdateContent").css('display','none');
                $("#cusRegiContent").css('display','none');
                $("#loginContent").css('display','none');
                $("#foot").css('display','none');
                $("#btnALogIn").css('display','none');
                $("#main3").css('display','none');
                $("#mainh").css('display','none');
                $("#headContent").css('display','none');

            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearAdminLoginTextFields();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Invalid email or password",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function clearAdminLoginTextFields() {
    $('#txtAdUsNa').val("");
    $('#txtAdPass').val("");
}


   //=====================================Admin validations==============================================

const AdminIDRegEx = /^(A00-)[0-9]{1,3}$/;
const AdminEmailRegEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const AdminUserNameRegEx = /^[a-z ]{5,10}$/;
const AdminPasswordRegEx = /^[0-9/A-z. ,]{3,}$/;

let AdminValidations = [];
AdminValidations.push({reg: AdminIDRegEx, field: $('#txtAdminId'),error:'Admin ID Pattern is Wrong' });
AdminValidations.push({reg: AdminEmailRegEx, field: $('#txtAdminEmail'),error:'Admin Email Pattern is Wrong'});
AdminValidations.push({reg: AdminUserNameRegEx, field: $('#txtAUserName'),error:'Admin User Name Pattern is Wrong'});
AdminValidations.push({reg: AdminPasswordRegEx, field: $('#txtAPassword'),error:'Admin Password Pattern is Wrong'});

$("#txtAdminId,#txtAdminEmail,#txtAUserName,#txtAPassword").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtAdminId,#txtAdminEmail,#txtAUserName,#txtAPassword").on('keyup', function (event) {
    checkAValidity();
});

$("txtAdminId,#txtAdminEmail,#txtAUserName,#txtAPassword").on('blur', function (event) {
    checkAValidity();
});


$("#txtAdminId").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminIDRegEx, $("#txtAdminId"))) {
        $("#txtAdminEmail").focus();
    } else {
        focusTextA($("#txtAdminId"));
    }
});


$("#txtAdminEmail").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminEmailRegEx, $("#txtAdminEmail"))) {
        focusTextA($("#txtAUserName"));
    }
});


$("#txtAUserName").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminUserNameRegEx, $("#txtAUserName"))) {
        focusTextA($("#txtAPassword"));
    }
});
$("#txtAPassword").on('keydown', function (event) {
    if (event.key == "Enter" && checkA(AdminPasswordRegEx, $("#txtAPassword"))) {
        let res = confirm("Do you want to create.?");
        if (res) {
            clearAllTextsA();
        }
    }
});



function checkAValidity() {
    let errorCount=0;
    for (let validation of AdminValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccessA(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextErrorA(validation.field,validation.error);
        }
    }
    setButtonStateA(errorCount);
}

function checkA(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextErrorA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccessA(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultTextA(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultTextA(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusTextA(txtField) {
    txtField.focus();
}

function setButtonStateA(value){
    if (value>0){
        $("#btnAddAdmin").attr('disabled',true);
    }else{
        $("#btnAddAdmin").attr('disabled',false);
    }
}

function clearAllTextsA() {
    $("#txtAdminId").focus();
    $("#txtAdminId,#txtAdminEmail,#txtAUserName,#txtAPassword").val("");
    checkAValidity();
}