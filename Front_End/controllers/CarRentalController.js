generateRentId();
carAppend();
// getAllAvailableDriver();


function carAppend() {
    $("#selectCar").empty();

    $.ajax({
        url: baseURL + "car",
        dataType: "json",
        method: "Get",
        success: function (resp) {

            let i = resp.data.type;
            // if (resp.data.registrationId==)
            console.log(resp.data);

            for (let car of resp.data) {
                // console.log(resp.data.imag);
                var d = `<div class="swiper-slide">
                        <div class="testimonial-wrap">
                            <div class="testimonial-item">
                               <div>
                                <img src=${"http://localhost:8080/Spring_Web_MVC_Final_war/uploads/" + car.image_1} class="testimonial-img" alt="" style="position: relative;width: 107px;top: -23px;height: 115px;">
                                </div>
                                <h3>${car.model}</h3>
                                <div>
                                <h4 id="Da">Daily</h4>
                                <h4 id="Mo">Monthly</h4>
                                <h4 id="Ldp">Loss Damage waiver Payment</h4>

                                <h4 id="Dap">${car.dailyRate}</h4>
                                <h4 id="Mop">${car.monthlyRate}</h4>
                                <h4 id="Ldpp">${car.monthlyRate}</h4>

                              <button class="cart1" id="${car.registrationId}" type="button" style="position: absolute;top: 205px;left: 109px;background-color: orange;">Add To Cart</button>
                                </div>

                                <div class="carD">
                                    <h4 id="Br">Brand</h4>
                                    <h4 id="Ty">Type</h4>
                                    <h4 id="Tr">Transmission</h4>
                                    <h4 id="Fu">Fuel</h4>
                                    <h4 id="Nop">No Of Passengers</h4>
                                    <h4 id="cnumber">Car Num</h4>
                                    <h4 id="cStatus">Status</h4>

                                    <h4 id="Bri">${car.brand}</h4>
                                    <h4 id="Tyi">${car.type}</h4>
                                    <h4 id="Tri">${car.transmissionType}</h4>
                                    <h4 id="Fui">${car.fuelType}</h4>
                                    <h4 id="Nopf">${car.noOfPassengers}</h4>
                                    <h4 id="Cnum">${car.registrationId}</h4>
                                    <h4 id="cStatusV">${car.availability}</h4>
                                  
                                </div>

                            </div>
                        </div>
                    </div>`;
                $("#selectCar").append(d);
            }
            // setCarFieldValues("","","","","", "", "", "","");
        }
    });
}


function loadCheckCars(id) {
    let from = $("#txtFromDate").val();
    let to = $("#txtToDate").val();
    let selectDri = $("#selectDriver").val();
    // let lossPaySlip=$("#lossDP2").val();


    $.ajax({
        url: baseURL + "car?registrationId=" + id,
        method: "get",
        dataType: "json",
        success: function (resp) {

            let lossDamagePrice = "";

            if (resp.data.type == "General") {
                lossDamagePrice = 10000;
            } else if (resp.data.type == "Premium") {
                lossDamagePrice = 15000;
            } else {
                lossDamagePrice = 20000;
            }

            $("#CheckReTable").append("<tr><td>" + resp.data.registrationId + "</td><td>" + resp.data.brand + "</td><td>" + resp.data.dailyRate + "</td><td>" + resp.data.monthlyRate + "</td><td>" + lossDamagePrice + "</td><td>" + from + "</td><td>" + to + "</td><td>" + selectDri + "</td><td>" + resp.data.availability + "</td></tr>")

        },
        error: function (error) {
            let prase = JSON.parse(error.responseText);
        }
    });
}

$('body').on('click', '.cart1', function () {
    alert("Add to cart " + this.id);
    loadCheckCars(this.id);
});

// ======================================================================================================

function generateRentId() {
    $.ajax({
        url: baseURL + "rental/generateRentalId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#txtRentalId').val(res.data);
            }

        }
    })
}

