$("#btnLogInE").click(function (){

    let email =  $("#txtEEmail").val();
    let password = $("#txtPasswordE").val();

    $.ajax({
        url: baseURL+"customerLogin?email="+email,
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
                $("#store").css('pointer-events','auto');
                $("#checkout").css('pointer-events','auto');
                $("#account").css('pointer-events','auto');
            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            clearCustomerLoginTextFields();
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

function clearCustomerLoginTextFields() {
    $('#txtEEmail').val("");
    $('#txtPasswordE').val("");
}
