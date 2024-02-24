
// async function getEnvInfo(){
//         try {
//         //   const errorMessageElement = document.getElementById('error-message');
//         //   const userDataDiv = document.getElementById("userData");
//         //   userDataDiv.innerHTML = `
//         //   <div class="spinner-border" role="status">
//         //       <span class="visually-hidden">Loading...</span>
//         //   </div><p>carregando</p>`;

// const { info } = require("console")

      
//           const siteSelected = document.getElementById("statusFilter").value;
//           console.log(siteSelected)
      
//           const apiUrl = `http://localhost:3000/api/enviromentInfo?site=${encodeURIComponent(
//             siteSelected
//           )}`;
      
//           const headers = {
//             "Content-Type": "application/json",
//             "X-Status-Filter": siteSelected,
//           };
      
//           const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: headers,
//           });
      
//           if (!response.ok) {
//             throw new Error(`Erro na solicitação: ${response.status}`);
//           }
      
//           const data = await response.json();

//           return data
//         } catch (error) {
//           console.error("Erro ao obter dados da API:", error.message);

//         }
        
      
// }

function loadEnviromentsInfo(){
    let content1 = document.getElementById('env-content-1')
    let content2 = document.getElementById('env-content-2')
    let content3 = document.getElementById('env-content-3')
    
    let implantationInfo = implantationInfos()
    let usersEnvInfoContent = usersEnvInfos()  
    let roomsInfos = roomsEnvInfos()

    content1.appendChild(implantationInfo)
    content2.innerHTML = usersEnvInfoContent
    content3.innerHTML = roomsInfos
}


function implantationInfos(){
    let content1 = document.createElement('div')
    content1.className = "implantation-info"

    let versionLine = document.createElement('div')
    let licence = document.createElement('div')
    let idImplantation = document.createElement('div')
    let nodeVersion = document.createElement('div')
    let mongoVersion = document.createElement('div')

    versionLine.className = "implantation-line"
    versionLine.innerHTML = `<b>Versão:</b> <br>Enterprise`
    content1.appendChild(versionLine)

    licence.className = "implantation-line"
    licence.innerHTML = `<b>Licença:</b> <br>Enterprise`;
    content1.appendChild(licence)

    idImplantation.className = "implantation-line"
    idImplantation.innerHTML = `<b>Versão do Node:</b> <br>Enterprise`
    content1.appendChild(idImplantation)

    nodeVersion.className = "implantation-line"
    nodeVersion.innerHTML = `<b>MongoDB:</b> <br>Enterprise`
    content1.appendChild(nodeVersion)

    mongoVersion.className = "implantation-line"
    mongoVersion.innerHTML = `<b>ID da Implantação:</b> <br>Enterprise`
    content1.appendChild(mongoVersion)

    return content1
}

function usersEnvInfos(){
    let content = `
    <div class="users-env-content users-env-line">
        <div><b>Usuarios</b></div>
        <div>Online: </div>
        <div>Ocupado: </div>
        <div>Ausente: </div>
        <div>Offline: </div>
        <div>Total: </div>
    </div>
    <div class="type-users users-env-line">
        <div><b>Tipos</b></div>
        <div>Usuarios conectados: </div>
        <div>Usuarios Ativos: </div>
        <div>Usuarios desativados: </div>
        <div>Offline: </div>
        <div>Usuarios app: </div>
    </div>
    `
    return content
}

function roomsEnvInfos(){
    let content = `
    <div class="users-env-content users-env-line">
        <div><b>Usuarios</b></div>
        <div>Online: </div>
        <div>Ocupado: </div>
        <div>Ausente: </div>
        <div>Offline: </div>
        <div>Total: </div>
    </div>
    <div class="type-users users-env-line">
        <div><b>Tipos</b></div>
        <div>Usuarios conectados: </div>
        <div>Usuarios Ativos: </div>
        <div>Usuarios desativados: </div>
        <div>Offline: </div>
        <div>Usuarios app: </div>
    </div>
    `
    return content
}




document.addEventListener('DOMContentLoaded', function() {
    loadEnviromentsInfo();
});




// Caminho para o arquivo JSON
// function salvarDados(){


//       let dataUserUpdate =  {
//         "name": "https://example.com",
//         "authToken": "your-auth-token",
//         "userId": "your-user-id"

//                 }
//     console.log(dataUserUpdate);
//     createUser(dataUserUpdate)
//   }
  
  
  
//   async function createUser(dataUserUpdate) {
//     try {
//       const apiUrl = `http://localhost:3000/api/updateEnvList`;
    
//       const headers = {
//           'Content-Type': 'application/json',

//       };
    
//       const objetoJSON = JSON.stringify(dataUserUpdate); // Serializando o objeto para JSON
  
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: headers,
//         body: objetoJSON // Enviando o objeto serializado no corpo da requisição
//       });
  
//       if (!response.ok) {
//         throw new Error(`Erro na solicitação: ${response.status}`);
//       }
  
//       const responseData = await response.json(); // Aguardando a resposta do backend
//       console.log("Resposta do backend:", responseData);
//     } catch (error) {
//       console.error("Erro ao enviar objeto para o backend:", error.message);
//     }
//   }

//   salvarDados()