//===============================================================================================

$('body').on('dblclick', '#CheckReTable>tr', function () {
    $(this).remove();
});


// ===================================================

// $("#btnsendReq").click(function (){
//     addRental();
// });

// // var lossDamage="";
// var driverId="";
// var array = [];
// var carDetailArray=[];
// var carRegiId="";
// // getDamageWeiverTot();
// // let onHoldAmount = 0;
//
// // function getDamageWeiverTot(){
// //     for (let i=0; i<carDetailArray.length; i++){
// //         onHoldAmount+=  carDetailArray[i].onHold;
// //         console.log(JSON.stringify(onHoldAmount));
// //     }
// //     //
// //     return onHoldAmount;
// // }
//
//               // ==========================meka rental details ekata adala data tika yawanna=================================
//
// function getRentDetails(rentalId) {
//     let rows = $("#CheckReTable").children().length;
//     // let rentalId =  $("#txtRe").val();
//     for (let i = 0; i < rows; i++) {
//         let carNum = $("#CheckReTable").children().eq(i).children(":eq(0)").text();
//         let carBrand = $("#CheckReTable").children().eq(i).children(":eq(1)").text();
//         let dailyRate= $("#CheckReTable").children().eq(i).children(":eq(2)").text();
//         let monthlyRate = $("#CheckReTable").children().eq(i).children(":eq(3)").text();
//         let onHold= $("#CheckReTable").children().eq(i).children(":eq(4)").text();
//         let from = $("#CheckReTable").children().eq(i).children(":eq(5)").text();
//         let to= $("#CheckReTable").children().eq(i).children(":eq(6)").text();
//         let driver = $("#CheckReTable").children().eq(i).children(":eq(7)").text();
//         let carStatus = $("#CheckReTable").children().eq(i).children(":eq(8)").text();
//         array.push({rentalId:rentalId,registrationId:carNum,pickUpDate: from,returnDate: to,
//             driverOption:driver,driverId:driverId});
//
//         carDetailArray.push({rentalId: rentalId,registrationId:carNum,pickUpDate:from,returnDate:to,
//            driverOption:driver,registrationId:carBrand,dailyRate: dailyRate,monthlyRate:monthlyRate,
//         rental_status:carStatus,onHold});
//              alert(driverId);
//         console.log(driverId);
//         alert(carNum);
//     }
//     return array;
// }
//
// loadAllDrivers();
//     //========================meka driver id eka ganna==========================
// //Load all drivers
// function loadAllDrivers() {
//     $.ajax({
//         url: baseURL+"driver",
//         method:"Get",
//         dataType: "json",
//         success: function (resp) {
//             console.log(resp.data );
//             for (let dri of resp.data){
//                 if (dri.availability=="Available"){
//                     driverId=dri.driver_id;
//                     // availability="Unvailable";
//                   alert(driverId);
//                 }
//             }
//         }
//     });
//
// }
//
//
// getCusNic();
//
// // =====================meka rental eke nic ekata yawanna ==========================
// var cNic;
// function getCusNic(){
//     let email =  $("#ae").text();
//
//     $.ajax({
//         url: baseURL+"customerLogin?email="+email,
//         method: "get",
//         dataType:"json",
//         success: function (res) {
//
//             console.log(res.data);
//             // let userNic = res.data.nic;
//
//             cNic=res.data.nic;
//         },
//         error:function(error){
//             var jsObject=JSON.parse(error.responseText);
//             // alert("Invalid email or password");
//         }
//     });
//}


// =============================rental ekak add krnna meka===============================

