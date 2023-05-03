document.addEventListener("DOMContentLoaded", function () {
    fetch("components/price-table.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("priceTableContainer").innerHTML = html;
        })
        .catch((error) => {
            console.warn("Error loading price table:", error);
        });
});
