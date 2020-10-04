const Keyboard={
    elements:{
        main:null,
        keysContainer:null,
        keys:[]
    },
    eventHandlers:{
        oninput:null,
        onclose:null
    },
    properties:{
        value:"",
        capsLock:false
    },
    init(){
        this.elements.main=document.createElement("div");
        this.elements.keysContainer=document.createElement("div");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");

        this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard-key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element=>{
            element.addEventListener("focus",()=>{
                this.open(element.value,currentValue=>{
                    element.value=currentValue;
                });
            });
        });

    },
    _createKeys(){
        const fragment=document.createDocumentFragment();
        const keyLayout=[
            "1","2","3","4","5","6","7","8","9","0","backspace",
            "q","w","e","r","t","y","u","i","o","p",
            "caps","a","s","d","f","g","h","j","k","l","return",
            "done","z","x","c","v","b","n","m",",",".","?",
            "space"

        ];
        const createIcon=(icon_name)=>{
            return `<i class="material-icons">${icon_name}</i>`;
        }
        keyLayout.forEach(key=>{
            const keyElement=document.createElement("button");
            const insertLineBreak=["backspace","return","?","p"].indexOf(key)!==-1;
            keyElement.setAttribute("type","button");
            keyElement.classList.add("keyboard-key");

            switch(key){
                case "backspace":
                    keyElement.classList.add("keyboard-key-space");
                    keyElement.innerHTML=createIcon("backspace");
                    keyElement.addEventListener("click",()=>{
                        this.properties.value=this.properties.value.substring(0,this.properties.value.length-1);
                        this._triggerEvent("oninput");
                    })
                    break;
                    case "caps":
                            keyElement.classList.add("keyboard-key-caps");
                            keyElement.innerHTML=createIcon("keyboard_capslock");
                            keyElement.addEventListener("click",()=>{
                                this._toggleCapsLock();
                                keyElement.classList.toggle("keyboard-key-active",this.properties.capsLock);
                            })
                            break;
                    case "return":
                        keyElement.classList.add("keyboard-key-enter");
                        keyElement.innerHTML=createIcon("keyboard_return");
                        keyElement.addEventListener("click",()=>{
                            this.properties.value+= "\n";
                            this._triggerEvent("oninput");
                        })
                        break;
                    case "space":
                        keyElement.classList.add("keyboard-key-space");
                        keyElement.innerHTML=createIcon("space_bar");
                        keyElement.addEventListener("click",()=>{
                            this.properties.value+=" ";
                            this._triggerEvent("oninput");

                        })
                        break;
                    case "done":
                        keyElement.classList.add("keyboard-key-check-circle");
                        keyElement.innerHTML=createIcon("check_circle");
                        keyElement.addEventListener("click",()=>{
                                this.close();
                                this._triggerEvent("onclose");


                        })
                        break;
                    default:
                        keyElement.textContent=key.toLowerCase();
                        keyElement.addEventListener("click",()=>{
                           this.properties.value+=this.properties.capsLock?key.toUpperCase():key.toLowerCase();
                           this._triggerEvent("oninput");

                    });
                    break;
            }
            fragment.appendChild(keyElement);
            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });
    return fragment;

    },
    _triggerEvent(handlerName){
        if(typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value);
            // console.log(this.properties.value);
        }
    },
    _toggleCapsLock(){
        this.properties.capsLock=!this.properties.capsLock;
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent=this.properties.capsLock?key.textContent.toUpperCase():key.textContent.toLowerCase();
            }
        }

    },
    open(initialValue,oninput,onclose){
        this.properties.value= initialValue || " ";
        this.eventHandlers.oninput=oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.remove("keyboard--hidden");

    },
    close(){
        this.properties.value="";
        this.eventHandlers.oninput=oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.add("keyboard--hidden");


    }
};
window.addEventListener("DOMContentLoaded",function(){
    Keyboard.init();
//     Keyboard.open("hello",function(cuurentValue){
//         console.log("A new word is added",+cuurentValue);
// },function(currentValue){
// console.log("keyboard closed " +currentValue);
// });
});