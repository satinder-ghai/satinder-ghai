document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.product-item a').forEach(item, function (index, value) {
      console.log(index, value); // passes index + value back!
    });
});