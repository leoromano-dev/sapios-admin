var data;

let agentesToRemove = [];

document.addEventListener('click', event => {
    if (event.target.classList.contains('delete-user-btn')) {
        // Acesse o nome do agente correspondente
        
        const agentId = event.target.previousElementSibling.id.trim();
        const username = event.target.previousElementSibling.textContent.trim();
        // Adicione o nome do agente à variável agentes
        agentesToRemove.push({agentId, username});
        const parentElement = event.target.parentElement;
        if (parentElement.classList.contains('agents-line')) {
            parentElement.remove(); // Remova o elemento pai
        }
        // Exiba os agentes na console
        console.log(agentesToRemove);
      }
});

async function loadDeparts() {
    try {
        const siteSelected = document.getElementById("statusFilter").value;
        const apiUrl = `http://localhost:3000/api/departments?site=${encodeURIComponent(siteSelected)}`;

        const headers = {
            'Content-Type': 'application/json',
            'X-Status-Filter': siteSelected
        };

        const userDataDiv = document.querySelector(".userData");
        userDataDiv.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }

        data = await response.json();
        displayDepartments(data);
        sendData(data); // Passando os dados para a função sendData()

        const spinnerElement = userDataDiv.querySelector(".spinner-border");
        spinnerElement.parentNode.removeChild(spinnerElement);

        console.log(data);
        return data
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }
}

async function departamentInfo(departmentId) {
    try {
        const siteSelected = document.getElementById("statusFilter").value;
        const encodedDepartmentId = encodeURIComponent(departmentId);
        const apiUrl = `http://localhost:3000/api/departmentInfo?site=${encodeURIComponent(siteSelected)}&departmentId=${encodedDepartmentId}`;

        const headers = {
            'Content-Type': 'application/json',
            'X-Status-Filter': siteSelected
        };
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }

        const depsInfo = await response.json();
        console.log("json retornado", depsInfo)
        return depsInfo

    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }
}


function sendData(){
    // Se você deseja acessar data.seuArray, verifique primeiro se data está definido
    if (data && data.seuArray) {
        window.myData = data.seuArray; // Definindo myData como uma propriedade global
        console.log("aqui a data", window.myData);
    } else {
        console.error("Erro ao acessar data.seuArray: data não está definido ou não tem a propriedade seuArray.");
    }
}

function displayDepartments(data) {
    try {
        const departmentDataDiv = document.getElementById("departmentData");
        data = data.seuArray
        
        const departmentInfoElements = document.querySelectorAll(".departmentInfo");
        departmentInfoElements.forEach((element) => {
            element.parentNode.removeChild(element);
        });

        if (data && data.length > 0) {
            const tbody = document.querySelector("#list table tbody");

            data.forEach(department => {
                const departmentRow = document.createElement("tr");
                departmentRow.id = department._id
                departmentRow.className = "departmentInfo";

                let num_agents = department.numAgents || "N/A";

                let colunas = [
                    { content: department.name, className: "name" },
                    { content: num_agents, className: "num_agents" },
                    { content: department.enabled ? "sim" : "não", className: "enabled" },
                ];

                colunas.forEach(coluna => {
                    let novaCelula = document.createElement("td");
                    novaCelula.textContent = coluna.content;
                    novaCelula.className = coluna.className;
                    departmentRow.appendChild(novaCelula);
                });

                let botaoCelula = document.createElement("td");
                let botao = document.createElement("button");
                botao.innerHTML = '☰';
                botao.className = "button-dept"
                botao.onclick = toggleMenu;
                botaoCelula.appendChild(botao);
                departmentRow.appendChild(botaoCelula);

                tbody.appendChild(departmentRow);
            });
        } else {
            console.warn("Nenhum dado de departamento disponível.");
        }
    } catch (error) {
        console.error("Erro ao criar linha de departamento:", error.message);
    }
    
}

const container = document.querySelector(".container");
container.classList.add("btn-container"); // Adiciona a classe ao contêiner

