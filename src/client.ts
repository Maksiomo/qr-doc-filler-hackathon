//Инициализация контейнеров
const pdfPoolDiv: HTMLElement | null = document.getElementById('pdf_pool_container');
const checklDiv: HTMLElement | null = document.getElementById('check_container');
const fieldPoolDiv: HTMLElement | null = document.getElementById('field_pool_container');
const signatureDiv: HTMLElement | null = document.getElementById('signature_container');

let fields: string[];
let values: string[];

//Добавление формы
function addFields():void{
    const newForm: HTMLElement | null = document.createElement('form');
    newForm.setAttribute('name', 'input');
    newForm.setAttribute('method', 'post');
    newForm.setAttribute('action', '#');
    newForm.setAttribute('id', 'form_container');
    fieldPoolDiv?.appendChild(newForm);
    if(newForm){
        for (let field of fields) {
            addField(field);
        };
        /*const newSubmit: HTMLElement | null = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');
        newSubmit.setAttribute('id', 'sendButton');
        newSubmit.setAttribute('value', 'Отправить');
        newForm.setAttribute("class", 'container button');
        newForm.appendChild(newSubmit);*/  
    }
}

//Добавление поля и подписи к нему
function addField(field: string): void{
    const form: HTMLElement | null = document.getElementById('form_container');
    let newDiv:  HTMLElement | null = document.createElement('label');
    newDiv.setAttribute('class', 'field_label');
    newDiv.innerHTML = `${getTextById(field)}<br>`;
    form?.appendChild(newDiv);
    const newInput: HTMLElement | null = document.createElement('input');
    newInput.setAttribute('id', field);
    newInput.setAttribute('class', 'input_field');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('size', '40');
    form?.appendChild(newInput);
    newDiv = document.createElement('label');
    newDiv.innerHTML = `<br>`;
    form?.appendChild(newDiv);
}

//Кнопка очистки полей с данными
function addReserButton():void{
    const form: HTMLElement | null = document.getElementById('form_container');
    const newReset: HTMLElement | null = document.createElement('input');
    newReset.setAttribute('type', 'reset');
    newReset.setAttribute('id', 'resetButton');
    newReset.setAttribute('value', 'Очистить формы');
    newReset.setAttribute("class", 'container button');
    form?.appendChild(newReset);
}

//Получение подписи к соответсвующему полю
function getTextById(id: string): string{
    switch(id) { 
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

//Поле для подписи
function addSignatureField():void{
    const canvasDiv: HTMLElement | null = document.createElement('canvas');
    canvasDiv.setAttribute("id", "signature");
    canvasDiv.setAttribute("width", "370");
    canvasDiv.setAttribute("height", "260");
    canvasDiv.innerHTML = "This browser does not support Canvas.";
    const drawDiv: HTMLElement | null = document.createElement('script');
    drawDiv.setAttribute("src", "dist/draw.js");
    signatureDiv?.appendChild(canvasDiv);
    signatureDiv?.appendChild(drawDiv);
}

//Кнопка очистки поля для подписи
function addClearButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "clearButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Очистить подпись";
    signatureDiv?.appendChild(newDiv);
    newDiv?.addEventListener('click', () =>{
        clear();
    });
}

//Кнопка отправления подписи
function addSignButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "signButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Подписать и отправить";
    signatureDiv?.appendChild(newDiv);
    newDiv?.addEventListener('click', () =>{
        let wasDraw: boolean = sign();
        console.log(document.querySelector('#name')?.value);
        for (let field of fields) {
            values.push(document.querySelector(`#${field}`)?.value);
        };
        console.log(values);
        if(wasDraw){
            clearDiv(signatureDiv);
            clearDiv(fieldPoolDiv);
            addCheckDiv();
        }
    });
}

//Добавление полей и кнопок начальной страницы
function addfieldPoolDiv():void{
    fields = ['test', 'name', 'lastName'];
    addFields();
    addReserButton();
    addSignatureField();
    addClearButton();
    addSignButton();
}

//Кнопка вернуться к заполнению формы
function addReturnButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "returnButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Нет, есть ошибки";
    checklDiv?.appendChild(newDiv);
    newDiv?.addEventListener('click', () =>{
        clearDiv(checklDiv);
        clearDiv(pdfPoolDiv);
        addfieldPoolDiv();
    });
}

//Кнопка подтверждения
function addAllRigthButton():void{
    const newDiv: HTMLElement | null = document.createElement('button');
    newDiv.setAttribute("id", "allRigthButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Да, все верно";
    checklDiv?.appendChild(newDiv);
    newDiv?.addEventListener('click', () =>{
        clearDiv(checklDiv);
        clearDiv(pdfPoolDiv);
        addMessage();
    });
}

//Проверка правильности заполнения полей
function addCheckDiv():void{
    addPDF(["test.pdf"]);
    addReturnButton();
    addAllRigthButton();
}

//Вставка PDF-файла
function addPDF(fileNames: string[]):void{
    for(let fileName of fileNames){
        const newDiv: HTMLElement | null = document.createElement('iframe');
        newDiv.setAttribute("src", fileName);
        newDiv.setAttribute("width", "600");
        newDiv.setAttribute("height", "600");
        newDiv.setAttribute('class', 'iframe_container');
        newDiv.innerHTML = "This browser does not support PDFs. Please download the PDF to view it: Download PDF";
        if(pdfPoolDiv){
            pdfPoolDiv.appendChild(newDiv)
        };
    }
}

//Кнопка отправивления формы
/*function addSendButton():void{
    const sendButton: HTMLElement | null = document.getElementById('sendButton');
    sendButton?.addEventListener('click', () =>{
        clearDiv(fieldPoolDiv);
        addPDFPoolDiv();
    });
}*/

function addMessage():void{
    let newDiv:  HTMLElement | null = document.createElement('label');
    newDiv.innerHTML ='<br>Данные отправлены<br>';
    checklDiv?.appendChild(newDiv);
}

function clearDiv(divName: HTMLElement | null){
    if(divName){
        while(divName.firstChild){
            divName.removeChild(divName.firstChild);
        };
    };
}

addfieldPoolDiv();