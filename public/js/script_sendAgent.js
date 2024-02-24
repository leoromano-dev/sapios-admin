let site = "https://sapios.chat"
let user = "lromano"
let passwaord = "123456"


function validateAndReadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Pega a primeira planilha
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Converte a planilha para JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Verifica se as chaves desejadas estão presentes no primeiro objeto do JSON
        const firstObject = jsonData[0];
        if (
          firstObject &&
          firstObject[0] === "Nome completo" &&
          firstObject[1] === "Email" &&
          firstObject[2] === "username"
        ) {
          console.log("Header encontrado")
        } else {
          alert('Por favor inclua no cabeçalho o Nome completo, Email e username');
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Por favor, selecione um arquivo.');
    }
  }

function displayFileName() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const fileName = fileInput.value;

    if(fileName.endsWith('.xlsx')){

        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = `${fileInput.files[0].name}`;
            
        } else {
            fileNameDisplay.textContent = 'Insira seu arquivo';
        }

    }else{
        alert('Por favor, selecione um arquivo .xlsx.');
        // Limpa o campo de entrada para que o usuário possa escolher outro arquivo
        fileInput.value = ''
        fileNameDisplay = ''
    }
}


async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const fileNameDisplay = document.getElementById('fileName');

    if (!file) {
        alert('Selecione um arquivo para enviar.');
        return;
    }

    const reader = new FileReader();

    reader.onload = async function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const usersData = convertJsonToUserData(jsonData);

        try {
            await insertUsers(usersData);
            showSuccessMessage('Arquivo enviado com sucesso!');
        } catch (error) {
            showErrorMessage('Erro ao enviar o arquivo.');
            setTimeout(() => {
                showErrorMessage('');
              }, 20000);
        }
        fileNameDisplay.textContent= ''
        fileName.textContent = '';
    };

    reader.readAsArrayBuffer(file);    
}


async function insertUsers(usersData) {
    const loginData = {
        user: user,
        password: passwaord,
    };

    const loginHeaders = {
        'content-type': 'application/json',
    };

    try {
        // Faz o login para obter o token
        const loginResponse = await axios.post(
            `${site}/api/v1/login`,
            loginData,
            { headers: loginHeaders }
        );

        const authToken = loginResponse.data.data.authToken;
        const userId = loginResponse.data.data.userId;

        const createUsersHeaders = {
            'content-type': 'application/json',
            'X-Auth-Token': authToken,
            'X-User-Id': userId,
        };

        // Faz chamadas para criar usuários usando o token no login
        const requests = usersData.map(userData => axios.post(
            `${site}/api/v1/users.create`,
            userData,
            { headers: createUsersHeaders }
        ));

        const responses = await Promise.all(requests);

        responses.forEach((response, index) => {
            console.log(`Usuário ${index + 1} criado. Status: ${response.statusText}`);
        });


    } catch (error) {
            console.error("Erro ao criar usuários:", error.response ? error.response.data : error.message);

            alert("Ocorreu um erro ao criar usuários. Por favor, tente novamente.");
            throw error;

    }
}


function convertJsonToUserData(jsonData) {
    return jsonData.map(item => ({
        name: item['Nome completo'].trim(),
        email: item['Email'].trim(),
        password: "12345",
        username: item['username'].trim(),
        active: true,
        roles: ["livechat-agent", "user"],
        joinDefaultChannels: false,
        requirePasswordChange: true,
        sendWelcomeEmail: false,
        verified: true
    }));
}



//mennsagens de sucesso e erro
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.className = 'success';
    clearErrorMessages();
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.className = 'error';
    clearSuccessMessage();
}

function clearSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = '';
    successMessage.className = '';
}

function clearErrorMessages() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';
    errorMessage.className = '';
}