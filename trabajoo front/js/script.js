const arrayhobbies = [];

function validar() {
    const usernameValido = validarUsername();
    const claveValida = validarClave();
    const repasswordValida = validarRepassword();
    const direccionValida = validarDireccion();
    const comunaValida = validarComuna();
    const telefonoValido = validarTelefono();
    const urlValida = validarUrl();
    const hobbiesValidos = validarHobbies();
    return usernameValido && claveValida && repasswordValida && direccionValida && comunaValida && telefonoValido && urlValida && hobbiesValidos;
}

function validarUsername() {
    const input = document.getElementById("username");
    const div = document.getElementById("username-msg");
    const username = input.value;

    if (username === "") {
        div.innerText = "Ingresa un nombre de usuario";
        return false;
    }
    if (username.length < 5 || username.length > 10) {
        div.innerText = "El usuario debe tener entre 5 y 10 caracteres";
        return false;
    }

    let hayDigito = false;
    for (let i = 0; i < username.length; i++) {
        const c = username[i];
        const esLetra = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
        const esNum = c >= '0' && c <= '9';

        if (i === 0 && !esLetra) {
            div.innerText = "El usuario debe comenzar con una letra";
            return false;
        }
        if (esNum) {
            hayDigito = true;
        } else if (esLetra && hayDigito) {
            div.innerText = "Los números deben ir solo al final";
            return false;
        } else if (!esLetra && !esNum) {
            div.innerText = "Solo letras y números, sin símbolos ni acentos";
            return false;
        }
    }
    div.innerText = "";
    return true;
}

function validarClave() {
    const input = document.getElementById("password");
    const div = document.getElementById("password-msg");
    const password = input.value;
    const username = document.getElementById("username").value;

    if (password === "") {
        div.innerText = "Ingresa una contraseña";
        return false;
    }
    if (password.length < 3 || password.length > 6) {
        div.innerText = "La contraseña debe tener entre 3 y 6 caracteres";
        return false;
    }

    let tieneLetra = false, tieneDigito = false;
    for (let i = 0; i < password.length; i++) {
        if ((password[i] >= 'a' && password[i] <= 'z') || (password[i] >= 'A' && password[i] <= 'Z')) tieneLetra = true;
        if (password[i] >= '0' && password[i] <= '9') tieneDigito = true;
    }

    if (!tieneLetra || !tieneDigito) {
        div.innerText = "La contraseña debe tener al menos una letra y un numero";
        return false;
    }

    if (username !== "" && password.toLowerCase().indexOf(username.toLowerCase()) !== -1) {
        div.innerText = "La contraseña no puede contener el nombre de usuario";
        return false;
    }

    div.innerText = "";
    return true;
}

function validarRepassword() {
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const div = document.getElementById("repassword-msg");

    if (repassword === "") {
        div.innerText = "Repite la contraseña";
        return false;
    }
    if (password !== repassword) {
        div.innerText = "Las contraseñas no coinciden";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarDireccion() {
    const input = document.getElementById("direccion");
    const div = document.getElementById("direccion-msg");

    if (input.value.trim() === "") {
        div.innerText = "Ingresa tu dirección";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarComuna() {
    const select = document.getElementById("comuna");
    const div = document.getElementById("comuna-msg");

    if (select.value === "") {
        div.innerText = "Selecciona una comuna";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarTelefono() {
    const input = document.getElementById("telefono");
    const div = document.getElementById("telefono-msg");
    const telefono = input.value.trim();

    if (telefono === "") {
        div.innerText = "Ingresa un numero de telefono";
        return false;
    }
    if (telefono.length !== 12) {
        div.innerText = "Formato: +56XXXXXXXXX";
        return false;
    }
    if (telefono[0] !== '+' || telefono[1] !== '5' || telefono[2] !== '6') {
        div.innerText = "El teléfono debe comenzar con +56";
        return false;
    }
    for (let i = 3; i < telefono.length; i++) {
        if (telefono[i] < '0' || telefono[i] > '9') {
            div.innerText = "Solo dígitos después del +56";
            return false;
        }
    }
    div.innerText = "";
    return true;
}

function validarUrl() {
    const input = document.getElementById("url");
    const div = document.getElementById("url-msg");
    const url = input.value.trim();

    if (url === "") {
        div.innerText = "";
        return true;
    }
    if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
        div.innerText = "La URL debe comenzar con http:// o https://";
        return false;
    }
    if (url.indexOf(".") === -1) {
        div.innerText = "Ingresa un dominio válido (ej: https://mipagina.cl)";
        return false;
    }
    if (url[url.length - 1] === ".") {
        div.innerText = "El dominio no puede terminar en punto";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarHobbies() {
    const div = document.getElementById("hobby-msg");

    if (arrayhobbies.length < 2) {
        div.innerText = "Debes agregar al menos 2 aficiones";
        div.classList.add("text-danger");
        return false;
    }
    div.innerText = "";
    return true;
}

function agregar() {
    const input = document.getElementById("hobby");
    const div = document.getElementById("hobby-msg");
    const hobby = input.value.trim();

    if (hobby === "") {
        div.innerText = "Escribe una afición antes de agregar";
        div.classList.add("text-danger");
        return;
    }
    if (arrayhobbies.indexOf(hobby) !== -1) {
        div.innerText = "Esa afición ya está en la lista";
        div.classList.add("text-danger");
        return;
    }
    arrayhobbies.push(hobby);
    actualizar();
    input.value = "";
    div.innerText = arrayhobbies.length + " aficion(es) agregada(s)";
    div.classList.remove("text-danger");
    div.classList.add("text-success");
}

function actualizar() {
    const ul = document.getElementById("hobby-list");
    ul.innerHTML = "";
    for (let i = 0; i < arrayhobbies.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerText = arrayhobbies[i];

        const btn = document.createElement("button");
        btn.innerText = "✕";
        btn.className = "btn btn-sm btn-outline-danger";
        btn.type = "button";
        btn.setAttribute("data-index", i);
        btn.onclick = function () { eliminarHobby(parseInt(this.getAttribute("data-index"))); };

        li.appendChild(btn);
        ul.appendChild(li);
    }
}

function eliminarHobby(index) {
    arrayhobbies.splice(index, 1);
    actualizar();
    const div = document.getElementById("hobby-msg");
    div.innerText = arrayhobbies.length + " afición(es) agregada(s)";
    div.classList.remove("text-danger");
    div.classList.add("text-success");
}

function limpiarForm() {
    arrayhobbies.length = 0;
    actualizar();
    document.querySelectorAll("[id$='-msg']").forEach(function(el) {
        el.innerText = "";
        el.classList.remove("text-success");
        el.classList.remove("text-danger");
    });
}