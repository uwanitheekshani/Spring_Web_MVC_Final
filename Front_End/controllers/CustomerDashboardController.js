$("#home").click(function () {
    $("#headContent").css('display','block');
    $("#main3").css('display','block');
    $("#foot").css('display','block');
    $("#storeContent").css('display','none');
    $("#checkOutContent").css('display','none');
    $("#accountContent").css('display','none');
});

$("#account").click(function () {
    $("#headContent").css('display','none');
    $("#main3").css('display','none');
    $("#foot").css('display','none');
    $("#storeContent").css('display','none');
    $("#checkOutContent").css('display','none');
    $("#accountContent").css('display','block');
    $("#CloginContext").css('display','none');
    $("#cusRegiContent").css('display','none');
});

// $("#item").click(function () {
//     $("#dashboardContent").css('display','none');
//     $("#customerContent").css('display','none');
//     $("#itemContent").css('display','block');
//     $("#orderContent").css('display','none');
// });
//
// $("#order").click(function () {
//     $("#dashboardContent").css('display','none');
//     $("#customerContent").css('display','none');
//     $("#itemContent").css('display','none');
//     $("#orderContent").css('display','block');
// });