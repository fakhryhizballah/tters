// event.preventDefault();
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
});

async function kirimOTP() {
    console.log('test');
    const no_wa = document.querySelector('#nomorWa').value;
    console.log(no_wa.length);
    if (no_wa.length < 10) {
        Swal.fire({
            title: 'Opps',
            text: 'Nomor Whatsapp minimal 10 digit',
            icon: 'info',
            draggable: true,
            timer: 1500
            // confirmButtonText: 'Cool'
        })
        return;
    }
    fetch('/api/otp', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ no_wa })
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                Swal.fire({
                    title: 'Berhasil',
                    text: data.message,
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                })
            } else {
                Swal.fire({
                    title: 'Opps',
                    text: data.message,
                    icon: 'warning',
                    // confirmButtonText: 'Cool'
                })
            }
        })
        .catch(err => console.log(err));
}

async function login() {
    console.log("v")
    const no_wa = document.querySelector('#nomorWa').value;
    const otp = document.querySelector('#otp').value;

    if (no_wa.length < 10 ) {
        Swal.fire({
            title: 'Opps',
            text: 'Nomor Whatsapp Tidak Valid',
            icon: 'info',
            draggable: true
    
        })
        return;
    }
    if (otp.length !=5) {
        Swal.fire({
            title: 'Opps',
            text: 'OTP Tidak Valid',
            icon: 'info',
            draggable: true
        })
        return;
    }
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ no_wa,otp })
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                Swal.fire({
                    title: 'Berhasil',
                    text: data.message,
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                })
            } else {
                Swal.fire({
                    title: 'Opps',
                    text: data.message,
                    icon: 'warning',
                    // confirmButtonText: 'Cool'
                })
            }
        })
        .catch(err => console.log(err));
    
    
}