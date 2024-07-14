const localStorageKey = 'to-do-list'


let Teclado = document.getElementById('inputText').addEventListener('keydown', function(enter) {
    if (enter.key === 'Enter') {
        newTask();
    }
});


function newTask () {

    let input = document.getElementById('inputText')
    input.style.border = '';

    //validantion
    if(!input.value)
    {
        input.style.border = '2px solid red';
        alert('Insira uma tarefa para adicionar a lista')
    }   

    else if(validaNewTask())
    {
        input.style.border = '2px solid red';
        alert('Ja existe uma tarefa com essa descrição ')
    }

    else 
    {

        input.style.border = '2px solid green';
        //armazenamento no localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey)  || "[]");
        values.push({
            name: input.value   
        })

         localStorage.setItem(localStorageKey, JSON.stringify(values))
         showValues()
    
    }
    input.value = ''
}


function removeItem(data){
    //Essa variável guarda os valores do Local Storage, por isso reutilizamos ela no código
    let values = JSON.parse(localStorage.getItem(localStorageKey)  || "[]");
    let index = values.findIndex(x => x.name == data)   
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
     
}


function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey)  || "[]");
    let list = document.getElementById("list");
    list.innerHTML = '';
    
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += 
        `<li>
        ${values[i]['name']} 
        <button 
        id='btn-ok' 
        title="Clique aqui para completar a tarefa!"
        onclick='removeItem("${values[i]['name']}")'>

                <svg 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
        </svg>
        </button>
        </li>`
    }
}

function validaNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey)  || "[]");
    let inputValue = document.getElementById('inputText').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true; 




}



showValues()