container.appendChild(button);
container.appendChild(agentsDiv);


// Função principal para manipular o menu
async function toggleMenu(departmentId) {   
    var departmentId 
    agentesToRemove = [];
    // Chamar a função para criar e exibir o dropdown
    let dropdownDiv

    // Obter o elemento pai (tr) do botão clicado
    var trElement = event.target.closest('tr');
    let departamentInfos;
    let departamentAgents;

    if (trElement) {
        departmentId = trElement.id;

        try {
            let departamentData = await departamentInfo(departmentId);
            console.log("teste", departamentData)
            departamentInfos = departamentData.depInfo.department
            departamentAgents = departamentData.depAgents
            console.log("aqui os departs", departamentAgents)

            console.log("Retorno da departamentInfo:", departamentInfos);
        } catch (error) {
            console.error('Erro ao obter dados do departamento:', error.message);
        }


        // Criar uma tabela
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        tbody.id = departmentId

        // Adicionar informações à tabela (substituir isso com seus próprios dados)

        var row = document.createElement("tr");
        row.className = "offCanvaInfo";

        var labelCell = document.createElement("td");
        labelCell.className = "depInfoCanva";
        var inputElement = document.createElement("input");
        inputElement.id = "inputName"
        inputElement.value = departamentInfos.name;
        labelCell.innerHTML = "Nome: <br>";
        labelCell.appendChild(inputElement)
        row.appendChild(labelCell);

        var inputEmail = document.createElement("input");
        inputEmail.value = departamentInfos.email;
        inputEmail.id = "inputEmail"
        var valueCell = document.createElement("td");
        valueCell.className = "depInfoCanva";
        valueCell.innerHTML = "Email: <br>";
        valueCell.appendChild(inputEmail)
        row.appendChild(valueCell);

        //div do inputs com

        try {
            dropdownDiv = await criaInputAgentes();
            // Faça algo com o retorno da função aqui
            console.log("Retorno da departamentInfo:", dropdownDiv);
        } catch (error) {
            console.error('Erro ao obter dados do departamento:', error.message);
        }

        
        document.body.appendChild(dropdownDiv);
        row.appendChild(dropdownDiv)


        let agentsCell = document.createElement("td");
        agentsCell.className = "agents";

        // Criar uma div para conter a lista de agentes com barra de rolagem
        let agentsContainer = document.createElement("div");
        agentsContainer.className = "agents-container";// Definir altura máxima desejada
        agentsContainer.style.overflowY = "auto"; // Adicionar barra de rolagem vertical

        // Iterar sobre todos os agentes e adicionar seus nomes à div de contêiner de agentes
        for (const user of departamentAgents.agents) {
            let agentName = document.createElement("div");
            let name = document.createElement("div")
            let x = document.createElement("div")

            agentName.className = "agents-line";
            name.textContent = user.username;
            name.id = user.agentId
            x.textContent = "x";
            x.className = "delete-user-btn"
            agentName.appendChild(name)
            agentName.appendChild(x)
            agentsContainer.appendChild(agentName);
        }

        // Adicionar a div de contêiner de agentes à célula de agentes
        agentsCell.appendChild(agentsContainer);
        row.appendChild(agentsCell);


        let btnCell = document.createElement("td")
        btnCell.className = "btnCell"
        let btn = document.createElement("button")
        btn.textContent = "Salvar"
        btn.onclick = updateDep
        btnCell.appendChild(btn)

        row.appendChild(btnCell);

        tbody.appendChild(row);       
        // Adicionar a tabela ao offcanvasMenu
        table.appendChild(tbody);

        document.querySelector('.offcanvas-menu').appendChild(table);
    }

    var container = document.querySelector('.container1');
    container.classList.toggle('menu-closed');

    var offcanvasMenu = document.querySelector('.offcanvas-menu');
    var overlay = document.querySelector('.overlay');
    
    if (offcanvasMenu.style.right === '0px') {
        offcanvasMenu.style.right = '-400px';
        overlay.style.display = 'none';
        
        // Limpar o conteúdo da tabela ao fechar o menu
        offcanvasMenu.innerHTML = '';
    } else {
        offcanvasMenu.style.right = '0';
        overlay.style.display = 'block';
    }
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


function clearOffcanvasMenu() {
    // Limpar o conteúdo da tabela ao fechar o menu
    let offcanvasMenu = document.querySelector('.offcanvas-menu');
    let tabelaNaOffcanvasMenu = offcanvasMenu.querySelector('table');

    if (tabelaNaOffcanvasMenu) {
        tabelaNaOffcanvasMenu.remove();
    }
}

function saveDataWhenDropdownClosed() {
    let selectedValues = getSelectedValues();
    const jsonObjects = selectedValues.map(item => {
        const [agentId, username] = item.split(", ");
        return { agentId, username };
    });

    selectedValues = jsonObjects
    return jsonObjects
}

// Função para obter os valores selecionados no dropdown
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

// Função para alternar o dropdown
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");

    // Verificar se o dropdown está fechado
    if (!dropdown.classList.contains("show")) {
         // Dropdown está fechado, então salvar os dados
         saveDataWhenDropdownClosed();
    }
}

