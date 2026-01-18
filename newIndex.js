// ---------------display function------------

//מקבלת אובייקטים להצגה ולהסתרה(לפי ה-"אידי") "event " כדי למנוע התנהגות ברירת מחדל
function showObje(showObj, hideObj, event) {

    event.preventDefault();

    hideObj.classList.add("hide");
    hideObj.classList.remove("show");

    showObj.classList.remove("hide");
    showObj.classList.add("show");


}


//מחליפה תמונת רקע
function changeBk_l() {
    body.style.backgroundImage = "url(images/l.jpg)";
}
//מחליפה תמונת רקע
function changeBk_ve() {
    body.style.backgroundImage = "url(images/ve.jpg)";
}






//-------------------------logic------------------------

//-------arrays-----

//מערך משתמשים
// const Users = [
//     { id: 1, name: "ruti", email: "r@gmail.com", password: "1111" },
//     { id: 2, name: "bina", email: "b@gmail.com", password: "2222" },
//     { id: 3, name: "gila", email: "g@gmail.com", password: "3333" },
//     { id: 4, name: "dina", email: "d@gmail.com", password: "4444" },

// ]
 let Users;
 let Orders;
//עגלה
let cart_ = { id:0,nameUser:"",idUser:0,date: "", target_: "", step_over: "", yacht: "", attraction: "", celebration: "" }


//מערך ההזמנות של המשתמש שנכנס כרגע למערכת
let UserOrder = [];

// -----------------logic function---------------

function basicDataTolocalStoreg(){
//אם אין מידע בלוקל סטורג
if (localStorage.getItem("Orders") == null) {
    const dataToLs = [
        { id: 1, nameUser: "ruti", idUser: 1, target_: "איטליה", step_over: "יון,נאפולי,דוברובניק", date: "2024-05-12", yacht: "אריאל", attraction: "ספא,שחיה עם דולפינים,פנסיון מלא", celebration: "יום גיבוש" },
        { id: 2, nameUser: "bina", idUser: 2, target_: "איי הבריטים", step_over: "יון,איטליה,דוברובניק", date: "2024-09-12", yacht: "נגה", attraction: "ספא,צלילה,פנסיון מלא", celebration: "יום הולדת" },
        { id: 3, nameUser: "gila", idUser: 3, target_: "נאפולי", step_over: "קפריסין,יון,איטליה", date: "2024-08-19", yacht: "שנהב", attraction: "צלילה,חצי פנסיון", celebration: "יום נישואין" },
        { id: 4, nameUser: "ruti", idUser: 1, target_: "יון", step_over: "איטליה,איי כריתים", date: "2024-07-17", yacht: "אלמוג", attraction: "ספא,גלישה,פנסיון מלא", celebration: "יום גיבוש" },
    ];
    const dataStr = JSON.stringify(dataToLs);
    localStorage.setItem("Orders", dataStr);

}



//אם אין מידע בלוקל סטורג
if(localStorage.getItem("Users")==null){
    const dataToLs=[
            { id: 1, name: "ruti", email: "r@gmail.com", password: "1111" },
            { id: 2, name: "bina", email: "b@gmail.com", password: "2222" },
            { id: 3, name: "gila", email: "g@gmail.com", password: "3333" },
            { id: 4, name: "dina", email: "d@gmail.com", password: "4444" },
        ];
        const dataStr=JSON.stringify(dataToLs);
        localStorage.setItem("Users",dataStr);

}
}

//משתנה שיקבל מיהו המשתמש שנכנס למערכת
let userIn;



// לקיחת מידע חיוני מהלוקל סטורג והכנסת נתונים למערך ההזמנות של הלקוח
function loadOrders(event) {

    event.preventDefault();

    //לקיחת מערך ההזמנות מהלוקל סטורג
    const strOrders = localStorage.getItem("Orders");
    Orders = JSON.parse(strOrders);


//לקיחת מערך המשתמשים מהלוקל סטורג
    const strUsers = localStorage.getItem("Users");
    Users = JSON.parse(strUsers);


    //לקח את האידי של המשתמש הנוכחי מהלוקל סטורג
    userIn = parseInt(localStorage.getItem("userId_in"));


    //זהות המשתמש שיצור עגלה
    cart_.id=Orders.length+1;
    cart_.idUser=userIn;
//    cart_.nameUser=Users[userIn-1].name; 


    //סינון ההזמנות ששיכות למשתמש הנוכחי
    UserOrder = [];
    UserOrder = Orders.filter(o => o.idUser == userIn);
    //עדכון בלוקל סטורג
    const strUserOrder = JSON.stringify(UserOrder);
        localStorage.setItem("UserOrder", strUserOrder);


    //רינדור ההזמנות
    renderOrders();

}



