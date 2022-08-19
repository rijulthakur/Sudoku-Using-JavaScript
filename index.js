const easy = [
    "--5----7-------32------1---362----81--96-----71--9-4-5-2---651---78----345----2--",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];

const medium= [
    "-1-5-------97-42----5----7-5---3---7-6--2-4----8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

const hard = [
    "6----------3---6-7----1----15--4-3--------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
var selectedCell;
var difficulty = easy[0];
var answer = [""];
let diffNum = 1;
window.onload = function () {
    startGame(); 
}
function difficult(a) {
    switch(a)
    {
        case 1 :  window.difficulty = easy[0];
        break;
        case 2 :  window.difficulty = medium[0];
        break;
        case 3 :  window.difficulty = hard[0];
        break;
        default: window.difficulty = easy[0];
    }
    diffNum = a;
    startGame();
}

function startGame() {
    let board;    
    board = difficulty;    
    fillAns(difficulty);    
    createBoard(board);
    if(sessionStorage.getItem("cache")){
        var saved  = sessionStorage.getItem("cache");
        var diff = sessionStorage.getItem("diff");
        if(diff != diffNum){
        if(diff==1) {
            difficult(1);
        } else if(diff==2) {
            difficult(2);
        } else if(diff==3) {
            difficult(3);
        }
            } else {
            saved = saved.split(",");
            answer = saved;
            for(i=0;i<81;i++){
            if(saved[i]!="-" && saved[i]!=difficulty[i]){
            qS(".cell")[i].classList.add("modified"); 
            id(i).textContent = saved[i];
            }
        }
            }
        
    }
}

function createBoard(board) {
    clearPrevious();
    let idCell = 0;
    for(let i=0;i<81;i++){
        let cell  = document.createElement("p");
        if(board.charAt(i)!="-") {
            cell.textContent = board.charAt(i);
            cell.classList.add("prefilled");
        }   else {
            cell.addEventListener("click", function(){
                if(cell.classList.contains("selected")) {
                    cell.classList.remove("selected");
                    selectedCell = null;
                } else {
                    for(let i=0;i<81;i++) {
                        qS(".cell")[i].classList.remove("selected");
                    }                  
                }
                cell.classList.add("selected");
                selectedCell = cell;
                updateMove();
            }); 
        }
        cell.id = idCell;
        idCell++;
        cell.classList.add("cell");
        if((cell.id > 17 && cell.id < 27) || (cell.id > 44 && cell.id < 54 )) {
            cell.classList.add("bottomBorder");
        }
        if( ((cell.id + 1) % 9 == 3) || ((cell.id + 1) % 9 == 6) ) {
            cell.classList.add("rightBorder");
        }
        if((cell.id + 1) % 9 == 0 || (cell.id + 1) % 9 == 0) {
              cell.classList.add("rightBorder");
         }
        if((cell.id + 2) % 9 == 2 || (cell.id + 2) % 9 == 2) {
            cell.classList.add("leftBorder");
       }
        if((cell.id > 71 && cell.id < 81)) {
            cell.classList.add("bottomBorder");
        }
        if((cell.id > -1 && cell.id < 9)) {
            cell.classList.add("topBorder");
        }
        id("board").appendChild(cell);
    }
}







function updateMove() {
    if(selectedCell)
    {
        document.addEventListener('keydown', (event) => {
            var name = event.key;
            if(name>0 && name<10 && drop(name))
            {
            selectedCell.textContent = name;
            addToArray(name);
            addToCache();          
            } else if(name==0){
                selectedCell.textContent = null;
                removeFromArray();}
          }, false);       
    }
    highSelect();
}








function highSelect() {
    for(let i=0;i<81;i++) {
    qS(".cell")[i].classList.remove("highlighted");
    qS(".cell")[i].classList.remove("duplicate");
    }
   
    let col = parseInt(selectedCell.id % 9);
    let row = parseInt(selectedCell.id / 9);
    let z = selectedCell.id;
    for(let i=0;i<81;i++){
        if(parseInt(selectedCell.textContent)==answer[i])
        id(i).classList.add("duplicate");
    }
   
    for(let i=col;i<col+73;i+=9)
    {
        if(i!=z) {
            id(i).classList.add("highlighted");
        }       
    } 
   
    for(let i=row*9;i<row*9+9;i++)
    {
        if(i!=z) {
            id(i).classList.add("highlighted");
        }
    }
   
    let x = 0;
    let y = 3;
   
    if( (-1<z && z<3) || (8<z && z<12) || (17<z && z<21) ) {    
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }
        }
          x = 3;
          y = 6;
    if( (2<z && z<6) || (11<z && z<15) || (20<z && z<24) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }
    }
          x = 6;
          y = 9;
    if( (5<z && z<9) || (14<z && z<18) || (23<z && z<27) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }       
    }
         x=27;
         y=30;
    if( (26<z && z<30) || (35<z && z<39) || (44<z && z<48) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }    
    }
         x = 30;
         y = 33;
    if( (29<z && z<33) || (38<z && z<42) || (47<z && z<51) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }    
    }
        x = 33;
        y = 36;
    if( (32<z && z<36) || (41<z && z<45) || (50<z && z<54) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }    
    }
        x = 54;
        y = 57;
    if( (53<z && z<57) || (62<z && z<66) || (71<z && z<75) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }    
    }
        x = 57;
        y = 60;
    if( (56<z && z<60) || (65<z && z<69) || (74<z && z<78) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }    
    }
        x = 60;
        y = 63;
    if( (59<z && z<63) || (68<z && z<72) || (77<z && z<81) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(j!=z) {
                    id(j).classList.add("highlighted");
                }
                }
            }   
    }
}

