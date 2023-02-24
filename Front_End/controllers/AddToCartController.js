loadAllBrands();
loadAllTypes();
loadAllFuelTypes();
loadAllTransmission();
loadAllPassengers();

// searchBrands();
// searchTypes();
// searchFuelTypes();
// searchTransmission();
// searchFuelPassengers();

function loadAllBrands() {
    $("#selectBrand").empty();
    $.ajax({
        url: baseURL + "addToCart",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (let car of resp.data) {
                $("#selectBrand").append(`<option value="${car.brand}">${car.brand}</option>`);
            }
        }
    });
}