//redirect if not valid login
let currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}

$('#welcomeText').html(`Hello ${currentUser.uname}. Welcome to your Todo List`);

// Logout Section
$('#logOut').on('click',(e)=>{
    e.preventDefault();
    // Sign-out successful.
    window.localStorage.removeItem('user');
    window.location="index.html";
    console.log('logout successfully');
})

// Data fetch
const getList=async ()=>{
    try{
        const res=await axios.get('./todo.json');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox" class="checkbox" ${el.completed?' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('failed to fetch lists data',e);
    }
}


let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('count not equal to 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`Bravo..!! You completed ${data} activities today.!`);
    })
    .catch((err)=>{
        console.log('promise rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }
    
    promiseCall();


});




