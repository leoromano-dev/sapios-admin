export function alerta(){
  console.log('teste')
}
// async function loadData() {
//     let data
    
//     try {
//        const siteSelected = document.getElementById("statusFilter").value;
//        const apiUrl = `http://localhost:3000/api/users?site=${encodeURIComponent(
//          siteSelected
//        )}`;
//        console.log("API URL:", apiUrl);
   
//        const headers = {
//          "Content-Type": "application/json",
//          "X-Status-Filter": siteSelected,
//        };
   
//        const response = await fetch(apiUrl, {
//          method: "GET",
//          headers: headers,
//        });
   
//        if (!response.ok) {
//          throw new Error(`Erro na solicitação: ${response.status}`);
//        }
   
//        data = await response.json();
//     } 
//     catch (error) {
//        console.error("Erro ao obter dados da API:", error.message);
//     }   
 
//      return data
// }