const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { info } = require('console');
const fetch = require('fetch')
const fs = require('fs');
const https = require('https'); // Importe o módulo https


const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.static('public'));

const options = {
    key: fs.readFileSync('privatekey.pem'), // Caminho para sua chave privada
    cert: fs.readFileSync('cert.pem') // Caminho para seu certificado SSL/TLS
  };


let returnSitesFromsheet;

const filePath = 'enviroments.json';

  // Lendo o arquivo JSON
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      return;
    }
    
    try {
      // Parseando o conteúdo do arquivo como JSON
      returnSitesFromsheet = JSON.parse(data);
      console.log(returnSitesFromsheet);
      // Agora você pode trabalhar com os dados JSON
    } catch (err) {
      console.error('Erro ao fazer o parse do JSON:', err);
    }
});




app.get('/api/rolesList', async (req, res) => {
    let siteUrl = req.query.site;
    const resultado = buscarUsuario(siteUrl);
    console.log('X-Status-Filter:', siteUrl, resultado);
    const xAuthToken = resultado.authToken;
    const xUserId = resultado.userId;

    let response;
    let allRoles

    const headers = {
        'X-Auth-Token': xAuthToken,
        'X-User-Id': xUserId,
    };
    const getRoles = `${siteUrl}/api/v1/roles.list`;
    try {
    
            response = await axios.get(getRoles, {
                headers
            });
            allRoles = response.data.roles;

            console.log(allRoles)
        res.status(200).json({ message: 'Sucesso', allRoles }); 
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }
});


app.get('/api/lincenseUsers', async (req, res) => {
    let siteUrl = req.query.site;
    const resultado = buscarUsuario(siteUrl);
    let response;
    let lincenseUsers

    const headers = {
        'X-Auth-Token': resultado.authToken,
        'X-User-Id': resultado.userId,
    };
    const getRoles = `${siteUrl}/api/v1/licenses.maxActiveUsers`;

    try {
        response = await axios.get(getRoles, {
            headers
        });
        lincenseUsers = response.data;
        console.log(lincenseUsers)

        res.status(200).json({ message: 'Sucesso', lincenseUsers }); 
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }
});


