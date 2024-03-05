const add = document.querySelector("#adduser");
const addUserForm = document.querySelector("#addUserForm");


if(add && addUserForm){
    add.addEventListener("click", (e) => {
        addUserForm.style.display = "flex";
    }); 
}