// var p;
// var r;
// var dailR;
// function addRental() {
//
//     for(let sd of array){
//         p=sd.pickUpDate;
//         r=sd.returnDate;
//         dailR=sd.dailyRate;
//     }
//     alert(p);
//
//     p = $("#txtFromDate").val();
//     r = $("#txtToDate").val();
//
//     var Rdata = new FormData();
//
//     let paymentSlipName =$("#lossDP2")[0].files[0].name;
//     let paymentSlipFile = $("#lossDP2")[0].files[0];
//
//     var pick = new Date(p);
//     var ret = new Date(r);
//     var rentAmount = parseFloat(ret.getDate() - parseFloat(pick.getDate())*dailR);
//     // alert(diffDays)
//
//     let rentalId = $("#txtRentalId").val();
//     let totalRent = $("#txtTotalRent").val(rentAmount);
//     let paymentSlipImage = paymentSlipName;
//     let pickupD = p;
//     let returnD = r;
//     let pickUpLocation = $("#txtFPickL").val();
//     let returnLocation = $("#txtReturnL").val();
//     let rentStat = $("#txtRentalStatus").val();
//     let totalDamageWaiverAmount = $("#txtLossDwa").val();
//     // let rentAmount= $("#txtTotalRent").val();
//     let rentD = getRentDetails(rentalId);
//
//
//     var rent = {
//         rentalId: rentalId,
//         amount: totalRent,
//         pickupLocation: pickUpLocation,
//         returnLocation: returnLocation,
//         total_damage_waiver_payment: totalDamageWaiverAmount,
//         pickUpDate: pickupD,
//         returnDate: returnD,
//         rental_status: rentStat,
//         cusNic: cNic,
//         payment_slip:"uploads/"+ paymentSlipImage,
//         rentDetails: rentD
//
//     }
//
//     Rdata.append("rImageFile" , paymentSlipFile)
//     Rdata.append("rental", new Blob([JSON.stringify(rent)], {type: "application/json"}))
//
//     $.ajax({
//         url: baseURL + "rental",
//         method: "post",
//         async: true,
//         contentType: false,
//         processData: false,
//         data: Rdata,
//         // dataType: "json",
//         //  contentType:"application/json",
//         // data:JSON.stringify(rent),
//
//         // url: baseUrl + "rental",
//         // method: "post",
//         // dataType: "json",
//         // data: JSON.stringify(rent),
//         // contentType: "application/json",
//
//         success: function (resp) {
//             // updateDriverStatus();
//             // // uploadPaymentSlipImages(rentalId);
//             // getCarDet();
//             // getDriDet();
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: "Rental Added Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         },
//
//         function(error) {
//             // alert(JSON.parse(error.responseText).message);
//             // let errorReason = JSON.parse(error.responseText);
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: "Rental Not Added Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//
//     })
// }

//==============car eke status eka update karanna================================

// function getCarId() {
//     for (let i = 0; i < carDetailArray.length; i++) {
//         if ( carRegiId = carDetailArray[i].registrationId){
//             return carRegiId;
//         }
//     }
// }
// function updateCarStatus(registationId,availability,brand,colour,dailyrate,freeMileage,fuelType,image_1,image_2,image_3,image_4,lastServiceMileage,model,monthlyRate,noOfpassengers,priceForExtraKm,transmissionType,type){
//     var upCarStat="";
//     if (carRegiId=registationId) {
//          upCarStat = {
//             registrationId: carRegiId,
//             availability: "Unvailable",
//             brand: brand,
//             colour: colour,
//             dailyRate: dailyrate,
//             freeMileage: freeMileage,
//             fuelType: fuelType,
//             image_1: image_1,
//             image_2: image_2,
//             image_3: image_3,
//             image_4: image_4,
//             lastServiceMileage: lastServiceMileage,
//             model: model,
//             monthlyRate: monthlyRate,
//             noOfpassengers: noOfpassengers,
//             priceForExtraKm: priceForExtraKm,
//             transmissionType: transmissionType,
//             type: type
//         }
//         return upCarStat;
//     }
//
//     $.ajax({
//         url: baseURL+'car',
//         method: 'put',
//         contentType:"application/json",
//         data:JSON.stringify(upCarStat),
//         dataType:"json",
//         success: function (res) {
//             alert(res.message);
//             // loadAllCustomers();
//         },
//         error:function (error){
//             let cause= JSON.parse(error.responseText).message;
//             alert(cause);
//         }
//
//     });
//
// }


