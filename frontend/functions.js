
async function start() {
    document.getElementById("form").onsubmit = handleFormRequest
}

async function handleFormRequest(evt) {
    evt.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await Auth.login(formData);

        console.log(response);

        window.location.replace("users")
    }catch(e) {
        console.log(e);
    }
    
}