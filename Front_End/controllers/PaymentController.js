generatePaymentId();

function generatePaymentId() {
    $.ajax({
        url: baseURL + "payment/generatePaymentId",
        dataType: "json",
        success: function (res) {
            for (let rent of res.data) {
                $('#paymentId').val(res.data);
            }
        }
    })
}