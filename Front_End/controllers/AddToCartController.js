// loadAllBrands();
// loadAllTypes();
// // loadAllFuelTypes();
// // loadAllTransmission();
// // loadAllPassengers();
//
// // searchBrands();
// // searchTypes();
// // searchFuelTypes();
// // searchTransmission();
// // searchFuelPassengers();
//
// function loadAllBrands() {
//     $("#selectBrand").empty();
//     $.ajax({
//         url: baseURL + "addToCart",
//         dataType: "json",
//         success: function (resp) {
//             console.log(resp);
//             for (let car of resp.data) {
//                 $("#selectBrand").append(`<option value="${car.brand}">${car.brand}</option>`);
//             }
//         }
//     });
// }
//
// function loadAllTypes() {
//     $("#selectType").empty();
//     $.ajax({
//         url: baseURL + "addToCart",
//         dataType: "json",
//         success: function (resp) {
//             console.log(resp);
//             for (let car of resp.data) {
//                 $("#selectType").append(`<option value="${car.type}">${car.type}</option>`);
//             }
//         }
//     });
// }


// var cartDb=new Array();
//
// function addToCart(){
//     var rentId=$("#txtRentalId").val();
//     var pickUpDate = $("#txtFromDate").val();
//     var driverOption = $("#selectDriver").val();
//     var returnDate = $("#txtToDate").val();
//     // var driverWant=$("#cmbDriverAssign").val();
//     // var vehicleNumber=
//     var loseDamage=$("#txtBookingLoseDamage").val();
//
//     // var Driver;
//     //
//     // if(driverWant=="Yes"){
//     //
//     //     Driver= "Assign";
//     // }else {
//     //     Driver="Not Assign";
//     // }
//
//     var cart={
//         rId:rentId,
//         pickDate:pickUpDate,
//         retDate:returnDate,
//         damage:loseDamage,
//         // vNumber:vehicleNumber,
//         assignDriver:driverOption
//     }
//
//     cartDb.push(cart)
//
// }



// getCusNic();
// var cNic;
// var customer;
// function getCusNic() {
//     let email = $("#ae").text();
//
//     $.ajax({
//         url: baseURL + "customerLogin?email=" + email,
//         method: "get",
//         dataType: "json",
//         success: function (res) {
//
//             console.log(res.data);
//             // let userNic = res.data.nic;
//             customer=res.data;
//             cNic = res.data.nic;
//         },
//         error: function (error) {
//             var jsObject = JSON.parse(error.responseText);
//             // alert("Invalid email or password");
//         }
//     });
// }
//
// $("#btnsendReq").click(function () {
//     addbooking();
// });
//
// function addbooking(){
//
//     var rentId=$("#txtRentalId").val();
//     // var pickUpDate=$("#txtBookingPickDate").val();
//     // var returnDate=$("#txtBookingReturnDate").val();
//     // var driverWant=$("#cmbDriverAssign").val();
//     // var vehicleNumber=$("#txtBookingVNumber").val();
//     // var loseDamage=$("#txtBookingLoseDamage").val();
//     p = $("#txtFromDate").val();
//     r = $("#txtToDate").val();
//     // let rentId = $("#txtRentalId").val();
//     let pickupLocation = $("#txtFPickL").val();
//     let returnLocation = $("#txtReturnL").val();
//     // let slipImgPath = paymentSlipName;
//     // let slipImgPath= $("#lossDP2")[0].files[0].name;
//     let statusOfReq = "Pending";
//     let total = 3000.00;
//     let cusId = cNic;
//     let totalDamageWaiverAmount =1000.00;
//     let rentDetail = getRentDetail(rentId);
//
// var Rdata = new FormData();
//
//     let paymentSlipName = $("#lossDP2")[0].files[0].name;
//     let paymentSlipFile = $("#lossDP2")[0].files[0];
//
//     // var rentData=new FormData();
//     //
//     // var cusNic=cusNic;
//     // let losDamageSlip=$("#lossDP2")[0].files[0];
//     // let losDamageSlipName=$("#lossDP2")[0].files[0].name;
//     // var customer;
//     // var driver;
//
//     // var BookingDetailsDB=new Array();
//
//     // $.ajax({
//     //     url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer?id="+custID,
//     //     method: "get",
//     //     success(resp) {
//     //         customer= resp.data;
//     //         console.log("Customer"+customer)
//     //     }
//     // });
//
//     // $.ajax({
//     //     url:baseURL +"driver/randomDriver",
//     //     method: "get",
//     //     success(resp) {
//     //         driver= resp.data;
//     //         console.log(driver);
//     //     }
//     // });
//
//     // for (var i of cartDb){
//     //
//     //     details={
//     //         "bookingDetailsId":"1",
//     //         "pickUpDate":i.pickDate,
//     //         "returnDate":i.retDate,
//     //         "loseDamageStatus":i.damage,
//     //         "loseDamageImg":losDamageSlipName,
//     //         "detailsStatus":"Not Approved",
//     //         "custNIC":custID,
//     //         "bookingId":i.bId,
//     //         "vehicleNumber":i.vNumber,
//     //         "driverNICNumber":i.assignDriver,
//     //     }
//     //     BookingDetailsDB.push(details);
//     // }
//
//
//
//         let rent = {
//             rentalId: rentId,
//             pickUpDate: p,
//             returnDate: r,
//             pickupLocation: pickupLocation,
//             returnLocation: returnLocation,
//             rental_status: statusOfReq,
//             amount: total,
//             total_damage_waiver_payment: totalDamageWaiverAmount,
//             // duration: 10,
//             // payment_slip: "uploads/" + slipImgPath,
//             payment_slip:paymentSlipName,
//             cusNic: cusId,
//             rentDetail: rentDetail
//
//         }
//         // "customer": {
//         //     "custNICNumber":custID,
//         // },
//         // "bookingDetails":BookingDetailsDB,
//
//     // console.log(customer);
//     Rdata.append("rImageFile",paymentSlipFile);
//     Rdata.append("carRental",new Blob([JSON.stringify(rent)],{type:"application/json"}))
//
//     $.ajax({
//         url:baseURL + "rental",
//         method:"post",
//         async:true,
//         contentType:false,
//         processData:false,
//         data:Rdata,
//         success(resp){
//             swal("Your Reservation Successful  !", "Done", "success");
//             generateRentId();;
//         }
//     });
//
// }
//


