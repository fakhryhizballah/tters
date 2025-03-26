// Cegah klik kanan
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    // alert("Inspect Element dinonaktifkan!");
});

// Cegah tombol F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
        // alert("Inspect Element dinonaktifkan!");
    }
});
setInterval(function () {
    if (window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200) {
        document.body.innerHTML = "<h1>Akses Diblokir!</h1>";
    }
}, 1000);