// function getCarDet(){
//
//     $.ajax({
//         url: baseURL+'car',
//         method: 'get',
//         dataType:"json",
//         success: function (res) {
//              updateCarStatus(res.data.registrationId,res.data.availability,res.data.brand,res.colour,res.data.dailyRate,
//                  res.data.freeMileage,res.data.fuelType,res.data.image_1,res.data.image_2,res.data.image_3,res.data.image_4,res.data.lastServiceMileage,
//                  res.data.model,res.data.monthlyRate,res.data.noOfPassengers,res.data.priceForExtraKm,res.data.transmissionType,res.data.type);
//
//             // alert(res.message);
//         },
//         error:function (error){
//             let cause= JSON.parse(error.responseText).message;
//             alert(cause);
//         }
//     });
// }

// var driStatus;

// ===============driver eke status eka upadate karanna==============================

// function getDrId() {
//     for (let i = 0; i < carDetailArray.length; i++) {
//         if (driverId = carDetailArray[i].driverId) {
//             return driverId;
//         }
//     }
// }
//
// function updateDriverStatus(driver_id,availability,drivingLicenceNumber,name,nic){
//     var upDriStat="";
//
//     if (driverId=driver_id) {
//         upDriStat = {
//             driver_id:driverId,
//             availability:"Unavailable",
//             driverLicenceNum:drivingLicenceNumber,
//             name:name,
//             nic:nic
//         }
//         return upDriStat;
//     }
//
//     $.ajax({
//         url: baseURL+'driver',
//         method: 'put',
//         contentType:"application/json",
//         data:JSON.stringify(upDriStat),
//         dataType:"json",
//         success: function (res) {
//
//             for (let dri of res.data){
//                 if (dri.driver_id=driverId){
//                     dri.data.availability="Unavailable";
//                 }
//             }
//             alert(res.message);
//         },
//         error:function (error){
//             let cause= JSON.parse(error.responseText).message;
//             alert(cause);
//         }
//     });
// }

// function getDriDet(){
//
//     $.ajax({
//         url: baseURL+'driver',
//         method: 'get',
//         dataType:"json",
//         success: function (res) {
//             updateDriverStatus(res.data.driver_id,res.data.availability,res.data.drivingLicenceNumber,res.data.name,res.data.nic);
//             // alert(res.message);
//         },
//         error:function (error){
//             let cause= JSON.parse(error.responseText).message;
//             alert(cause);
//         }
//     });
// }


// ===============*bank slip eka add karanna==============================

// function uploadPaymentSlipImages(rentalId) {
//
//     let paymentFile = $("#lossDP2")[0].files[0];
//     let paymentFileName = rentalId + "-payment_slip-" + $("#lossDP2")[0].files[0].name;
//
//     var dataP = new FormData();
//
//     dataP.append("payment_slip", paymentFile, paymentFileName);
//
//     $.ajax({
//         url: baseURL + "rental/uploadImg/" + rentalId,
//         method: "Post",
//         async: true,
//         contentType: false,
//         processData: false,
//         data: dataP,
//         success: function (res) {
//             console.log("Uploaded");
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: "Images Upload Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         },
//         error: function (error) {
//             let errorReason = JSON.parse(error.responseText);
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: "Images Not Upload Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     });
// }


// ===========================================================================

// let customerId = null;
// var driverId = "D005";
// var Driver ={};
var driverIds = [];

// var onHoldAmount = 0;
// var dailyRateAmount;
// var onHoldArray = [];
// var dailyRateArray = [];

// function getDamageWeiverTot() {
//     for (let i = 0; i < onHoldArray.length; i++) {
//         onHoldAmount += onHoldArray[i].onHold;
//
//     }
//     //
//     return onHoldAmount;
// }

