const add = document.querySelector("#adduser");
const addUserForm = document.querySelector("#addUserForm");
const imgs = document.querySelector("#img");

if(add && addUserForm){
    add.addEventListener("click", (e) => {
        addUserForm.style.display = "flex";
    }); 
}
