
carAppend();

function carAppend(){
    $("#selectCar").empty();

    $.ajax({
        url: baseURL+"car",
        dataType: "json",
        success: function (resp) {

            let i=resp.data.type;
            // switch (){
            //
            // }
    for (let car of resp.data) {
    var d = `<div class="swiper-slide">
                        <div class="testimonial-wrap">
                            <div class="testimonial-item">
                                <img src="assets/images/photo_2023-02-11_09-33-08.jpg" class="testimonial-img" alt="">
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

                                    <h4 id="Bri">${car.brand}</h4>
                                    <h4 id="Tyi">${car.type}</h4>
                                    <h4 id="Tri">${car.transmissionType}</h4>
                                    <h4 id="Fui">${car.fuelType}</h4>
                                    <h4 id="Nopf">${car.noOfPassengers}</h4>
                                    <h4 id="Cnum">${car.registrationId}</h4>
                                  


                                </div>

                            </div>
                        </div>
                    </div>`;
    $("#selectCar").append(d);
             }
            setCarFieldValues("","","","","", "", "", "","");
        }
        });
}


let carDetails = [];
function setCarFieldValues(dailyRate, monthlyRate, lossDamageAmount, brand, type, transmission, Fuel, noOfPassengers, carNum) {

    carDetails.push(dailyRate);
    carDetails.push(monthlyRate);
    carDetails.push(lossDamageAmount);
    carDetails.push(brand);
    carDetails.push(type);
    carDetails.push(transmission);
    carDetails.push(Fuel);
    carDetails.push(noOfPassengers);
    carDetails.push(carNum);

}

function loadCheckCars(id){
    let from=$("#txtFromDate").val();
    let to=$("#txtToDate").val();
    let selectDri=$("#selectDriver").val();
    let lossPaySlip=$("#lossDP2").val();


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

            $("#CheckReTable").append("<tr><td>"+resp.data.brand+"</td><td>"+resp.data.dailyRate+"</td><td>"+resp.data.monthlyRate+"</td><td>"+lossDamagePrice+"</td><td>"+from+"</td><td>"+to+"</td><td>"+selectDri+"</td></tr>")

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