// function getDailyRateTot() {
//     for (let i = 0; i < dailyRateArray.length; i++) {
//         dailyRateAmount += dailyRateArray[i].dailyRate;
//
//     }
//     return dailyRateAmount;
// }


getAllAvailableDriver();
var array = [];

function getRentDetail(rentId) {
    let rows = $("#CheckReTable").children().length;

    /* let vid = "V001";*/
    let pickUpDate = $("#txtFromDate").val();
    let driverOption = $("#selectDriver").val();
    let returnDate = $("#txtToDate").val();
    // let driverOption = $("#driverOpSelector").val();
    // console.log(driverOption);


    if (driverOption == "Driver") {
        for (let i = 0; i < rows; i++) {
            let registrationId = $("#CheckReTable").children().eq(i).children(":eq(0)").text();
            // let onHold = $("#CheckReTable").children().eq(i).children(":eq(4)").text();
            // let dailyRate = $("#CheckReTable").children().eq(i).children(":eq(2)").text();
            array.push({
                rentDetail: rentId,
                registrationId: registrationId,
                driverOption: driverOption,
                pickupDate: pickUpDate,
                returnDate: returnDate,
                driver_id: driverIds[i]
            });
            a(driverIds[i]);

            // onHoldArray.push({onHold});
            // dailyRateArray.push({dailyRate});
        }

    } else {
        driverId = "None";
        for (let i = 0; i < rows; i++) {
            let registrationId = $("#CheckReTable").children().eq(i).children(":eq(0)").text();
            // let onHold = $("#CheckReTable").children().eq(i).children(":eq(4)").text();
            // let dailyRate = $("#CheckReTable").children().eq(i).children(":eq(2)").text();
            array.push({
                rentDetail: rentId,
                registrationId: registrationId,
                driverOption: driverOption,
                pickupDate: pickUpDate,
                returnDate: returnDate,
                driver_id: driver_id
            });

            // onHoldArray.push({onHold});
            // dailyRateArray.push({dailyRate});
        }
    }

    // getDamageWeiverTot();
    // getDailyRateTot();
    return array;
}

// getCusNic();

// =====================meka rental eke nic ekata yawanna ==========================
// var cNic;
//
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
//
//             cNic = res.data.nic;
//         },
//         error: function (error) {
//             var jsObject = JSON.parse(error.responseText);
//             // alert("Invalid email or password");
//         }
//     });
// }


//===================================rental ekak danna=======================================
// var p;
// var r;
// $("#btnsendReq").click(function () {
    //=======================Calculate rental==========================================

    // p = $("#txtFromDate").val();
    // r = $("#txtToDate").val();

    // var pick = new Date(p);
    // var ret = new Date(r);
    // var rentAmount = (ret.getDate() - (pick.getDate()) * dailyRateAmount);
    // let duration = ((ret.getDate()) - (pick.getDate()));


    // var Rdata = new FormData();

    // let paymentSlipName = $("#lossDP2")[0].files[0].name;
    // let paymentSlipFile = $("#lossDP2")[0].files[0];


    // let rentId = $("#txtRentalId").val();
    // let pickupLocation = $("#txtFPickL").val();
    // let returnLocation = $("#txtReturnL").val();
    // // let slipImgPath = paymentSlipName;
    // let slipImgPath= $("#lossDP2")[0].files[0].name;
    // let statusOfReq = "Pending";
    // let total = 3000.00;
    // let cusId = cNic;
    // let totalDamageWaiverAmount =1000.00;
    // let rentDetail = getRentDetail(rentId);
    // console.log("date "+$("#DatPickDate").val())

    // let rent = {
    //     rentalId: rentId,
    //     pickUpDate: p,
    //     returnDate: r,
    //     pickupLocation: pickupLocation,
    //     returnLocation: returnLocation,
    //     rental_status: statusOfReq,
    //     amount: total,
    //     total_damage_waiver_payment: totalDamageWaiverAmount,
    //     duration: 10,
    //     // payment_slip: "uploads/" + slipImgPath,
    //     payment_slip:slipImgPath,
    //     cusNic: cusId,
    //     rentDetail: rentDetail
    //
    // }

    // Rdata.append("rImageFile", paymentSlipFile);//meka wenama
    // Rdata.append("rental", new Blob([JSON.stringify(rent)], {type: "application/json"}))//mekath wenama


