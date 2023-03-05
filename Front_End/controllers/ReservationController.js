loadPendingRentals();
//--------------------requests start-------------------------------------------
function loadPendingRentals() {
    // let status = "Pending";

    $('#veryresTable').empty();
    $.ajax({
        // url: baseURL + "rental/get/" + status,
        // method: "GET",
        url: baseURL+"rental",
        dataType: "json",
        success: function (res) {
            for (let carRent of res.data) {
                let driverId;
                if (carRent.driverOption === "None") {
                    driverId = "No Driver";
                } else {
                    driverId = carRent.driverID.driverID;
                }

                var row = '<tr><td>' + carRent.rentalId + '</td><td>' + carRent.cusNic + '</td><td>' + carRent.registrationID + '</td><td>' + carRent.pickUpDate + '</td><td>' + carRent.returnDate + '</td><td>' + carRent.pickupLocation + '</td><td>' + carRent.returnLocation + '</td><td>' + carRent.total_damage_waiver_payment + '</td><td>' + carRent.payment_slip + '</td><td>' + carRent.rental_status + '</td></tr>';
                $("#veryresTable").append(row);
            }
            bindRentalRequestTableClickEvents();
        }
    })
}

function bindRentalRequestTableClickEvents(){
    $('#veryresTable>tr').click(function () {
        let rentId = $(this).children().eq(0).text();
        findRentReq(rentId);
    })
}

function findRentReq(rentalId) {
    $.ajax({
        url: baseURL + "rental/search/" + rentalId,
        method: "GET",
        success: function (resp) {
            let rent = resp.data;

            let driverId;
            let driverName;
            if (rent.driverOption === "None") {
                driverId = "No Driver";
                driverName ="No Driver";
            } else {
                driverId = rent.driverID;
                // driverName = rent.driverID.name
            }

            $('#customerRentId').val(rent.rentalId);
            $('#txtCusDriverID').val(driverId);
            $('#txtCusRegistrationId').val(rent.registrationID);
            $('#txtCustomerNic').val(rent.cusNic);
            $('#txtCusRentStatus').val(rent.rental_status);


            // searchAndLoadRentReqBankSlipImgs(rentId);

        },
        error: function (error) {
            let errorReason = JSON.parse(error.responseText);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Rent " + rentId + " Not Exist...",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
}

// function searchAndLoadRentReqBankSlipImgs(rentId) {
//     $('#inputReqImageOfBankSlip').empty();
//
// //     $.ajax({
// //         url: baseUrl + "rent/" + rentId,
// //         method: "GET",
// //         success: function (res) {
// //             let rent = res.data;
// //             console.log(rent)
// //             let bankSlipPath = rent.bankSlip;
// //             let bankSlipImg = bankSlipPath.split("E:\\Working Directory\\works\\GitUplode\\Car Rental System\\Car_Rental_System_With_SpringWebMVC\\Spring_Front_End\\assests\\savedImages\\Rent")[1];
// //             let bankSlipImgScr = "../assests/savedImages/Rent" + bankSlipImg;
// //             console.log(bankSlipImgScr);
// //
// //             let slipImage = `<img src=${bankSlipImgScr} alt="Bank Slip" style="background-size: cover;width: 100%;height: 100%">`;
// //             $('#inputReqImageOfBankSlip').append(slipImage);
// //
// //         }
// //     })
// }

// $("#btnSearchRentReq").click(function (){
//     var rentId = $('#inputRentReqSearch').val();
//     findRentReq(rentId);
// });

$("#btnAacceptReq").click(function (){
    if ($('#customerRentId').val() != "") {
        acceptRental();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: "Please Select Car Rent from Table",
            showConfirmButton: false,
            timer: 1500
        });
    }
});

function acceptRental() {
    let rentId = $('#customerRentId').val();
    let status = "Accepted";

    $.ajax({
        url: baseURL + "rental/" + rentId + "/" + status,
        method: "PUT",
        success: function (res) {
            // loadAllRents();
            loadPendingRentals();
            // loadTodayRents();
            updateDriverStatus();
            updateCarStatus();
            // clearRentRequestFields();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Car Rental Accepted Successfully",
                timer: 1500
            });
        },
        error: function (ob) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Car Rental Not Accepted",
                timer: 1500
            });

        }
    })
}

function updateCarStatus() {
    let registrationNo = $('#txtCusRegistrationId').val();
    let status = "Not Available";

    $.ajax({
        url: baseURL + "car/updateCarAvailability/" + registrationNo + "/" + status,
        method: "PUT",
        success: function (res) {
            loadAllCars();
            // getAvailableCarCount();
            // getRentCount();
        }

    })
}

function updateDriverStatus() {
    let driverID = $('#txtCusDriverID').val();
    let status = "Not Available";

    if (driverID != "None") {
        $.ajax({
            url: baseURL + "driver/updateNonAvailable/" + driverID +"/" +status,
            method: "PUT",
            success: function (res) {
                // loadAllDrivers();
                // getAvailableDriverCount();
            }
        })
    }
}

// function clearRentRequestFields(){
//     $('#inputReqRentID').val("");
//     $('#inputReqRentDate').val("");
//     $('#inputReqCarRegNo').val("");
//     $('#inputReqUserID').val("");
//     $('#inputReqNameOfUser').val("");
//     $('#inputReqPickUpDate').val("");
//     $('#inputReqPickUpTime').val("");
//     $('#inputReqPickUpVenue').val("");
//     $('#inputReqReturnDate').val("");
//     $('#inputReqReturnTime').val("");
//     $('#inputReqReturnVenue').val("");
//     $('#inputReqDriverID').val("");
//     $('#inputReqNameOfDriver').val("");
//     $('#inputReqLossDamageWaiver').val("");
//     $('#inputReqRentStatus').val("");
//     $('#inputReqImageOfBankSlip').empty();
//     $('#inputRentReqSearch').val("");
//     $('#inputReqReasonDeny').val("");
//
// }

// $('#btnRentReqDeny').click(function () {
//
//     if ($('#customerRentId').val() != "" && $('#inputReqReasonDeny').val() != "") {
//         let rentId = $('#inputReqRentID').val();
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, Deny!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 rejectRentals(rentId);
//                 Swal.fire(
//                     'Deny!',
//                     'Request has been Denied.',
//                     'success'
//                 )
//             }
//         })
//
//     } else {
//         Swal.fire({
//             position: 'top-end',
//             icon: 'info',
//             title: "Please Select Car Rent from Table Or Send Reason To Deny Request",
//             showConfirmButton: false,
//             timer: 1500
//         });
//     }
// })

// function rejectRentals(rentId) {
//     $.ajax({
//         url: baseUrl + "rent?rentId=" + rentId,
//         method: "DELETE",
//         success: function (res) {
//             loadAllRents();
//             loadPendingRentals();
//             loadTodayRents()
//             clearRentRequestFields();
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: "Car Rental Deny",
//                 timer: 1500
//             });
//
//         },
//         error: function (ob) {
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: "Car Rental Not Deny",
//                 timer: 1500
//             });
//         }
//     })
// }

// $("#btnRefreshRentRequest").click(function (){
//     clearRentRequestFields();
// });

//--------------------requests end-------------------------------------------