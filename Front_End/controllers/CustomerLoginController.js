$("#btnLogInE").click(function (){

    let email =  $("#txtEEmail").val();
    let password = $("#txtPasswordE").val();

    $.ajax({
        url: baseURL+"customerLogin?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {

            if (res.data.password==password){
                alert(res.message);
                $("#storeContent").css('display','block');
                $("#mainh").css('display','none');
                $("#main3").css('display','none');
                $("#foot").css('display','none');
                $("#checkOutContent").css('display','none');
                $("#accountContent").css('display','none');
                $("#loginContent").css('display','none');
                $("#cusRegiContent").css('display','none');
                $("#cusUpdateContent").css('display','none');
            }else {
                alert("Invalid email or password")
            }
            clearCustomerLoginTextFields();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            alert("Invalid email or password");
        }
    });
});

function clearCustomerLoginTextFields() {
    $('#txtEEmail').val("");
    $('#txtPasswordE').val("");
}
