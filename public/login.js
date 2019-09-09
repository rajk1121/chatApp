const login = async (email, password) => {

    const obj = {
        "email": email,
        "password": password
    }
    console.log("hello")
    axios.post('api/user/signIn', obj).then((res) => {
        if (res.data.status == "Logged In") {
            alert("User logged in");
            window.setTimeout(() => {
                location.assign('/user')
            }, 1000)
        }
        else {
            alert("Incorrect Creds");
            window.setTimeout(() => {
                location.reload(true);
            }, 1000)
        }
    })
}
const register = document.getElementById('Register');
if (register) {
    register.addEventListener('click', (e) => {
        e.preventDefault();
        location.assign('/register');
    })
}
// const logout = async () => {
//     axios.get('/api/user/logout').then((res) => {
//         console.log('dsivbsv')
//         console.log(res)
//         if (res.data == 'User Logged Out') {
//             location.assign('/');
//         }
//     })
// }
const loginform = document.querySelector('.login-form');
if (loginform) {
    loginform.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        console.log(email);
        const password = document.getElementById('password').value;
        login(email, password);
    })
}
// const forgot = document.getElementById('forgot');
// if (forgot) {
//     forgot.addEventListener('click', (e) => {
//         e.preventDefault();
//         location.href = '/forgetPassword';
//     })
// }
// const logoutbtn = document.getElementsByClassName('logoutbtn');
// if (logoutbtn) {

//     if (logout[0]) {
//         logoutbtn[0].addEventListener('click', (e) => {
//             console.log('logout')
//             e.preventDefault();
//             logout();
//         })
//     }

//     if (logout[1]) {
//         logoutbtn[1].addEventListener('click', (e) => {
//             console.log('logout')
//             e.preventDefault();
//             logout();
//         })
//     }
// }