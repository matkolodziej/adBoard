function adtypeChecked () {
    var adType = $('input[name="adType"]:checked').val();
    $('#adtype').val(adType);
}
function priceChecked() {
    //Get value of current checked radio
    var price = $('input[name="priceType"]:checked').val();
    if(price === "priceAmount") {
        $('input[name="priceAmount"]').change(function(){
            var value = $('#priceAmount').val();
            $('#priceFinal').val(value);
        }); 
    } else {
        $('#priceFinal').val(price);
    }
};
// Whenever radio button is clicked from priceType it checks it's value
$('input[name="priceType"]').on("click", function(){
    priceChecked();
});
$('input[name="priceAmount"]').on("click", function(){
    priceChecked();
});
$('input[name="adType"]').on("click", function(){
    adtypeChecked();
});