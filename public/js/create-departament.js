document.getElementById('createDepartment').addEventListener('click', async function() {
    await toggleMenuCreateDep();
});

async function toggleMenuCreateDep() { 

let dropdownDiv

var container = document.querySelector('.container1');
container.classList.toggle('menu-closed');
var offcanvasMenu = document.querySelector('.offcanvas-menu');
var overlay = document.querySelector('.overlay');

var table = document.createElement("table");
var tbody = document.createElement("tbody");
let row = document.createElement("tr");
row.className = "offCanvaInfo";

let labelHeader = document.createElement("h3")
labelHeader.textContent = "Novo departamento"
labelHeader.className = "depInfoCanva"
row.appendChild(labelHeader)



let activeDep = createPasswordRequired()
row.appendChild(activeDep)
let depName = createDepName()
row.appendChild(depName)

let depEmail = createDepEmail()
row.appendChild(depEmail)

let numConversation = numConversations()
row.appendChild(numConversation)

try {
    dropdownDiv = await criaInputAgentes();
    // Faça algo com o retorno da função aqui
    console.log("Retorno da departamentInfo:", dropdownDiv);
} catch (error) {
    console.error('Erro ao obter dados do departamento:', error.message);
}


document.body.appendChild(dropdownDiv);
row.appendChild(dropdownDiv)



try {
    dropdownDiv = await createInputAgentes();
    // Faça algo com o retorno da função aqui
    console.log("Retorno da departamentInfo:", dropdownDiv);
  } catch (error) {
    console.error('Erro ao obter dados do departamento:', error.message);
  }

  document.body.appendChild(dropdownDiv);
  row.appendChild(dropdownDiv) 


let btnCell = document.createElement("td")
btnCell.className = "btnCell"
let btn = document.createElement("button")
btn.textContent = "Criar Departamento"
btn.onclick = salvarDados
btnCell.appendChild(btn)

btnCell.appendChild(btn)

row.appendChild(btnCell);

tbody.appendChild(row);       
// Adicionar a tabela ao offcanvasMenu
table.appendChild(tbody);
document.querySelector('.offcanvas-menu').appendChild(table)
  
if (offcanvasMenu.style.right === '0px') {
    offcanvasMenu.style.right = '-400px';
    overlay.style.display = 'none';
      
    offcanvasMenu.innerHTML = '';
} else {
    offcanvasMenu.style.right = '0';
    overlay.style.display = 'block';

    overlay.addEventListener('click', closeMenu);
  }
}

function createDepName(){
  var labelCell = document.createElement("td");
  labelCell.className = "depInfoCanva";
  var inputElement = document.createElement("input");
  inputElement.id = "inputDepName"
  labelCell.innerHTML = "Nome* <br>";
  labelCell.appendChild(inputElement)

  return labelCell
}

function createDepEmail(){
  var labelCell = document.createElement("td");
  labelCell.className = "depInfoCanva";
  var inputElement = document.createElement("input");
  inputElement.id = "inputDepEmail"
  labelCell.innerHTML = "Email* <br>";
  labelCell.appendChild(inputElement)

  return labelCell
}

function numConversations(){
  var labelCell = document.createElement("td");
    labelCell.className = "depInfoCanva";
    var inputElement = document.createElement("input");
    inputElement.id = "numOfConversations"
    inputElement.type = "number"
    labelCell.innerHTML = "Número máximo de conversas simultâneas <br>";
    labelCell.appendChild(inputElement)

  return labelCell
}

function createSenha(){
  var labelCell = document.createElement("td");
        labelCell.className = "depInfoCanva";
        var inputElement = document.createElement("input");
        inputElement.id = "inputPassword"
        inputElement.type = "password"
        labelCell.innerHTML = "Senha: <br>";
        labelCell.appendChild(inputElement)

  return labelCell
}

function createPasswordRequired(){
  var labelCell = document.createElement("td");
        labelCell.className = "depInfoCanva";
        labelCell.innerHTML = `
        <div class="password-isRequired">
        <label>Ativado</label>
        <div class="form-check form-switch">
        <input onclick="getValue()" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck" >
      </div></div>` ;

  return labelCell
}


