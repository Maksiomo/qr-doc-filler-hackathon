const pdfPoolDiv: HTMLElement | null = document.getElementById('pdf_pool_container');
const fieldPoolDiv: HTMLElement | null = document.getElementById('field_pool_container');
const signatureDiv: HTMLElement | null = document.getElementById('signature_container');

function getTextByName(name: string): string{
    switch(name) { 
        case 'name': { 
           return 'Имя';
        };
        case "lastName": { 
            return 'Фамилия';
        };
        case "otch": { 
            return 'Отчетсво';
        };
        case "test": { 
            return 'Тест';
        };
        default: { 
           return 'Invalid field';             
        };
     };
}

function addField(field: string, newForm: HTMLElement): void{
    let newDiv:  HTMLElement | null = document.createElement('span');
    newDiv.innerHTML = `${getTextByName(field)}<br>`;
    newForm.appendChild(newDiv);
    const newInput: HTMLElement | null = document.createElement('input');
    newInput.setAttribute('name', field);
    newInput.setAttribute('class', 'input_field');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('size', '40');
    newForm.appendChild(newInput);
    newDiv = document.createElement('span');
    newDiv.innerHTML = `<br>`;
    newForm.appendChild(newDiv);
}

function addFields(fields: string[]):void{
    const newForm: HTMLElement | null = document.createElement('form');
    newForm.setAttribute('name', 'input');
    newForm.setAttribute('method', 'post');
    newForm.setAttribute('action', '#');
    if(fieldPoolDiv){
        fieldPoolDiv.appendChild(newForm);
    };
    if(newForm){
        for (let field of fields) {
            addField(field, newForm);
        };
        const newSubmit: HTMLElement | null = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');
        newSubmit.setAttribute('id', 'sendButton');
        newSubmit.setAttribute('value', 'Отправить');
        newForm.appendChild(newSubmit);
        const newReset: HTMLElement | null = document.createElement('input');
        newReset.setAttribute('type', 'reset');
        newReset.setAttribute('value', 'Очистить');
        newForm.appendChild(newReset);
    }
}

function addPDF(fileNames: string[], signed: boolean):void{
    for(let fileName of fileNames){
        const newDiv: HTMLElement | null = document.createElement('iframe');
        newDiv.setAttribute("src", fileName);
        newDiv.setAttribute("width", "600");
        newDiv.setAttribute("height", "600");
        newDiv.innerHTML = "This browser does not support PDFs. Please download the PDF to view it: Download PDF";
        if(pdfPoolDiv){
            pdfPoolDiv.appendChild(newDiv)
        };
    }
    if(pdfPoolDiv){
        let newDiv:  HTMLElement | null = document.createElement('span');
        if(!signed){
            newDiv.innerHTML ='<br>Данные заполнены верно?<br>';
        }
        else{
            newDiv.innerHTML ='<br>Подпись отправлена<br>';
        };
        pdfPoolDiv.appendChild(newDiv);
    };
}

function addClearButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "clearButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Очистить";
    if(signatureDiv){
        signatureDiv.appendChild(newDiv);
    };
    newDiv?.addEventListener('click', () =>{
        clear();
    });
}

function addSignButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "signButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Подписать";
    if(signatureDiv){
        signatureDiv.appendChild(newDiv);
    };
    newDiv?.addEventListener('click', () =>{
        let wasDraw: boolean = sign();
        if(wasDraw){
            clearDiv(signatureDiv);
            addSignedPDFPoolDiv();
        }
    });
}

function addSendButton():void{
    const sendButton: HTMLElement | null = document.getElementById('sendButton');
    sendButton?.addEventListener('click', () =>{
        clearDiv(fieldPoolDiv);
        addPDFPoolDiv();
    });
}

function addReturnButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "returnButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Нет, у меня есть ошибки";
    if(pdfPoolDiv){
        pdfPoolDiv.appendChild(newDiv);
    };
    newDiv?.addEventListener('click', () =>{
        clearDiv(pdfPoolDiv);
        addfieldPoolDiv();
    });
}

function addAllRigthButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "allRigthButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Да, все верно";
    if(pdfPoolDiv){
        pdfPoolDiv.appendChild(newDiv);
    };
    newDiv?.addEventListener('click', () =>{
        clearDiv(pdfPoolDiv);
        addSignatureField();
    });
}

function addSignatureField():void{
    const canvasDiv: HTMLElement | null = document.createElement('canvas');
    canvasDiv.setAttribute("id", "signature");
    canvasDiv.setAttribute("width", "1000");
    canvasDiv.setAttribute("height", "200");
    canvasDiv.innerHTML = "This browser does not support Canvas.";
    const drawDiv: HTMLElement | null = document.createElement('script');
    drawDiv.setAttribute("src", "dist/draw.js");
    if(signatureDiv){
        signatureDiv.appendChild(canvasDiv);
        signatureDiv.appendChild(drawDiv);
    };
    addClearButton();
    addSignButton();
}

function addfieldPoolDiv():void{
    addFields(['test', 'name', 'lastName']);
    addSendButton();
}

function addPDFPoolDiv():void{
    addPDF(["test.pdf"], false);
    addReturnButton();
    addAllRigthButton();
}

function addSignedPDFPoolDiv():void{
    addPDF(["test.pdf"], true);
}

function clearDiv(divName: HTMLElement | null){
    if(divName){
        while(divName.firstChild){
            divName.removeChild(divName.firstChild);
        };
    };
}

addfieldPoolDiv();