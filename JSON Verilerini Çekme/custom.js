/**fetch() API kullanarak veri çekiyoruz 


var data=fetch("veri.json")
.then(response=>response.json())
.then(veri=>{
    console.log(veri)
    console.log(veri.yetki[0]);
    var verimiz= JSON.stringify(veri);
    console.log(verimiz);

});
*/


/** Burada Dışarıdan veri çektik */

/**
 
var listele= document.querySelector("#fotos")

let data=fetch("https://jsonplaceholder.typicode.com/photos")
.then(response=>response.json())
.then(veri=>{

    veri.forEach(element => {
        //console.log(element.title);
        if(element.id<=10)
        {
            listele.innerHTML+=`<img src="${element.url}"/>`
        }
    });


});


*/


function getUserList(){
    document.getElementById("userTable");
    fetch('https://reqres.in/api/users')
    .then(response=>response.json())
    .then(data=>{
        //Tabloyu Hedefle
        const table=document.getElementById("userTable");
        //Tabloyu Temizledik
        document.getElementById("userTable").innerHTML="";

        //console.log(data);
        for(user of data.data){
            //console.log(user);
            table.innerHTML+=`
            <tr><td><input type="text" id="user_name_${user.id}" class="form-control" value="${user.first_name}" /></td>
            <td><input type="text" id="last_name_${user.id}" class="form-control" value="${user.last_name}" /></td>
            <td><input type="text" id="email_${user.id}" class="form-control" value="${user.email}" /></td>
            <td><button onclick='updateUser("${user.id}")' class="btn btn-warning">Güncelle</button>
            <button onclick='deleteUser("${user.id}")' class="btn btn-danger">Sil</button></td></tr>
            `
        }
    })
}
// Kullanıcı Listesini Getir
getUserList();

//Kullanıcı Tablosunu Yenile
function refreshTable(){
    getUserList();
}

//Yeni Kullanıcı Oluştur

function createUser() {
    console.log("Çalışıyor");
    let data={
        first_name: document.getElementById("first_name").value || "",
        last_name: document.getElementById("last_name").value || "",
        email: document.getElementById("email").value || ""
    };
    fetch("https://reqres.in/api/users",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        const table=document.getElementById("userTable");
        console.log("Kullanıcı Oluşturuldu:",data);

        table.innerHTML+=`
            <tr><td><input type="text" class="form-control" value="${data.first_name}" /></td>
            <td><input type="text" class="form-control" value="${data.last_name}" /></td>
            <td><input type="text" class="form-control" value="${data.email}" /></td>
            <td><button onclick='updateUser("${data.id}")' class="btn btn-warning">Güncelle</button>
            <button onclick='deleteUser("${data.id}")' class="btn btn-danger">Sil</button></td></tr>
            `;
        // getUserList();
        
    })
    .catch((error)=>{
        console.error("Hata",error);
    });
};


function updateUser(id){

let data={
        first_name: document.getElementById("user_name_"+id).value || "",
        last_name: document.getElementById("last_name_"+id).value || "",
        email: document.getElementById("email_"+id).value || ""
    };
    fetch("https://reqres.in/api/users",{

    method:"PUT",
    headers:{
        'Content-Type' : "application/json",
    },
    body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Kullanıcı Güncellendi",data);
    })
    .catch((error)=>{
        console.log('Hata',error);
    })



}

function deleteUser(id){
    fetch("https://reqres.in/api/users/" + id,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then(response=>console.log(response))
    .then(data=>{
        
        console.log("Kullanıcı Silindi",data);
    })
    .catch((error)=>{
        console.log("Hata:" + error);
    })
}





















