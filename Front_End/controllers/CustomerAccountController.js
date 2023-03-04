// CustomerAccount();
//
// function CustomerAccount(){
//         $("#orderTable").empty();
//         $.ajax({
//             url: baseURL+"rental",
//             dataType: "json",
//             success: function (resp) {
//                 console.log(resp);
//                 // for (let i = 0; i < resp; i++) {
//                     // resp.data.rentalId=$("#orderTable").children().eq(i).children(":eq(0)").text();
//                     // resp.data.amount=$("#orderTable").children().eq(i).children(":eq(3)").text();
//                     // resp.data.rental_status=$("#orderTable").children().eq(i).children(":eq(6)").text();
//                     // var row = '<tr><td>' + cus.id + '</td><td>' + cus.name + '</td><td>' + cus.address + '</td><td>' + cus.salary + '</td></tr>';
//                     // $("#tblCustomer").append(row);
//                 // }
//
//                 for (let acc of resp.data) {
//                     var row = '<tr><td>' + acc.rentalId + '</td><td>' + acc.pickUpDate + '</td><td>' + acc.returnDate + '</td><td>' + acc.pickupLocation + '</td><td>' + acc.returnLocation + '</td><td>' + acc.nic + '</td><td>' + acc.amount + '</td></tr>';
//                     $("#carViewTable").append(row);
//
//                 }
//
//             }
//         });
//
//     // $.ajax({
//     //     url: baseURL+"rentalDetails",
//     //     dataType: "json",
//     //     success: function (resp) {
//     //         console.log(resp);
//     //         for (let i = 0; i < resp; i++) {
//     //             resp.data.registrationId=$("#orderTable").children().eq(i).children(":eq(1)").text();
//     //             resp.data.driver_id=$("#orderTable").children().eq(i).children(":eq(2)").text();
//     //             resp.data.pickUpDate=$("#orderTable").children().eq(i).children(":eq(4)").text();
//     //             resp.data.returnDate=$("#orderTable").children().eq(i).children(":eq(5)").text();
//     //             // var row = '<tr><td>' + cus.id + '</td><td>' + cus.name + '</td><td>' + cus.address + '</td><td>' + cus.salary + '</td></tr>';
//     //             // $("#tblCustomer").append(row);
//     //         }
//     //
//     //     }
//     // });
//
//
// }