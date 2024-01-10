// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
    databaseURL : "https://we-are-the-champions-d6da9-default-rtdb.firebaseio.com/"
 }
 
 const app = initializeApp(appSettings)
 const database = getDatabase(app)
 const endorsementsInDb = ref(database, "Endorsements")
 
 const inputEl = document.getElementById("input-field")
 const publishBtn = document.getElementById("publish-btn")
 const endorsementList = document.getElementById("endorsement-list")
 
 publishBtn.addEventListener("click", function() { 
     let inputValue = inputEl.value 
     
     push(endorsementsInDb, inputValue)
     
     clearInputEl()
     
 })
 
 onValue (endorsementsInDb, function (snapshot) {
    
    if (snapshot.exists()) {
         let itemsArray = Object.entries(snapshot.val())
   
        endorsementList.innerHTML = ""
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
        
         appendItemToEndorsementList(currentItem) }
    } else {endorsementList.innerHTML = "No endorsements posted...yet"}
        
 })  


 function clearInputEl() {
     
    inputEl.value = ""
 }
 
 function appendItemToEndorsementList(item) {
     let itemID = item[0]
     let itemValue = item[1]
     let newEl = document.createElement("li")
     newEl.textContent = itemValue
     endorsementList.append(newEl)
     
     newEl.addEventListener("dblclick", function() {
         let exactLocationOfItemInDb = ref(database, `Endorsements/${itemID}`)
         remove(exactLocationOfItemInDb)
     } )
 }