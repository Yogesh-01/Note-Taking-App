
showNotes()  // calling the function as the page loads to show all notes stored in local storage

// NOTE: difference between var and let. scope of variable created by "var" stays in it's topmost parent function. while scope of variable created by 
//       "let" stays in it's scope;
//       So, we AVOID 'var'  and use "let" more often



                                        /** adding typed note to local storage*/

let addBtn = document.getElementById('addBtn');  // targeting the add button 
addBtn.addEventListener("click", function(event){  // adding click event listener to button
   let addTxt = document.getElementById('addTxt');  // targeting input text area
   let heading = document.getElementById('heading'); // targetting input area which takes note heading
   let notes = localStorage.getItem("notes");  // retrieving text from local storage. It is an array which is read only and resides in browser
   
   let currdata = new Object();  // creating object to store heading, and body of a note
   currdata.heading=heading.value;
   currdata.body=addTxt.value;
   //console.log(currdata);

   if(notes==null){
     notesObj=[];              // if local storage is empty, we created a global array "notesObj". variable withour var/let are made global
   }
   else{
       notesObj= JSON.parse(notes);  // stored retrieved text into array
   }
   notesObj.push(currdata);      // adding current value of textbox to array (current value is an object containing head and body)
   localStorage.setItem("notes", JSON.stringify(notesObj));  // replacing local storage with our updated array
   addTxt.value="";   // emptying text boxes
   heading.value="";
   //console.log(notesObj);
   showNotes(); // a function to display notes saved in localstorage
});

                          /**** Showing notes. As everytime we add note/delete/refresh, we take values from local storage and update notes */
function showNotes(){
  let notes=localStorage.getItem("notes");
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);   // putting data from local storage to array notesObj
  }
  let html="";
  notesObj.forEach(function(item, index){
    html=html +                   /*** this is the body of notes being accessed while running for each loop in notesObj array  */
    `
    <div class="noteCard my-2 mx-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${item.heading}</h5>
      <p class="card-text"> ${item.body}</p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete</button>    <!-- *** setting id as element of notesObj, and calling delete function by using this id  -->
    </div>
  </div>
    `;
  });
  
  let notesElm = document.getElementById('notes');
  if(notesObj.length !=0){
    notesElm.innerHTML=html;
  }
  else{
    notesElm.innerHTML=`                     <!-- this sample note will appear when user has note created any single note. later it will be replaced by created notes -->
    <div class="card my-2 mx-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Sample Note</h5>
      <p class="card-text">Looks like you haven't created any note. Start typing in the text box above and click on create to make your first note.</p>
      <a href="#" class="btn btn-outline-danger">click to Delete a note</a>
    </div>
  </div>
  `;
  }

}


// deleting a NOte function
function deleteNote(index){
  console.log('Deleted ', index);

  let notes = localStorage.getItem("notes"); // got data from local storage
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);              // stored the recieved data into notesObj array
  }
  notesObj.splice(index,1);     // deleted index 1 from notesObj array using splice
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


                                                               /** making search bar functional**/

let searchFld = document.getElementById('searchTxt');
searchFld.addEventListener("input",function(){  // this function is triggered as soon as we start to type, no enter is required
    
   let inputval = searchFld.value.toLowerCase(); 
  // console.log('user typed ',inputval);

   let noteCards = document.getElementsByClassName('noteCard'); // all cards selected as they have class noteCard
   Array.from(noteCards).forEach(function(element){
     let cardTxt = element.getElementsByTagName("p")[0].innerText; // getting inner text of first "p" tag (@ 0 index)
     let cardHead = element.getElementsByClassName("card-title")[0].innerText;
     
     if(cardTxt.includes(inputval) || cardHead.includes(inputval)){
       element.style.display="block";
     }
     else{
       element.style.display="none";
     }
    
     // console.log(cardTxt);
   });

});