generateRentId();
carAppend();
// CustomerAccount();


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

                // if(car.availability==="Available") {
                //     $("#cStatusV").css({'color': 'red'});
                // }

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



//===================================rental ekak danna=======================================
var p;
var r;

desable();
function desable(){
    let status = $("#CheckReTable").children().eq(0).children(":eq(8)").text();
    if (status == "Available"){
        $("#btnsendReq").prop('disabled',true);
    }

}
$("#btnsendReq").click(function () {
    addRental();
    CustomerAccount();
    loadPendingRentals();

});

function addRental() {

    let driverOption = $("#selectDriver").val();

    p = $("#txtFromDate").val();
    r = $("#txtToDate").val();


    let paymentSlipName = $("#lossDP2")[0].files[0].name;

    let registrationId = $("#CheckReTable").children().eq(0).children(":eq(0)").text();
    let onHold = $("#CheckReTable").children().eq(0).children(":eq(4)").text();

    console.log(registrationId);

    let rentId = $("#txtRentalId").val();
    let pickupLocation = $("#txtFPickL").val();
    let returnLocation = $("#txtReturnL").val();
    let slipImgPath = paymentSlipName;
    let statusOfReq = "Pending";
    let cusId = $("#anic").text();
    let driverID = $("#driverID").val();

    let rent = {
        rentalId: rentId,
        driverOption: driverOption,
        payment_slip: "uploads/" + slipImgPath,
        pickUpDate: p,
        returnDate: r,
        pickupLocation: pickupLocation,
        returnLocation: returnLocation,
        rental_status: statusOfReq,
        total_damage_waiver_payment: onHold,
        cusNic: cusId,
        driverID: driverID,
        registrationID: registrationId
    }
    console.log(JSON.stringify(rent))

    $.ajax({
        url: baseURL + "rental",
        method: "POST",
        async: true,
        contentType: "application/json",

        data: JSON.stringify(rent),
        success: function (resp) {
            sendRentImagePath(rentId);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Rental Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            // updateCarAvai();
            bindRentRowClickEvents();
        },
        error: function (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Rental Not Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

// =====================================================================

function sendRentImagePath(rentId) {
    var data = new FormData();

    let file = $("#lossDP2")[0].files[0];
    let fileName = rentId + "-payment_slip-" +  $("#lossDP2")[0].files[0].name;

    data.append("payment_slip", file, fileName);

    $.ajax({
        url: baseURL + "rental/uploadImg/" + rentId,
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            console.log("Uploaded");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Images Upload Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function (err) {
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


// ========================================

$('#selectDriver').change(function () {
    let driverOption = $('#selectDriver').find('option:selected').text();
    // console.log(driverOption);
    if (driverOption == "Driver"){
        // randomDriver();
    }
    else {
        addRental("None");
    }
})
randomDriver();
function randomDriver(){
    $.ajax({
        url: baseURL + "driver/randomDriver",
        dataType:"json",
        success: function (resp) {
            // console.log(resp.data.driver_id)
                $("#driverID").val(resp.data.driverID);

        }

    });
}

// ==============================================================================================