getCusNic();
var cNic;
var customer;
function getCusNic() {
    let email = $("#ae").text();

    $.ajax({
        url: baseURL + "customerLogin?email=" + email,
        method: "get",
        dataType: "json",
        success: function (res) {

            console.log(res.data);
            // let userNic = res.data.nic;
            customer=res.data;
            cNic = res.data.nic;
        },
        error: function (error) {
            var jsObject = JSON.parse(error.responseText);
            // alert("Invalid email or password");
        }
    });
}

$("#btnsendReq").click(function () {
    addbooking();
});

function addbooking(){

    var rentId=$("#txtRentalId").val();
    p = $("#txtFromDate").val();
    r = $("#txtToDate").val();
    let pickupLocation = $("#txtFPickL").val();
    let returnLocation = $("#txtReturnL").val();

    let statusOfReq = "Pending";
    let total = 3000.00;
    let cusId = cNic;
    let totalDamageWaiverAmount =1000.00;
    let rentDetail = getRentDetail(rentId);

    var Rdata = new FormData();

    let paymentSlipName = $("#lossDP2")[0].files[0].name;
    let paymentSlipFile = $("#lossDP2")[0].files[0];


    let rent = {
        rentalId: rentId,
        pickUpDate: p,
        returnDate: r,
        pickupLocation: pickupLocation,
        returnLocation: returnLocation,
        rental_status: statusOfReq,
        amount: total,
        total_damage_waiver_payment: totalDamageWaiverAmount,
        // duration: 10,
        // payment_slip: "uploads/" + slipImgPath,
        payment_slip:paymentSlipName,
        cusNic: cusId,
        rentDetail: rentDetail

    }

    Rdata.append("rImageFile",paymentSlipFile);
    Rdata.append("carRental",new Blob([JSON.stringify(rent)],{type:"application/json"}))

    $.ajax({
        url:baseURL + "rental",
        method:"post",
        async:true,
        contentType:false,
        processData:false,
        data:Rdata,
        success(resp){
            swal("Your Reservation Successful  !", "Done", "success");
            generateRentId();;
        }
    });

}
