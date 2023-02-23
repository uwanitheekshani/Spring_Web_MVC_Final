$("#btnAddAdmin").click(function () {

    var formData = $("#adminForm").serialize();
    // will generate a query String including form data

    //send ajax request to the customer servlet
    $.ajax({
        url: baseURL+"admin",
        method: "post",
        data: formData,
        dataType:"json",
        success: function (res) {
            alert(res.message);
            // loadAllCustomers();
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            alert(jsObject.message);
        }
    });
});