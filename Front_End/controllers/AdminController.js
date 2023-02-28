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
            clearAdminTextFields();
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

function clearCarTextFields() {
    $('#txtAdminId').val("");
    $('#txtAdminEmail').val("");
    $('#txtAUserName').val("");
    $('#txtAPassword').val("");
}


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