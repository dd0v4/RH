const btns = document.querySelectorAll("#btn");
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];


btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        yesno = document.querySelector("#btnsModal");
        yesno.children[0].addEventListener("click", (e) => {
            const formId = `#${btn.parentElement.id}`; 
            console.log('Form ID:', formId); 
            const form = document.querySelector(formId); 
            form.submit(); 
        });
        yesno.children[1].addEventListener("click", (e) => {
            modal.style.display = "none";
        })
    })
})




window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

span.onclick = () => {
    modal.style.display = "none";
}