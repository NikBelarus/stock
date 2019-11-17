export default function Menu(){
    const col = document.getElementById('menu');
    if(col.style.display === "none"){
        col.style.display = "block";
    } else {
        col.style.display = "none";
    }
}
