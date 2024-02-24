/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/teste-n.js":
/*!***************************!*\
  !*** ./public/teste-n.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   teste: () => (/* binding */ teste)
/* harmony export */ });
function teste() {
  console.log("teste");
  //     try {
  //       const errorMessageElement = document.getElementById('error-message');
  //       const userDataDiv = document.getElementById("userData");
  //       userDataDiv.innerHTML = `
  //       <div class="spinner-border" role="status">
  //           <span class="visually-hidden">Loading...</span>
  //       </div><p>carregando</p>`;

  //       const siteSelected = document.getElementById("statusFilter").value;
  //       console.log(siteSelected)

  //       const apiUrl = `http://localhost:3000/api/users?site=${encodeURIComponent(
  //         siteSelected
  //       )}`;

  //       const headers = {
  //         "Content-Type": "application/json",
  //         "X-Status-Filter": siteSelected,
  //       };

  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: headers,
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Erro na solicitação: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       createUserLine(data);
  //       userDataDiv.innerHTML = "";
  //       return data
  //     } catch (error) {
  //       console.error("Erro ao obter dados da API:", error.message);
  //       const userDataDiv = document.getElementById("userData");
  //       userDataDiv.innerHTML = "";
  //       errorApiMsg();
  //     }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./public/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _teste_n_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teste-n.js */ "./public/teste-n.js");


// async function loadData() {
//   try {
//     await teste();
//   } catch (error) {
//     console.error("Erro ao carregar dados:", error.message);
//   }
// }
function loadData() {
  console.log("teste");
  (0,_teste_n_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
}

// function errorApiMsg(){
//   iziToast.error({
//     title: 'Erro',
//     message: 'Ocorreu um erro ao processar a ação!',
//     position: 'topRight' // Posição onde a notificação será exibida
//   });
// } 

//  function sucessApiMsg(){
//   iziToast.success({
//     title: 'Sucesso',
//     message: 'Usuario atutualizado com sucesso!',
//     position: 'topRight' // Posição onde a notificação será exibida
//   });
// } 

// // async function loadData() {
// //   try {
// //     const errorMessageElement = document.getElementById('error-message');
// //     const userDataDiv = document.getElementById("userData");
// //     userDataDiv.innerHTML = `
// //     <div class="spinner-border" role="status">
// //         <span class="visually-hidden">Loading...</span>
// //     </div><p>carregando</p>`;

// //     const siteSelected = document.getElementById("statusFilter").value;
// //     console.log(siteSelected)

// //     const apiUrl = `http://localhost:3000/api/users?site=${encodeURIComponent(
// //       siteSelected
// //     )}`;

// //     const headers = {
// //       "Content-Type": "application/json",
// //       "X-Status-Filter": siteSelected,
// //     };

// //     const response = await fetch(apiUrl, {
// //       method: "GET",
// //       headers: headers,
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Erro na solicitação: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     createUserLine(data);
// //     userDataDiv.innerHTML = "";
// //     return data
// //   } catch (error) {
// //     console.error("Erro ao obter dados da API:", error.message);
// //     const userDataDiv = document.getElementById("userData");
// //     userDataDiv.innerHTML = "";
// //     errorApiMsg();
// //   }

// // }

// async function rolesList() {
//   try {
//     const errorMessageElement = document.getElementById('error-message');
//     const siteSelected = document.getElementById("statusFilter").value;
//     console.log(siteSelected)

//     const apiUrl = `http://localhost:3000/api/rolesList?site=${encodeURIComponent(
//       siteSelected
//     )}`;

//     const headers = {
//       "Content-Type": "application/json",
//       "X-Status-Filter": siteSelected,
//     };

//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: headers,
//     });

//     if (!response.ok) {
//       throw new Error(`Erro na solicitação: ${response.status}`);
//     }

//     let data = await response.json();
//     data = data.allRoles
//     console.log(data)

//     roles = []
//     for(let id of data){
//       roles.push(id._id)
//     }

//     console.log(roles)

//   } catch (error) {
//     console.error("Erro ao obter dados da API:", error.message);
//     errorApiMsg();
//   }
//   return roles
// }

// function createUserLine(data) {
//   try {
//     const userDataDiv = document.getElementById("userData");

//     // Limpar elementos com a classe "userInfo"
//     const userInfoElements = document.querySelectorAll(".userInfo");
//     userInfoElements.forEach((element) => {
//       element.parentNode.removeChild(element);
//     });

//     if (data.users) {
//       data.users.forEach((user) => {
//         const userParagraph = document.createElement("tr");
//         userParagraph.id = user._id;
//         userParagraph.className = "userInfo";
//         let email =
//           user.emails && user.emails.length > 0
//             ? user.emails[0].address
//             : "N/A";
//         let colunas = [
//           `${user.name}`,
//           `${user.username}`,
//           `${email}`,
//           `${user.status}`,
//           `${"☰"}`
//         ];

//         for (let i = 0; i < colunas.length; i++) {
//           let novaCelula = document.createElement("td");
//           if (colunas[i] === "☰"){
//             let botao = document.createElement("button");
//                 botao.className = "button-dept"
//                 botao.innerHTML = '☰';
//                 botao.onclick = toggleMenu;
//                 novaCelula.appendChild(botao);
//           }else{
//             novaCelula.textContent = colunas[i];
//           }
//           userParagraph.appendChild(novaCelula);
//         }

//         let tbody = document.querySelector("#list table tbody");
//         tbody.appendChild(userParagraph);
//       });
//     } else {
//       console.warn("Nenhum dado de usuário disponível.");
//     }
//   } catch (error) {
//     console.error("Erro ao criar linha de usuário:", error.message);
//     errorApiMsg();
//   }
// }

// document.addEventListener('click', function(e){
//   el = e.target
// })

// //menu drpdown

// function createDropdown() {

// }

// const container = document.querySelector(".container");
// container.classList.add("btn-container"); // Adiciona a classe ao contêiner

// container.appendChild(button);
// container.appendChild(agentsDiv);
// button-dept
// // Função principal para manipular o menu
// async function toggleMenu() { 

//   console.log('aqui ok')
//   var trElement = event.target.closest('tr');
//   let agentInfo;
//   let userId

//   if (trElement) {
//     userId = trElement.id
//   }

//   var container = document.querySelector('.container1');
//   container.classList.toggle('menu-closed');
//   var offcanvasMenu = document.querySelector('.offcanvas-menu');
//   var overlay = document.querySelector('.overlay');
//   let userData 

//   try {
//     agentInfo = await loadData();
//     agentInfo = agentInfo.users
//     userData = agentInfo.filter(item => item._id === userId);
//       // Faça algo com o retorno da função aqui
//       console.log("Retorno de agente:", userData);
//   } 
//   catch (error) {
//       console.error('Erro ao obter dados do departamento:', error.message);
//   }

// // Criar uma tabela
// var table = document.createElement("table");
// var tbody = document.createElement("tbody");
// let row = document.createElement("tr");
// row.className = "offCanvaInfo";

// let name = criaName(userData)
// row.appendChild(name)

// let username = criaUserName(userData)
// row.appendChild(username)

// let email = criaEmail(userData)
// row.appendChild(email)

// let senha = criaSenha()
// row.appendChild(senha)

// let roles = criaPasswordRequired(username)
// row.appendChild(roles)

// try {
//   dropdownDiv = await criaInputAgentes(userData);
//   // Faça algo com o retorno da função aqui
//   console.log("Retorno da departamentInfo:", dropdownDiv);
// } catch (error) {
//   console.error('Erro ao obter dados do departamento:', error.message);
// }

// document.body.appendChild(dropdownDiv);
// row.appendChild(dropdownDiv)

// let btnCell = document.createElement("td")
//         btnCell.className = "btnCell"
//         let btn = document.createElement("button")
//         btn.textContent = "Salvar"
//         let btnRease = document.createElement("button")
//         btnRease.textContent = "Apagar"
//         btnRease.className = 'btn-delete'
//         btn.onclick = salvarDados
//         btnCell.appendChild(btnRease)
//         btnCell.appendChild(btn)

//         row.appendChild(btnCell);

// tbody.id = userId

// tbody.appendChild(row);       
// // Adicionar a tabela ao offcanvasMenu
// table.appendChild(tbody);
// document.querySelector('.offcanvas-menu').appendChild(table)

//   if (offcanvasMenu.style.right === '0px') {
//       offcanvasMenu.style.right = '-400px';
//       overlay.style.display = 'none';

//       // Limpar o conteúdo da tabela ao fechar o menu
//       offcanvasMenu.innerHTML = '';
//   } else {
//       offcanvasMenu.style.right = '0';
//       overlay.style.display = 'block';

//       // Adiciona um evento de clique ao overlay para fechar o menu ao clicar fora dele
//       overlay.addEventListener('click', closeMenu);
//   }
// }

// function criaName(userData){
//   var labelCell = document.createElement("td");
//         labelCell.className = "depInfoCanva";
//         var inputElement = document.createElement("input");
//         inputElement.id = "inputName"
//         inputElement.value = userData[0].name ;
//         labelCell.innerHTML = "Nome: <br>";
//         labelCell.appendChild(inputElement)

//   return labelCell
// }

// function criaUserName(userData){
//   var labelCell = document.createElement("td");
//         labelCell.className = "depInfoCanva";
//         var inputElement = document.createElement("input");
//         inputElement.id = "inputUsername"
//         inputElement.value = userData[0].username ;
//         labelCell.innerHTML = "Usuario: <br>";
//         labelCell.appendChild(inputElement)

//   return labelCell
// }

// function criaEmail(userData){
//   var labelCell = document.createElement("td");
//         labelCell.className = "depInfoCanva";
//         var inputElement = document.createElement("input");
//         inputElement.id = "inpuEmail"
//         inputElement.value = userData[0].emails[0].address ;
//         labelCell.innerHTML = "Email: <br>";
//         labelCell.appendChild(inputElement)

//   return labelCell
// }

// function criaSenha(userData){
//   var labelCell = document.createElement("td");
//         labelCell.className = "depInfoCanva";
//         var inputElement = document.createElement("input");
//         inputElement.id = "inputPassword"
//         inputElement.type = "password"
//         labelCell.innerHTML = "Senha: <br>";
//         labelCell.appendChild(inputElement)

//   return labelCell
// }

// function criaPasswordRequired(userData){
//   var labelCell = document.createElement("td");
//         labelCell.className = "depInfoCanva";
//         labelCell.innerHTML = `
//         <div class="password-isRequired">
//         <label>Exigir alteração de senha</label>
//         <div class="form-check form-switch">
//         <input onclick="getValue()" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck" >
//       </div></div>` ;

//   return labelCell
// }

// function getValue() {
//     // Seleciona o elemento input pelo ID
//     var checkbox = document.getElementById("flexSwitchCheck");
//     // Verifica se o checkbox está marcado
//     if (checkbox.checked)  {
//       return true
//     }else{
//       return false
//     }
// }

// async function criaInputAgentes(userData) {
//   let userRoles = userData[0].roles
//   let options
//   console.log(userRoles)

//   let dropdownDiv = document.createElement("div");
//   dropdownDiv.className = "dropdown";

//   // Criar o elemento input do tipo texto
//   let inputText = document.createElement("input");
//   inputText.type = "text";
//   inputText.id = "searchInput";
//   inputText.setAttribute("placeholder", "Search...");
//   inputText.onclick = toggleDropdown; // Adicionar o evento onclick
//   inputText.oninput = filterDropdown; // Adicionar o evento oninput

//   // Criar o elemento button
//   let button = document.createElement("button");
//   button.className = "dropbtn";
//   button.textContent = "Selecione";

//   // Criar o elemento div com a classe "dropdown-content"
//   let dropdownContentDiv = document.createElement("div");
//   dropdownContentDiv.id = "myDropdown";
//   dropdownContentDiv.className = "dropdown-content";

//   // Adicionar os elementos das opções dentro do div "dropdown-content"
//   try {
//     options = await rolesList();
//     console.log("Retorno das roles:", options);
//   } 
//   catch (error) {
//       console.error('Erro ao obter dados das roles:', error.message);
//   }
//   // let options = ["user", "admin", "Moderador", "livechat-agent", "Livechat-manager", "Livechat-monitor", "bot", "app"];

//       options.forEach(function (option) {
//           let i = 0
//           let label = document.createElement("label");
//           let checkbox = document.createElement("input");
//           checkbox.type = "checkbox";
//           checkbox.value = option;

//           let encontrado = false;
//           for (let i = 0; i < userRoles.length; i++) {
//             if (userRoles[i] === option) {
//               encontrado = true;
//               break;
//             }
//            }
//            checkbox.checked = encontrado;

//           label.appendChild(checkbox);
//           label.appendChild(document.createTextNode(" " + option));
//           dropdownContentDiv.appendChild(label);
//           i += 1
//       });

//   dropdownDiv.appendChild(inputText);
//   dropdownDiv.appendChild(dropdownContentDiv);

//   let divLine = document.createElement("td");
//   divLine.className = "depInfoCanva";
//   divLine.innerHTML = "Roles: <br>";
//   divLine.appendChild(dropdownDiv);

//   return divLine;
// }

// function salvarDados(){

//   var name = document.getElementById("inputName").value;
//   var email = document.getElementById("inpuEmail").value;
//   var username = document.getElementById("inputUsername").value;
//   var password = document.getElementById("inputPassword").value;
//   let roles = saveDataWhenDropdownClosed();
//   console.log("roles",roles)
//   let passwordRequired = getValue()

//   var tbodies = document.getElementsByTagName("tbody");

//     for (var i = 0; i < tbodies.length; i++) {
//         var id = tbodies[i].id;
//     }

//     let dataUserUpdate = {"userId": id, 
//               "data": {
//               "roles": roles,
//               "name": name,
//               "password": password,
//               "username": username,
//               "email": email,
//               "requirePasswordChange": passwordRequired
//               }
//       }

//   console.log(dataUserUpdate);
//   udapetUser(dataUserUpdate)
// }

// async function udapetUser(dataUserUpdate) {
//   try {
//     const siteSelected = document.getElementById("statusFilter").value;
//     const apiUrl = `http://localhost:3000/api/updateUser?site=${encodeURIComponent(siteSelected)}`;

//     const headers = {
//         'Content-Type': 'application/json',
//         'X-Status-Filter': siteSelected
//     };

//     const objetoJSON = JSON.stringify(dataUserUpdate); // Serializando o objeto para JSON

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: headers,
//       body: objetoJSON // Enviando o objeto serializado no corpo da requisição
//     });

//     if (!response.ok) {
//       throw new Error(`Erro na solicitação: ${response.status}`);
//     }

//     const responseData = await response.json(); // Aguardando a resposta do backend
//     console.log("Resposta do backend:", responseData);
//     sucessApiMsg()
//     loadData()
//     closeMenu()
//   } catch (error) {
//     console.error("Erro ao enviar objeto para o backend:", error.message);
//   }
// }
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map