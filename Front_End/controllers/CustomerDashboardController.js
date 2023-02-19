$("#home").click(function () {
    $("#headContent").css('display','block');
    $("#main3").css('display','block');
    $("#foot").css('display','block');
    $("#storeContent").css('display','none');
    $("#checkOutContent").css('display','none');
    $("#accountContent").css('display','none');
    $("#CloginContext").css('display','none');
    $("#cusRegiContent").css('display','none');
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

$("#store").click(function () {
    $("#headContent").css('display','none');
    $("#main3").css('display','none');
    $("#foot").css('display','none');
    $("#storeContent").css('display','block');
    $("#checkOutContent").css('display','none');
    $("#accountContent").css('display','none');
    $("#CloginContent").css('display','none');
    $("#cusRegiContent").css('display','none');
});

$("#checkout").click(function () {
    $("#headContent").css('display','none');
    $("#main3").css('display','none');
    $("#foot").css('display','none');
    $("#storeContent").css('display','none');
    $("#checkOutContent").css('display','block');
    $("#accountContent").css('display','none');
    $("#CloginContent").css('display','none');
    $("#cusRegiContent").css('display','none');
});