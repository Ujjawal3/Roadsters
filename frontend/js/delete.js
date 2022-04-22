const button=document.querySelector('.buttons button[link]');

const remove=()=>{
    if(confirm("Do you really want to delete this?"))
    {
        fetch(button.getAttribute('link'),{
        method:"delete",
        }).then((res)=>{
            location.href="/seller/dashboard";
        })
    }
}
button.addEventListener('click',remove);