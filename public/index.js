// let username = document.getElementById('username-box').value;
let form = document.getElementById('form');
let exist = document.getElementById('note');
console.log('register')
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let conpass = document.getElementById('conpass').value;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let obj = {
            "username": username,
            "email": email,
            "password": password,
            "confirmPassword": conpass,
            "name": name,
            "phone": phone

        }
        console.log(obj);
        axios.post('api/user/signup', obj).then((res) => {
            console.log(res);
            if (res.data) {
                alert('Already Exists')
                exists.style.display = 'block';
            }
            else {
                alert('Registered')
                location.href = '/login';
            }

        })
    })
}