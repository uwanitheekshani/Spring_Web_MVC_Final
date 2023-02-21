let baseURL="http://localhost:8080/Spring_Web_MVC_Final_war/";

$("#btnLogIn2").click(function () {

    var data = new FormData();
    let nicFile = $("#register-form-NIC-image")[0].files[0];
    let nicFileName = $("#register-form-NIC-image")[0].files[0].name;
    data.append("myNicImage", file, fileName);

    // let nicFileName = nicImage.name;

    // data.append("file",nicImage);


    let nic =  $("#register-form-nic").val();
    let address = $("#register-form-address").val();
    let contactNumber =$("#register-form-mobile").val();
    let name= $("#register-form-name").val();
    let email= $("#register-form-email").val();
    let password =$("#register-form-password").val();
    let user_name= $("#register-form-user-name").val();
    let imageLocation= nicFileName;

    data.append("nic",nic);
    data.append("address",address);
    data.append("contactNumber",contactNumber);
    data.append("name",name);
    data.append("email",email);
    data.append("password",password);
    data.append("user_name",user_name);
    data.append("imageLocation",imageLocation);

    $.ajax({
        url: baseUrl + "customer",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert(res.message);
        },
        error: function (err) {
            console.log(err);
        }
    });
});