function clearPrevious() {
    let cells = qS(".cell")
    for(let i=0;i<cells.length;i++)
    {
        cells[i].remove();
    }
}
function reset(){
    let diff = sessionStorage.getItem("diff");
    sessionStorage.clear();
    difficult(diff);
}
function fillAns(str) {
    for(let i=0;i<str.length;i++) {
        answer[i] = str[i];
    }  
}
function addToCache() {
    sessionStorage.setItem("cache",answer);
    sessionStorage.setItem("diff",diffNum);
}
function addToArray(num) {
    let index = q(".selected").id;
    answer.splice(index,1,num);
    q(".selected").classList.add("modified");
    duplicateicate(num);
}
function removeFromArray() {
    let index = q(".selected").id;
    answer.splice(index,1,"-");
    q(".selected").classList.remove("modified");
}
function duplicaticate(num) {
    for(let i=0;i<81;i++){
        if(num==answer[i])
        id(i).classList.add("duplicate");
    }
}
function validate() {
    let status= 1;
   for(let i=0;i<answer.length;i++)
   {
       let sum=0;
    
   for(let i=0;i<9;i++){
       if(answer!="-")
    sum+=parseInt(answer[i]);
       for(let j=i+9;j<81;j+=9){
        if(answer!="-")
           sum+=parseInt(answer[j]);
       }
   }
   if(sum!=405){
    status = 0;
   }  
    }
    if(status==1){
        endGame();
        return;
       } else {
        alert("Sorry, Try again.");
       }   
}

function drop(num) {
    let pass = 1;
    let col = parseInt(selectedCell.id % 9);
    let row = parseInt(selectedCell.id / 9);
    let z = selectedCell.id;
    for(let i=col;i<col+73;i+=9)
    {
        if(num==answer[i]){
            pass = 0;
            break;
        }
    }
    for(let i=row*9;i<row*9+9;i++)
    {
        if(num==answer[i]){
            pass = 0;
            break;
        }
    }
    let x = 0;
    let y = 3;
    if( (-1<z && z<3) || (8<z && z<12) || (17<z && z<21) ) {    
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }
        }
        x = 3;
        y = 6;
    if( (2<z && z<6) || (11<z && z<15) || (20<z && z<24) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }
    }
         x = 6;
         y = 9;
    if( (5<z && z<9) || (14<z && z<18) || (23<z && z<27) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }       
    }
         x=27;
         y=30;
    if( (26<z && z<30) || (35<z && z<39) || (44<z && z<48) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }    
    }
        x = 30;
        y = 33;
    if( (29<z && z<33) || (38<z && z<42) || (47<z && z<51) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }    
    }
         x = 33;
         y = 36;
    if( (32<z && z<36) || (41<z && z<45) || (50<z && z<54) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }    
    }
        x = 54;
        y = 57;
    if( (53<z && z<57) || (62<z && z<66) || (71<z && z<75) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }    
    }
        x = 57;
        y = 60;
    if( (56<z && z<60) || (65<z && z<69) || (74<z && z<78) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }    
    }
        x = 60;
        y = 63;
    if( (59<z && z<63) || (68<z && z<72) || (77<z && z<81) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                if(num==answer[j]){
                    pass = 0;
                    break;
                }
                }
            }   
    }
    return pass;
}

function endGame() {
    sessionStorage.clear();
    for(let i=0;i<81;i++){
        id(i).classList.add("prefilled");      
    }
    alert("Congrats, You Win!");
    
}

function printOutput() {
    console.log(sessionStorage.getItem("cache"));
    console.log(sessionStorage.getItem("diff"));  
}

function id(id) {
    return document.getElementById(id);
}
function q(selector) {
    return document.querySelector(selector);
}
function qS(selector) {
    return document.querySelectorAll(selector);
}
