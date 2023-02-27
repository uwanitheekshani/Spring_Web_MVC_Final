generateRentId();
carAppend();

function carAppend(){
    $("#selectCar").empty();

    $.ajax({
        url: baseURL+"car",
        // dataType: "json",
        method:"Get",
        success: function (resp) {

            let i=resp.data.type;
             // if (resp.data.registrationId==)
         console.log(resp.data);

    for (let car of resp.data) {
        // console.log(resp.data.imag);
    var d = `<div class="swiper-slide">
                        <div class="testimonial-wrap">
                            <div class="testimonial-item">
                                <img src=${"http://localhost:8080/Spring_Web_MVC_Final_war/"+car.image_1} class="testimonial-img" alt="" style="position: relative;width: 200px;height: 200px;">
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


// let carDetails = [];
// function setCarFieldValues(dailyRate, monthlyRate, lossDamageAmount, brand, type, transmission, Fuel, noOfPassengers, carNum) {
//
//     carDetails.push(dailyRate);
//     carDetails.push(monthlyRate);
//     carDetails.push(lossDamageAmount);
//     carDetails.push(brand);
//     carDetails.push(type);
//     carDetails.push(transmission);
//     carDetails.push(Fuel);
//     carDetails.push(noOfPassengers);
//     carDetails.push(carNum);
//
// }

function loadCheckCars(id){
    let from=$("#txtFromDate").val();
    let to=$("#txtToDate").val();
    let selectDri=$("#selectDriver").val();
    // let lossPaySlip=$("#lossDP2").val();


    $.ajax({
        url: baseURL+"car?registrationId="+id,
        method :"get",
        dataType:"json",
        success: function (resp) {
            console.log(resp);
            console.log(resp.data);

            let lossDamagePrice="";

            if(resp.data.type=="General"){
                lossDamagePrice=10000;
            }else if (resp.data.type=="Premium"){
                lossDamagePrice=15000;
            }else{
                lossDamagePrice=20000;
            }

            $("#CheckReTable").append("<tr><td>"+resp.data.registrationId+"</td><td>"+resp.data.brand+"</td><td>"+resp.data.dailyRate+"</td><td>"+resp.data.monthlyRate+"</td><td>"+lossDamagePrice+"</td><td>"+from+"</td><td>"+to+"</td><td>"+selectDri+"</td><td>"+resp.data.availability+"</td></tr>")

        },
        error: function(error) {
            let prase = JSON.parse(error.responseText);
        }
        });
}

$('body').on('click', '.cart1', function() {
    alert("Add to cart "+this.id);
    loadCheckCars(this.id);
});

             // ======================================================================================================

function generateRentId() {
    $.ajax({
        url: baseURL + "rental/generateRentalId",
        method: "GET",
        success: function (res) {
            console.log(res)
            $('#txtRentalId').text(res.data);
        }
    })
}
         // ===================================================

$("#btnsendReq").click(function (){
    addRental();
});

// var lossDamage="";
var driverId="";
var array = [];
var carDetailArray=[];

getDamageWeiverTot();
let onHoldAmount = 0;
function getDamageWeiverTot(){
    for (let i=0; i<carDetailArray.length; i++){
        onHoldAmount +=  carDetailArray[i].onHold;
    }
    return onHoldAmount;
}

              // ==========================meka rental details ekata adala data tika yawanna=================================

function getRentDetails(rentalId) {
    let rows = $("#CheckReTable").children().length;
    // let rentalId =  $("#txtRe").val();
    for (let i = 0; i < rows; i++) {
        let carNum = $("#CheckReTable").children().eq(i).children(":eq(0)").text();
        let carBrand = $("#CheckReTable").children().eq(i).children(":eq(1)").text();
        let dailyRate= $("#CheckReTable").children().eq(i).children(":eq(2)").text();
        let monthlyRate = $("#CheckReTable").children().eq(i).children(":eq(3)").text();
        let onHold= $("#CheckReTable").children().eq(i).children(":eq(4)").text();
        let from = $("#CheckReTable").children().eq(i).children(":eq(5)").text();
        let to= $("#CheckReTable").children().eq(i).children(":eq(6)").text();
        let driver = $("#CheckReTable").children().eq(i).children(":eq(7)").text();
        let carStatus = $("#CheckReTable").children().eq(i).children(":eq(8)").text();
        array.push({rentalId:rentalId,registrationId:carNum,pickUpDate: from,returnDate: to,
            driverOption:driver,driverId:driverId});

        carDetailArray.push({rentalId:rentalId,registrationId:carNum,pickUpDate: from,returnDate: to,
            driverOption:driver,driverId:driverId,brand:carBrand,dailyRate:dailyRate,monthlyRate:monthlyRate,
        availability:carStatus,onHold});
    }
    return array;
}


    //========================meka driver id eka ganna==========================
//Load all drivers
function loadAllDrivers() {
    $.ajax({
        url: baseURL+"driver",
        method:"Get",
        dataType: "json",
        success: function (resp) {
            console.log(resp.data );
            for (let dri of resp.data){
                if (dri.availability=="Available"){
                    driverId=dri.driver_id;
                    console.log(driverId);
                }
            }
        }
    });

}




// =====================meka rental eke nic ekata yawanna ==========================
var cNic;
function getCusNic(){
    let email =  $("#ae").text();

    $.ajax({
        url: baseURL+"customerLogin?email="+email,
        method: "get",
        dataType:"json",
        success: function (res) {

            console.log(res.data);
            // let userNic = res.data.nic;

            cNic=res.data.nic;
        },
        error:function(error){
            var jsObject=JSON.parse(error.responseText);
            alert("Invalid email or password");
        }
    });
}


          // =============================rental ekak add krnna meka===============================

var p;
var r;
var dailR;
function addRental() {

    for(let sd of array){
        p=sd.pickUpDate;
        r=sd.returnDate;
        dailR=sd.dailyRate;
    }

    let rentalId =  $("#txtRentalId").val();
    var pick = new Date(p);
    var ret = new Date(r);
    var rentAmount = (ret.getDate() - pick.getDate())*dailR;
    // alert(diffDays)

    let totalRent = $("#txtTotalRent").val(rentAmount);
    let pickUpLocation= $("#txtFPickL").val();
    let returnLocation= $("#txtReturnL").val();
    let totalDamageWaiverAmount= $("#txtLossDwa").val(onHoldAmount);
    let pickupD=p;
    let returnD=r;
    let rentStat=$("#txtRentalStatus").val();
    let rentD = getRentDetails(rentalId);


    var rent = {
        rentalId : rentalId,
        amount : amount,
        pickupLocation : pickUpLocation,
        returnLocation : returnLocation,
        total_damage_waiver_payment : totaldamageWaiverAmount,
        pickUpDate : drivingLicenceNumber,
        nic:cNic

        // returnDate : email,
        // password : password,
        // user_name:user_name,
    }

    $.ajax({
        url: baseURL + "rental",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(rent),
        success: function (resp) {
            updateDriverStatus();
            uploadCustomerImages(rentalId);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            // clearCustomerTextFields();
            // $("#storeContent").css('display','block');
            // $("#mainh").css('display','none');
            // $("#main3").css('display','none');
            // $("#foot").css('display','none');
            // $("#checkOutContent").css('display','none');
            // $("#accountContent").css('display','none');
            // $("#loginContent").css('display','none');
            // $("#cusRegiContent").css('display','none');
            // $("#cusUpdateContent").css('display','none');
            // $("#ae").text(email);
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Rental Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

               // ==============car eke status eka update karanna================================

function updateCarStatus(){
    $.ajax({
        url: baseURL+'car',
        method: 'put',
        contentType:"application/json",
        // data:JSON.stringify(customer),
        dataType:"json",
        success: function (res) {

            for (let car of carDetailArray){
               if (car.availability=res.availability){
                   res.availability="Unavailable";
               }
            }
            // alert(res.message);
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
        }
    });
}


                // ===============driver eke status eka upadate karanna==============================
function updateDriverStatus(){
    $.ajax({
        url: baseURL+'driver',
        method: 'put',
        contentType:"application/json",
        // data:JSON.stringify(customer),
        dataType:"json",
        success: function (res) {

            for (let dri of res.data){
                if (dri.driver_id=driverId){
                    dri.data.availability="Unavailable";
                }
            }
            // alert(res.message);
        },
        error:function (error){
            let cause= JSON.parse(error.responseText).message;
            alert(cause);
        }
    });
}



// ===============*bank slip eka add karanna==============================

function uploadPaymentSlipImages(rentalId) {

    let paymentFile = $("#lossDP2")[0].files[0];

    let paymentFileName = nicNum + "-imageLocation-" + $("#lossDP2")[0].files[0].name;

    var data = new FormData();

    data.append("imageLocation", nicFile, nicFileName);

    $.ajax({
        url: baseURL + "customer/uploadImg/" + nicNum,
        method: "PUT",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (res) {
            console.log("Uploaded");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Images Not Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}
