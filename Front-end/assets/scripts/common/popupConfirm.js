function showConfirm(title) {
    return new Promise((resolve, reject) => {
        const popUp = document.querySelector('#popupAlert');
        if (!popUp) {
            reject(new Error('Popup not found'));
            return;
        }
        popUp.style.display = 'block';
        popUp.style.zIndex = '20';

        const noiDung = document.querySelector('#alertMessage')
        noiDung.textContent = title
        const xacNhan = document.querySelector('#confirmButton');
        const tuChoi = document.querySelector('#cancelButton');

        if (!xacNhan || !tuChoi) {
            reject(new Error('Buttons not found'));
            return;
        }

        xacNhan.onclick = function() {
            popUp.style.display = 'none';
            resolve(); // Giải quyết Promise khi người dùng nhấn xác nhận
        };
        tuChoi.onclick = function() {
            popUp.style.display = 'none';
            reject(new Error('User cancelled the action'));// Từ chối Promise khi người dùng nhấn từ chối
        };
    });
}

function showError(title) {
    return new Promise((resolve,reject) => {
        const popUp = document.querySelector('#popupAlertError');
        if (!popUp) {
            reject(new Error('Popup not found'));
            return;
        }
        popUp.style.display = 'block';
        popUp.style.zIndex = '20';

        const noiDung = document.querySelector('#errorMessage')
        noiDung.textContent = title
        const xacNhan = document.querySelector('#okButton');

        if (!xacNhan) {
            reject(new Error('Buttons not found'));
            return;
        }
        xacNhan.onclick = function() {
            popUp.style.display = 'none';
            resolve(); // Giải quyết Promise khi người dùng nhấn xác nhận
        };
    });
}

function showSuccess(title) {
    return new Promise((resolve,reject) => {
        const popUp = document.querySelector('#popupConfirmSuccess');
        if (!popUp) {
            reject(new Error('Popup not found'));
            return;
        }
        popUp.style.display = 'block';
        popUp.style.zIndex = '20';

        const noiDung = document.querySelector('#successMessage')
        noiDung.textContent = title
        const xacNhan = document.querySelector('#okSuccessButton');

        if (!xacNhan) {
            reject(new Error('Buttons not found'));
            return;
        }
        xacNhan.onclick = function() {
            popUp.style.display = 'none';
            resolve(); // Giải quyết Promise khi người dùng nhấn xác nhận
        };
    });
}

function showNavigation(title, href) {
    return new Promise((resolve, reject) => {
        const popUp = document.querySelector('#popupNavigation');
        if (!popUp) {
            reject(new Error('Popup not found'));
            return;
        }
        popUp.style.display = 'block';
        popUp.style.zIndex = '20';

        const noiDung = document.querySelector('#navigationMessage');
        if (noiDung) {
            noiDung.textContent = title;
        } else {
            reject(new Error('Navigation message element not found'));
            return;
        }

        const xacNhan = document.querySelector('#navigateButton');
        if (!xacNhan) {
            reject(new Error('Navigation button not found'));
            return;
        }

        xacNhan.onclick = function() {
            popUp.style.display = 'none';
            resolve(); 
            window.location.href = href; 
        };
    });
}

function showNavigationAlert(title, href) {
    return new Promise((resolve, reject) => {
        const popUp = document.querySelector('#popupNavigationAlert');
        if (!popUp) {
            reject(new Error('Popup not found'));
            return;
        }
        popUp.style.display = 'block';
        popUp.style.zIndex = '20';

        const noiDung = document.querySelector('#navigationMessageAlert');
        if (noiDung) {
            noiDung.textContent = title;
        } else {
            reject(new Error('Navigation message element not found'));
            return;
        }

        const xacNhan = document.querySelector('#navigateButtonAlert');
        if (!xacNhan) {
            reject(new Error('Navigation button not found'));
            return;
        }

        xacNhan.onclick = function() {
            popUp.style.display = 'none';
            resolve(); 
            window.location.href = href; 
        };
    });
}