//פונקצית התחברות
//מקבלת פרטים של פונקציות התצוגה כדי לעבור דף במידה והפרטים נכונים
function login_(showObj, hideObj, event) {

    const login = document.getElementById("login");
    const email = login.UserEmail.value;
    const psw = login.psw.value;

    const user = Users.find(u => u.password === psw && u.email === email);
    if (user === undefined)
        alert("אחד הפרטים שגוי");
    else {

        //מקבל את המשתמש שנכנס למערכת
        localStorage.setItem("userId_in", Users[user.id - 1].id);

        alert("hello " + user.name);

        showObje(showObj, hideObj, event);
        changeBk_l();

    }

}

//----------------register func--------
//מקבלת פרטים של פונקציות התצוגה כדי לעבור דף במידה והפרטים נכונים
function register_(showObj, hideObj, event) {

    event.preventDefault();
    const register = document.getElementById("register");
    const use = Users.find(u => u.email === register.email.value);
    if (use === undefined) {

        const newUser = {
            id: Users.length + 1, name: register.Username.value,
            email: register.email.value, password: register.password.value
        };

        //מוסיף את המשתמש החדש לרשימת המשתמשים
        Users.push(newUser);

        //מעדכן גם את הלוקל סטורג
        const strUsers = JSON.stringify(Users);
        localStorage.setItem("Users", strUsers);


        //מקבל את פרטי המשתמש שנכנס למערכת
        localStorage.setItem("userId_in", Users[newUser.id - 1].id);

        alert("שלום " + newUser.name + "  נרשמת בהצלחה לרשימת המנויים")


        changeBk_l();
        showObje(showObj, hideObj, event)
    }
    else
        alert("מצטערים, הפרטים קיימים במערכת");
    event.preventDefault();

}



//-------------------הוספת הנתונים לעגלה-----------------

function add_date_target() {

    const date = document.getElementById("date");
    const target_ = document.getElementById("target_");

    cart_.date = date.datetime.value;
    cart_.target_ = target_.city.value;
}

function addStep_over(event) {
    if (cart_.step_over != "")
        cart_.step_over += ", ";
    cart_.step_over += event.target.value;
}

function addYacht(event) {
    cart_.yacht = event.target.id;

}

function addAttraction(event) {
    if (cart_.attraction != "")
        cart_.attraction += ", ";
    cart_.attraction += event.target.id;

}

function addCelebration(event) {
    cart_.celebration = event.target.id;

}


//-------------------------רינדורים---------------------

//----------רינדור עגלה---------

function renderCart() {
    const cart = document.getElementById("cart");
    cart.innerHTML = "";
    cart.innerHTML += `<div class="plan">
                            <p><img src="icon/calendar-and-time.png">${cart_.date}</p>
                            <p><img src="icon/location.png">יעד:${cart_.target_}.  עצירות ביניים: ${cart_.step_over}   </p>
                            <p><img src="icon/sail.png"> יאכטת ${cart_.yacht}</p>
                            <p><img src="icon/theme-park.png">${cart_.attraction} </p>
                            <p><img src="icon/mothers-day.png">  ${cart_.celebration} מהנה</p>
                            
                     </div>`
    cart.innerHTML += `<a class="next" href="" onclick="showObje(group,cart,event),addToOrders(),renderOrders()">סיום חשבון</a>`;
}


//------רינדור כל הזמנות הלקוח---------
function renderOrders() {
    const ordersDiv = document.getElementById("last_orders");
    ordersDiv.innerHTML = "";

    if (UserOrder.length == 0) {
        ordersDiv.innerHTML += `<p id="no_order">עדיין אין רכישות </p>`;
    }

    for (let i = 0; i < UserOrder.length; i++) {
        const order = UserOrder[i];

        ordersDiv.innerHTML += `  <div class="plan detail">
                                       <h3>הפלגה ${i + 1}</h3>
                                       <p><img src="icon/calendar-and-time.png">${order.date}</p>
                                       <p><img src="icon/location.png">יעד:${order.target_} .עצירות ביניים:  ${order.step_over}</p>
                                       <p><img src="icon/sail.png">יאכטת ${order.yacht}</p>
                                       <p><img src="icon/theme-park.png">${order.attraction}</p>
                                       <p><img src="icon/mothers-day.png">${order.celebration}</p>
                                 </div>`

    }
    ordersDiv.innerHTML += ` <a class="next" href="" onclick="showObje(group,last_orders,event),changeBk_l()">next</a>`;

}


//---עדכון ההזמנות במערכים ובלוקל סטורג------
function addToOrders() {
    if (cart_.date != "" && cart_.target_ != "" && cart_.yacht != "") {
        Orders.push(cart_);
        UserOrder.push(cart_);

        const strOrders = JSON.stringify(Orders);
        localStorage.setItem("Orders", strOrders);
    }
    else {
        alert("ההזמנה לא הושלמה");
    }

}


