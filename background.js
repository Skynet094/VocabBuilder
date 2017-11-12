chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Find meaning";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});



chrome.contextMenus.onClicked.addListener(onClickHandler);


function onClickHandler(info, tab) {




  var sText = info.selectionText; 

  sText = sText.toLowerCase();

 // var url= "https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=" +  sText + "&pretty=true";
  
  var url= "https://owlbot.info/api/v1/dictionary/"+sText;
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, false);
  xhr.send();

  var obj = JSON.parse(xhr.responseText);
 // var meanings;

  //for(i=0 ; i< obj.tuc.length; i++){
    //if(obj.tuc[i].meanings!= undefined){
      //meanings= obj.tuc[i].meanings
    //  alert(i);
    //    break;
   // }
  //}

  //word_meaning = (meanings[0].text).split(";")[0];

 
 

  var data = {};
  data.word = sText.toLowerCase();
 // data.meaning = word_meaning.toLowerCase();
  
  data.meaning= (obj[0].defenition).replace(/<{1}[^<>]{1,}>{1}/g," ");

//   alert(data.meaning);


     chrome.tabs.insertCSS(null, {file: "test.css"}, function(){

            chrome.tabs.executeScript(null, {file: "test.js"}, function(){

                     chrome.tabs.executeScript(null, {code: "document.getElementById(\"send_message\").innerHTML=\""+ data.meaning + "\";"});


            });


     });

     


 

  //alert(data.word);
  
    if (localStorage['vocabs'] == undefined) { // fixed
     localu = { vocabs: [] };
  } else {
     localu = JSON.parse(localStorage['vocabs']);
  }

  localu.vocabs.push(data);
  
  localStorage['vocabs'] = JSON.stringify(localu); 

   
  
};





document.addEventListener("DOMContentLoaded", function(){

   if(localStorage['vocabs'] != undefined){

      localu = JSON.parse(localStorage['vocabs']);
      arr = localu.vocabs;

      for(i=0; i< arr.length; i++){
        word = arr[i].word;
        meaning= arr[i].meaning;

        var tableHandle = document.getElementById("T0");
        var newRow = tableHandle.insertRow(tableHandle.rows.length);

        var wordCell  = newRow.insertCell(0);
        var meaningCell= newRow.insertCell(1);

        var wordText  = document.createTextNode(word);
        var meaningText= document.createTextNode(meaning);
        wordCell.appendChild(wordText);
        meaningCell.appendChild(meaningText);

      }



      

   }

  
});


