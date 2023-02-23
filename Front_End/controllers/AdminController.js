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
            alert(resp.message);

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });
});