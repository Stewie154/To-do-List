//select the elements
const clear = document.querySelector('.clear');
const dateElemenet = document.getElementById('date');
const list = document.getElementById('list');
const addButton = document.querySelector('.fa-plus-circle')
const input = document.getElementById('input');

//class names

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const line_through = 'line-through';

//variables

let LIST , id;

//get item from local storage
let data = localStorage.getItem("ToDo");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length //set the id for the last item in the list
    LoadList(LIST); //load the list to the user interface
} else {
    //if data is empty
    LIST = [];
    id = 0;
}

//load items to the user's interface

function LoadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

//clear the local storage

clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();

})


// show today's date
const options = {weekday: "long", month: "short", day: "numeric"};
const today  = new Date();
dateElemenet.innerHTML = today.toLocaleDateString("en-UK", options);

//add to-do function
function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";

    const item = `
    <li class="item">
        <i class="far ${DONE}" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fas fa-trash-alt" job="delete" id="${id}"></i>
    </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
};

//add an item to the list using enter key
document.addEventListener("keyup", function(event){
        if(event.keyCode == 13){
            const toDo = input.value;
            //if the input isn't empty
            if(toDo){
                addToDo(toDo, id, false, false);

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                //add item to local storage (this code must be added whenever the LIST array is updated)
                localStorage.setItem("ToDo", JSON.stringify(LIST));

                id++;
            }
            input.value = "";
        }
        
        
    
})

//complete to-do function
function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to-do function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created

list.addEventListener('click', function(event){
    element = event.target; //return clicked element inside list
    elementJob= element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){

        completeToDo(element);

    } else if(elementJob == "delete"){

        removeToDo(element);

    }
    //add item to local storage (this code must be added whenever the LIST array is updated)
    localStorage.setItem("ToDo", JSON.stringify(LIST));


})