// Função para salvar dados e chamar dentro de salvarDados
  function filterDropdown() {
    var input, filter, dropdown, labels, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    dropdown = document.getElementById("myDropdown");
    labels = dropdown.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
      txtValue = labels[i].textContent || labels[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        labels[i].style.display = "";
      } else {
        labels[i].style.display = "none";
      }
    }
  }

  document.getElementById("myDropdown").onclick = function(event) {
    event.stopPropagation();
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('#searchInput')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  function updateDep(){
    let agentesObj = saveDataWhenDropdownClosed();
    // Obter valores dos inputs
    var nome = document.getElementById("inputName").value;
    var email = document.getElementById("inputEmail").value;
    var tbodies = document.getElementsByTagName("tbody");

    for (var i = 0; i < tbodies.length; i++) {
        var idDepartament = tbodies[i].id;
    }

    objeto = {
               "nome": nome,
               "email": email,
               "id": idDepartament,
               "agentsToAdd": agentesObj,   
               "agentsToRemove": agentesToRemove         
             }
    console.log(objeto);
    // updateDepartament(objeto)
}


async function updateDepartament(dataDepartmentUpdate) {
    try {
      const siteSelected = document.getElementById("statusFilter").value;
      const apiUrl = `http://localhost:3000/api/updateDepartament?site=${encodeURIComponent(siteSelected)}`;
    
      const headers = {
          'Content-Type': 'application/json',
          'X-Status-Filter': siteSelected
      };
    
      const objetoJSON = JSON.stringify(dataDepartmentUpdate); // Serializando o objeto para JSON
  
      const response = await fetch(apiUrl, {
        method: "PUT",
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

  function closeMenu() {
    let container = document.querySelector('.container1');
    container.classList.add('menu-closed');
    let offcanvasMenu = document.querySelector('.offcanvas-menu');
    let overlay = document.querySelector('.overlay');
    offcanvasMenu.style.right = '-400px';
    overlay.style.display = 'none';

    clearOffcanvasMenu();
}


async function loadData() {
    let data
    
    try {
       const siteSelected = document.getElementById("statusFilter").value;
       const apiUrl = `http://localhost:3000/api/users?site=${encodeURIComponent(
         siteSelected
       )}`;
       console.log("API URL:", apiUrl);
   
       const headers = {
         "Content-Type": "application/json",
         "X-Status-Filter": siteSelected,
       };
   
       const response = await fetch(apiUrl, {
         method: "GET",
         headers: headers,
       });
   
       if (!response.ok) {
         throw new Error(`Erro na solicitação: ${response.status}`);
       }
   
       data = await response.json();
    } 
    catch (error) {
       console.error("Erro ao obter dados da API:", error.message);
    }   
 
     return data
}

