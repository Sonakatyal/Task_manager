//for button
const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;//edit ke baad button ko frse change krne ke liye 
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = []; //to store data as a object
let edit_id = null;


//local storage se data get nikalna
let objstr = localStorage.getItem('users');
if (objstr != null) //null ho gya to push kese hoga 
{
    userArray = JSON.parse(objstr);//string to object
}
DisplayInfo();


//for click on button and to add value
addUserBtn.onclick = () => {
    const name = usernameTextField.value;
    //jab tak edit id null hai tab tak insert karwate raho jab isko id mil jaye to fr srf save krwao
    if (edit_id != null) {
        //edit
        userArray.splice(edit_id,1,{ 'name': name })
        edit_id = null; //edit ki id ko deactivate krna padyga edit pe click krne pe hi chale vo fr off ho jaye 
    } else {
        //insert
        //jo bi textfield me likha jayga vo push se usme store kr dijyga key value ke form m
        userArray.push({ 'name': name });
    }
    //console.log(userArray);
    //alert(name)
    SaveInfo(userArray); //refresh hone pr data save rhe
    usernameTextField.value = ''; //textfield me name likhne pe gayap ho isliye
    DisplayInfo();
    addUserBtn.innerText = btnText;
}


function SaveInfo(userArray) {
    //userarray ko string me
    let str = JSON.stringify(userArray);//10 name save ho jyga fr refresh new me save hoga to wapas se object me convert krna padyga
    localStorage.setItem('users', str); //save karwaya humne local storage me pr ye srf string leta hai

}

function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i><i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
        </tr>`;
    });
    recordsDisplay.innerHTML = statement; //baar har line me add kr dega 
}

function EditInfo(id) {
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();
}


// search bar
const allTr = document.querySelectorAll('#records tr'); //search ke liye saare tr mtlb row ko andr le rhe hai collect kr lia
const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input',function(e){
    const searchstr = e.target.value.toLowerCase();//ye jo data input mil rha hai
    recordsDisplay.innerHTML = ''; //jab search qurey chalygi to baki sb data ko off kr dega bas usko chalyga jiska input diya hai
    allTr.forEach(tr=>{
        const td_in_tr = tr.querySelectorAll('td');
        if(td_in_tr[0].innerText.toLowerCase().indexOf(searchstr) > -1){
            recordsDisplay.appendChild(tr);
        }
        //console.log(tr);
    });
    if(recordsDisplay.innerHTML == ''){
        recordsDisplay.innerHTML = 'No Records Found';
    }
    // console.log(e.target.value);
});