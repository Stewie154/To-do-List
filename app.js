//select the elements
const clear = document.querySelector('.clear');
const dateElemenet = document.getElementById('date');
const list = document.getElementById('list');
const addButton = document.querySelector('.fa-plus-circle')
const input = document.getElementById('input');

//class names

const check = document.querySelector('.fa-check-circle');
const uncheck = document.querySelector('.fa-circle');
const line_through = document.querySelector('line-through');

// show today's date
const options = {weekday: "long", month: "short", day: "numeric"};
const today  = new Date();
dateElemenet.innerHTML = today.toLocaleDateString("en-UK", options);

//add to-do function
function addToDo(toDo, id, done, trash){

    if(trash){ return; };

    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";

    const item = `<li class="item">
    <i class="far ${DONE}" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fas fa-trash-alt delete" id="${id}"></i>
</li> `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
};

//add an item to the list using enter key
document.addEventListener("keyup", function(event){
        if(event.keyCode == 13){
            const toDo = input.value;
            //if the input isn't empty
            if(toDo){
                addToDo(toDo);
            }
            input.value = "";
        }
        
        
    
})

//addToDo("eat an apple", 1, false, false);