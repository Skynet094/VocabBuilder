
var selection = window.getSelection(),      // get the selection then
    range = selection.getRangeAt(0),        // the range at first selection group
    rect = range.getBoundingClientRect(); // and convert this to useful data


var para= document.createElement('p');
para.innerHTML="";
para.id="send_message";
para.style.fontSize="20px";

var mousePosition;
var offset = [0,0];
var isDown = false;

 var div = document.createElement('div');   
div.style.top = rect.top + 'px';       // set coordinates
div.style.left = rect.left + 'px';
div.style.border = '1px solid #ccc';
div.style.color="#555";
div.style.display="block";
div.style.padding= 10 + "px";      // with outline
//div.style.height = 140 + 'px'; // and size
div.style.fontFamily="tahoma";
div.style.fontSize=12+ "px";
div.style.boxSizing="border-box";
div.style.background="white";
div.className="fragment";
//div.style.position="absolute";
div.style.position= "fixed";
div.id="move_div";
var newSpan = document.createElement('span');
newSpan.style.float="right";
newSpan.style.display="inline-block";
newSpan.style.padding="2px 5px";
newSpan.style.background="#ccc";
newSpan.id="close";
newSpan.innerHTML="x";




div.appendChild(newSpan);
div.appendChild(para);


document.body.appendChild(div);


drag_div("move_div");

document.getElementById('close').onclick = function(){
        this.parentNode.parentNode
        .removeChild(this.parentNode);
        return false;
    };




function drag_div(div_id){

var div;

div = document.getElementById(div_id);


div.addEventListener('mousedown', function(e) {
    div.isDown = true;
    div.offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

div.addEventListener('mouseup', function() {
    div.isDown = false;
}, true);

div.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (div.isDown) {
        div.mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (div.mousePosition.x + div.offset[0]) + 'px';
        div.style.top  = (div.mousePosition.y + div.offset[1]) + 'px';
    }
}, true);
}