//     $.ajax({
//         url: baseURL + "rental",
//         method: "post",
//         dataType: "json",
//         data:JSON.stringify(rent),
//         contentType:"application/json",
//         // async: true,
//         // contentType: false,
//         // processData: false,
//         // data: Rdata,
//         success: function (resp) {
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: "customer Added Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             sendRentImagePath();
//             // getAllAvailableDriver();
//         },
//         error: function (error) {
//             alert(JSON.parse(error.responseText).message);
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: "customer Not Added Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     });
//
// });

// =====================================================================

// function getCustomerId(id) {
//     customerId = id;
//     console.log("b" + customerId);
// }
//
// function sendRentImagePath() {
//     var data = new FormData();
//
//     // let file = $("#lossDP2")[0].files[0];
//     // let fileName = rentId + "-payment_slip-" + $("#lossDP2")[0].files[0].name;
//     // data.append("payment_slip", file, fileName);
//
//     let file = $("#lossDP2")[0].files[0];
//     let fileName = $("#lossDP2")[0].files[0].name;
//
//     data.append("myFile", file, fileName);
//
//     $.ajax({
//         url: baseURL + "api/rImageFile",
//         method: 'post',
//         async: true,
//         contentType: false,
//         processData: false,
//         data: data,
//         success: function (resp) {
//             console.log("Uploaded");
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: "Images Upload Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         },
//         error: function (err) {
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: "Images Not Upload Successfully",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     });
// }

//get added driver ids and updated driver availability
// function a(id) {
//     alert(id);
//     $.ajax({
//         url: baseURL + "driver",
//         dataType: "Json",
//         method: "get",
//         async:false,
//         success: function (resp) {
//             let driver;
//             for (const d of resp.data) {
//                 if (id == d.driver_id) {
//                     driver = {
//                         driver_id:d.driver_id,
//                         nic: d.nic,
//                         name: d.name,
//                         drivingLicenceNum:d.drivingLicenceNum,
//                         availability: "Unavailable"
//                     }
//                 }
//             }
//
//
//             //update driver
//             $.ajax({
//                 url: baseURL + "driver",
//                 method: "put",
//                 data: JSON.stringify(driver),
//                 contentType: "application/json",
//                 async:false,
//                 success: function (resp) {
//                     alert(resp.message);
//                 },
//                 error: function (error) {
//                     let prase = JSON.parse(error.responseText);
//                     alert(prase.message);
//
//                 }
//
//             });
//         },
//         error: function (error) {
//             let prase = JSON.parse(error.responseText);
//             alert(prase.message);
//
//         }
//     });
// }


// =========================================================


// function getAllAvailableDriver(){
// let available="Available";
// $.ajax({
//     url: baseURL+"driver/availability/drivers",
//     dataType:"json",
//     method: "get",
//     success: function (resp) {
//         console.log(resp)
//        alert(resp);
//             driverId = resp.data.driver_id;
//             driverIds.push(driverId);
//             //set all available drivers to array
//
//     }
//
// });

// ========================================

// function getAllAvailableDriver() {
//     $.ajax({
//         url: baseURL + "driver?availability=" + "Available",
//         dataType: "Json",
//         method: "get",
//         async:false,
//         success: function (resp) {
//                 driverIds.push(resp.data.driver_id);
//         }
//
//     });
//
//
// }



// ==============================================================================================




