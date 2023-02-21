let baseURL="http://localhost:8080/Spring_Web_MVC_Final_war/";

$("#btnLogIn2").click(function () {

    let nicFileName = $("#register-form-NIC-image")[0].files[0].name;


    let nic =  $("#txtNIC").val();
    let address = $("#txtAddress").val();
    let contactNumber =$("#txtPhone").val();
    let name= $("#txtFName").val();
    let date= $("#txtDate").val();
    let drivingLicenceNumber= $("#txtDLN").val();
    let email= $("#txtEmail2").val();
    let password =$("#txtPassword2").val();
    let user_name= $("#txtUserName").val();


    var Customer = {
        nic : nic,
        address : address,
        contactNo : contactNumber,
        cusName : name,
        date : date,
        drivingLicenceNumber : drivingLicenceNumber,
        email : email,
        password : password,
        user_name:user_name,
        imageLocation : nicFileName
    }


    // console.log(formData);

    $.ajax({
        url: baseURL+"customer",
        method :"post",
        data : JSON.stringify(Customer),
        contentType:"application/json",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);

            imagePath();

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
            alert(prase.message);
        }
    });
});

function imagePath(){
    var data = new FormData();
    let nicFile = $("#register-form-NIC-image")[0].files[0];
    let nicFileName = $("#register-form-NIC-image")[0].files[0].name;
    // data.append("myFile", file, fileName);
    data.append("myFile", nicFile, nicFileName);

    $.ajax({
        url: baseURL + "api/v1/upload",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert("Successfully Uploaded");
            loadTheLastUploadedImage();
        },
        error: function (err) {
            console.log(err);
        }
    });
}