async function createInputAgentes() {
    let options
  
    let dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown";
  
  
    // Criar o elemento input do tipo texto
    let inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "searchInput";
    inputText.setAttribute("placeholder", "Search...");
    inputText.onclick = toggleDropdown; // Adicionar o evento onclick
    inputText.oninput = filterDropdown; // Adicionar o evento oninput
  
    // Criar o elemento button
    let button = document.createElement("button");
    button.className = "dropbtn";
    button.textContent = "Selecione";
  
    // Criar o elemento div com a classe "dropdown-content"
    let dropdownContentDiv = document.createElement("div");
    dropdownContentDiv.id = "myDropdown";
    dropdownContentDiv.className = "dropdown-content";
  
    // Adicionar os elementos das opções dentro do div "dropdown-content"
    try {
      options = await rolesList();
      console.log("Retorno das roles:", options);
    } 
    catch (error) {
        console.error('Erro ao obter dados das roles:', error.message);
    }
    // let options = ["user", "admin", "Moderador", "livechat-agent", "Livechat-manager", "Livechat-monitor", "bot", "app"];
    
  
        options.forEach(function (option) {
            let i = 0
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option;
            checkbox.checked = false;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + option));
            dropdownContentDiv.appendChild(label);
            i += 1
        });
  
    dropdownDiv.appendChild(inputText);
    dropdownDiv.appendChild(dropdownContentDiv);
  
    let divLine = document.createElement("td");
    divLine.className = "depInfoCanva";
    divLine.innerHTML = "Roles: <br>";
    divLine.appendChild(dropdownDiv);
  
    return divLine;
  }


function getValue() {
    // Seleciona o elemento input pelo ID
    var checkbox = document.getElementById("flexSwitchCheck");
    // Verifica se o checkbox está marcado
    if (checkbox.checked)  {
      return true
    }else{
      return false
    }
}


function getSelectedValues() {
  var dropdown = document.getElementById("myDropdown");
  var checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
  var selectedValues = [];
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          selectedValues.push(checkboxes[i].value);
      }
  }
  return selectedValues;
}


async function criaInputAgentes() {
    let dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown";

    // Criar o elemento input do tipo texto
    let inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "searchInput";
    inputText.setAttribute("placeholder", "Search...");
    inputText.onclick = toggleDropdown; // Adicionar o evento onclick
    inputText.oninput = filterDropdown; // Adicionar o evento oninput

    // Criar o elemento button
    let button = document.createElement("button");
    button.className = "dropbtn";
    button.textContent = "Selecione";

    // Criar o elemento div com a classe "dropdown-content"
    let dropdownContentDiv = document.createElement("div");
    dropdownContentDiv.id = "myDropdown";
    dropdownContentDiv.className = "dropdown-content";

    // Adicionar os elementos das opções dentro do div "dropdown-content"
    let options = [];
    try {
        data = await loadData();
        console.log("aqui o teste", data);
        for (let agents of data.users) {
            options.push({ "username": agents.username, "id": agents._id });
        }

        console.log("aqui as opções:", options);

        // Array de opções
        options.forEach(function (option) {
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option.id; // Converter o texto em minúsculas e remover espaços
            checkbox.value += `, ${option.username}`;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + option.username));
            dropdownContentDiv.appendChild(label);
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
    }

    dropdownDiv.appendChild(inputText);
    dropdownDiv.appendChild(dropdownContentDiv);

    let divLine = document.createElement("td");
    divLine.className = "depInfoCanva";
    divLine.innerHTML = "Agentes: <br>";
    divLine.appendChild(dropdownDiv);

    return divLine;
}


function salvarDados(){

  var name = document.getElementById("inputName").value;
  var email = document.getElementById("inpuEmail").value;
  var username = document.getElementById("inputUsername").value;
  var password = document.getElementById("inputPassword").value;
  let roles = saveDataWhenDropdownClosed();
  console.log("roles",roles)
  let passwordRequired = getValue()


    let dataUserUpdate =  {
              "roles": roles,
              "name": name,
              "password": password,
              "username": username,
              "email": email,
              "requirePasswordChange": passwordRequired
              }

  
  console.log(dataUserUpdate);
  createUser(dataUserUpdate)
}


async function createUser(dataUserUpdate) {
  try {
    const siteSelected = document.getElementById("statusFilter").value;
    const apiUrl = `http://localhost:3000/api/createUser?site=${encodeURIComponent(siteSelected)}`;
  
    const headers = {
        'Content-Type': 'application/json',
        'X-Status-Filter': siteSelected
    };
  
    const objetoJSON = JSON.stringify(dataUserUpdate); // Serializando o objeto para JSON

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: objetoJSON // Enviando o objeto serializado no corpo da requisição
    });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const responseData = await response.json(); // Aguardando a resposta do backend
    console.log("Resposta do backend:", responseData);
    sucessApiMsg()
    loadData()
    closeMenu()
  } catch (error) {
    console.error("Erro ao enviar objeto para o backend:", error.message);
  }
}