app.get('/api/users', async (req, res) => {
    let siteUrl = req.query.site;
    const resultado = buscarUsuario(siteUrl);
    console.log('X-Status-Filter:', siteUrl, resultado);

    const apiUrl = `${siteUrl}/api/v1/users.list`;
    const xAuthToken = resultado.authToken;
    const xUserId = resultado.userId;

    let allUsers = [];
    let offset = 0;
    const pageSize = 50;

    const headers = {
        'X-Auth-Token': xAuthToken,
        'X-User-Id': xUserId,
    };

    try {
        let response;
        do {
            response = await axios.get(apiUrl, {
                headers,
                params: { offset, count: response?.data?.total || pageSize },
            });

            allUsers = allUsers.concat(response.data.users);
            offset += pageSize;

        } while (offset < response?.data?.total);

        res.json({ users: allUsers, total: response?.data?.total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter dados da API' });
    }
});


app.get('/api/departments', async (req, res) => {
    const siteUrl = req.query.site; // Obtenha o siteUrl da query da requisição

    try {
        const resultado = buscarUsuario(siteUrl);
        console.log(siteUrl)

        const headers = {
            'X-Auth-Token': resultado.authToken,
            'X-User-Id': resultado.userId,
        };

        const seuArray = await getDepartments(siteUrl, headers);

        res.status(200).json({ message: 'Sucesso', seuArray });
        // console.log(seuArray);
    } catch (error) {
        console.error('Erro geral:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

app.get('/api/departmentInfo', async (req, res) => {
    const site = req.query.site;
    const departmentId = req.query.departmentId;

    try {
        const resultado = buscarUsuario(site);

        const headers = {
            'X-Auth-Token': resultado.authToken,
            'X-User-Id': resultado.userId,
        };

        let depAgents = await getDepartmentAgents(site, departmentId, headers);
        let depInfo = await getDepartmentInfo(site, departmentId, headers)
        console.log("infos departamento:", depInfo)

        res.status(200).json({ message: 'Sucesso', depAgents, depInfo });
        // console.log(seuArray);
    } catch (error) {
        console.error('Erro geral:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }

    // Faça o que quiser com os dados recuperados aqui

    // Por exemplo, você pode enviar uma resposta com os dados:
    
});

app.use(bodyParser.json());


async function getDepartmentInfo(siteUrl, departamentInfo, headers) {
    const pageSize = 1000; // Número de departamentos por página
    let offset = 0;
    let response;
    let depsInfo;
    const apiDeparts = `${siteUrl}/api/v1/livechat/department/${departamentInfo}`;

    try {
        do {
            response = await axios.get(apiDeparts, {
                headers,
                params: { offset, count: pageSize },
            });
             depsInfo = response.data;
            offset += pageSize;
        } while (offset < response.data.total);
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }

    return depsInfo;
}


async function getDepartments(siteUrl, headers) {
    const pageSize = 1000; // Número de departamentos por página
    let allDepartments = [];
    let offset = 0;
    let response;
    const apiDeparts = `${siteUrl}/api/v1/livechat/department`;

    try {
        do {
            response = await axios.get(apiDeparts, {
                headers,
                params: { offset, count: pageSize },
            });
            const departments = response.data.departments;
            allDepartments = allDepartments.concat(departments);
            offset += pageSize;
        } while (offset < response.data.total);
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }

    return allDepartments;
}

async function getDepartmentAgents(siteUrl, departamentInfo, headers) {
    const pageSize = 1000; // Número de departamentos por página
    let offset = 0;
    let response;
    let depsInfo;
    const apiDeparts = `${siteUrl}/api/v1/livechat/department/${departamentInfo}/agents`;

    try {
        do {
            response = await axios.get(apiDeparts, {
                headers,
                params: { offset, count: pageSize },
            });
             depsInfo = response.data;
            offset += pageSize;
        } while (offset < response.data.total);
    } catch (error) {
        console.error('Erro ao obter dados da API:', error.message);
    }

    return depsInfo;
}


function buscarUsuario(nome) {
    for (const item of returnSitesFromsheet) {
        if (item.name === nome) {
            // Se encontrar uma correspondência, retorna userId e authToken
            return { userId: item.userId, authToken: item.authToken };
        }
    }
    // Se não encontrar uma correspondência, retorna null
    return null;
}

// app.listen(port, () => {
//     console.log(`Servidor ouvindo em http://localhost:${port}`);
// });


// ------------------------rotas de update --------------------------------------------//
app.put('/api/updateDepartament', async(req, res) => {
    try {
        const objetoRecebido = req.body;
        const siteUrl = req.query.site;
        const resultado = buscarUsuario(siteUrl);
 
        console.log(objetoRecebido)
        const headers = {
            'X-Auth-Token': resultado.authToken,
            'X-User-Id': resultado.userId,
            'Content-Type': 'application/json' // Certifique-se de definir o Content-Type
        };

        let id= objetoRecebido.id

        let objetoSend = {
            "department": {
                "enabled": true, 
                "name": objetoRecebido.nome, 
                "email": objetoRecebido.email,
                "showOnRegistration": true,
                "showOnOfflineForm": false 
            }
        }

        console.log(objetoSend)
        jsonString = JSON.stringify(objetoSend)

        const updateUserEndpoint = `${siteUrl}/api/v1/livechat/department/${id}`;
        const depAgentAdd = `${siteUrl}/api/v1/livechat/department/${id}/agents`;

        const response = await axios.put(updateUserEndpoint, jsonString, { headers });
        let responseUser

        if (objetoRecebido.agentsToAdd.length > 0 || objetoRecebido.agentsToRemove.length > 0){
            let agentsToUpdate = {
                "upsert": objetoRecebido.agentsToAdd,
                "remove": objetoRecebido.agentsToRemove
            }

            let jsonStringAgents = JSON.stringify(agentsToUpdate)
            responseUser = await axios.post(depAgentAdd, jsonStringAgents, { headers });
        }
        


        res.status(200).json({ message: 'Sucesso', responseData: response.data });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
});
  

app.post('/api/updateUser', async (req, res) => {
    try {
        // Pegando o objeto recebido no corpo da solicitação
        const objetoRecebido = req.body;
        // Recuperando informações do usuário para enviar a solicitação
        const siteUrl = req.query.site;
        const resultado = buscarUsuario(siteUrl);
        const xAuthToken = resultado.authToken;
        const xUserId = resultado.userId;

        // Configurando os cabeçalhos da solicitação
        const headers = {
            'X-Auth-Token': xAuthToken,
            'X-User-Id': xUserId,
            'Content-Type': 'application/json' // Certifique-se de definir o Content-Type
        };

        // Construindo o endpoint para atualizar o usuário
        const updateUserEndpoint = `${siteUrl}/api/v1/users.update`;

        // Fazendo a solicitação POST para atualizar o usuário
        const response = await axios.post(updateUserEndpoint, objetoRecebido, { headers });

        // Enviando uma resposta de sucesso com os dados recebidos do backend
        res.status(200).json({ message: 'Sucesso', responseData: response.data });
    } catch (error) {
        // Lidando com erros durante a solicitação
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
});


// ------------------------rotas de create --------------------------------------------//
app.post('/api/createUser', async (req, res) => {
    const objetoRecebido = req.body;
    console.log(objetoRecebido)
    try {
        // Pegando o objeto recebido no corpo da solicitação
        const objetoRecebido = req.body;
        // Recuperando informações do usuário para enviar a solicitação
        const siteUrl = req.query.site;
        const resultado = buscarUsuario(siteUrl);
        const xAuthToken = resultado.authToken;
        const xUserId = resultado.userId;

        // Configurando os cabeçalhos da solicitação
        const headers = {
            'X-Auth-Token': xAuthToken,
            'X-User-Id': xUserId,
            'Content-Type': 'application/json' // Certifique-se de definir o Content-Type
        };

        const updateUserEndpoint = `${siteUrl}/api/v1/users.create`;

        const response = await axios.post(updateUserEndpoint, objetoRecebido, { headers });

        // Enviando uma resposta de sucesso com os dados recebidos do backend
        res.status(200).json({ message: 'Sucesso', responseData: response.data });
    } catch (error) {
        // Lidando com erros durante a solicitação
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
});

  async function getDepartmentAgents(siteUrl, departamentInfo, headers) {
      const pageSize = 1000; // Número de departamentos por página
      let offset = 0;
      let response;
      let depsInfo;
      const apiDeparts = `${siteUrl}/api/v1/livechat/department/${departamentInfo}/agents`;
  
      try {
          do {
              response = await axios.get(apiDeparts, {
                  headers,
                  params: { offset, count: pageSize },
              });
               depsInfo = response.data;
              offset += pageSize;
          } while (offset < response.data.total);
      } catch (error) {
          console.error('Erro ao obter dados da API:', error.message);
      }
  
      return depsInfo;
  }


//   --------------------------enviroments info --------------------------------------------------------

app.get('/api/enviromentInfo', async (req, res) => {
    try {
        const siteUrl = req.query.site;
        const resultado = buscarUsuario(siteUrl);

        const headers = {
            'X-Auth-Token': resultado.authToken,
            'X-User-Id': resultado.userId,
            'Content-Type': 'application/json' 
        };

        const updateUserEndpoint = `${siteUrl}/api/v1/statistics`;

        const response = await axios.get(updateUserEndpoint, { headers });

       console.log(response.data)
        res.status(200).json({ message: 'Sucesso', responseData: response.data });
    } catch (error) {

        console.error('Erro ao buscar informações do ambiente:', error.message);
        res.status(500).json({ message: 'Erro ao buscar informações do ambiente' });
    }
});

app.post('/api/updateEnvList', async (req, res) => {
    try {
        const newItem = req.body;
        console.log(newItem)
        // Carrega os dados do arquivo JSON
        let data = JSON.parse(fs.readFileSync('enviroments.json', 'utf8'));

        // Adiciona o novo item ao array existente
        data.push(newItem);

        // Salva os dados atualizados de volta no arquivo JSON
        fs.writeFileSync('enviroments.json', JSON.stringify(data));

        res.status(200).json({ message: 'Item cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar item:', error);
        res.status(500).json({ message: 'Erro ao cadastrar item' });
    }
});


https.createServer(options, app).listen(port, () => {
    console.log(`Servidor ouvindo em https://localhost:${port}`);
  });