"use strict";
//Инициализация контейнеров
var pdfPoolDiv = document.getElementById('pdf_pool_container');
var checklDiv = document.getElementById('check_container');
var fieldPoolDiv = document.getElementById('field_pool_container');
var signatureDiv = document.getElementById('signature_container');
var fields;
var values = {
    name: "",
    lastName: "",
    otch: "",
    city: "",
    count: "",
    email: "",
    image: "",
    id: uuidv4()
};

var connection = new WebSocket("ws://localhost:3030");

connection.onmessage = function(message) {

}

// генерация id пользователя
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


//Добавление формы
function addFields() {
    var newForm = document.createElement('form');
    newForm.setAttribute('name', 'input');
    newForm.setAttribute('method', 'post');
    newForm.setAttribute('action', '#');
    newForm.setAttribute('id', 'form_container');
    fieldPoolDiv === null || fieldPoolDiv === void 0 ? void 0 : fieldPoolDiv.appendChild(newForm);
    if (newForm) {
        //Цикл с единицы начинается чтобы тестовое поле пропустить
        for (var _i = 1, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            addField(field);
        }
        ;
        /*const newSubmit: HTMLElement | null = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');
        newSubmit.setAttribute('id', 'sendButton');
        newSubmit.setAttribute('value', 'Отправить');
        newForm.setAttribute("class", 'container button');
        newForm.appendChild(newSubmit);*/
    }
}
//Добавление поля и подписи к нему
function addField(field) {
    var form = document.getElementById('form_container');
    var newDiv = document.createElement('label');
    newDiv.setAttribute('class', 'field_label');
    newDiv.innerHTML = getTextById(field) + "<br>";
    form === null || form === void 0 ? void 0 : form.appendChild(newDiv);
    var newInput = document.createElement('input');
    newInput.setAttribute('id', field);
    newInput.setAttribute('class', 'input_field');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('size', '40');
    form === null || form === void 0 ? void 0 : form.appendChild(newInput);
    newDiv = document.createElement('label');
    newDiv.innerHTML = "<br>";
    form === null || form === void 0 ? void 0 : form.appendChild(newDiv);
}
//Кнопка очистки полей с данными
function addReserButton() {
    var form = document.getElementById('form_container');
    var newReset = document.createElement('input');
    newReset.setAttribute('type', 'reset');
    newReset.setAttribute('id', 'resetButton');
    newReset.setAttribute('value', 'Очистить формы');
    newReset.setAttribute("class", 'container button');
    form === null || form === void 0 ? void 0 : form.appendChild(newReset);
}
//Получение подписи к соответсвующему полю
function getTextById(id) {
    switch (id) {
        case 'Name':
            {
                return 'Имя';
            }
            ;
        case "lastName":
            {
                return 'Фамилия';
            }
            ;
        case "otch":
            {
                return 'Отчетсво';
            }
            ;
        case "city":
            {
                return 'Город';
            }
            ;
        case "test":
            {
                return 'Тест';
            }
            ;
        case "count":
            {
                return 'Количество аквариумов';
            }
            ;
        case 'email':
            {
                return 'Электронная почта';
            }
            ;
        default:
            {
                return 'Invalid field';
            }
            ;
    }
    ;
}
//Поле для подписи
function addSignatureField() {
    var canvasDiv = document.createElement('canvas');
    canvasDiv.setAttribute("id", "signature");
    canvasDiv.setAttribute("width", "291")
    canvasDiv.setAttribute("height", "125");
    canvasDiv.innerHTML = "This browser does not support Canvas.";
    var drawDiv = document.createElement('script');
    drawDiv.setAttribute("src", "dist/draw.js");
    signatureDiv === null || signatureDiv === void 0 ? void 0 : signatureDiv.appendChild(canvasDiv);
    signatureDiv === null || signatureDiv === void 0 ? void 0 : signatureDiv.appendChild(drawDiv);
}
//Кнопка очистки поля для подписи
function addClearButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "clearButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Очистить подпись";
    signatureDiv === null || signatureDiv === void 0 ? void 0 : signatureDiv.appendChild(newDiv);
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clear();
    });
}
//Кнопка отправления подписи
function addSignButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "signButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Отправить";
    signatureDiv === null || signatureDiv === void 0 ? void 0 : signatureDiv.appendChild(newDiv);
    newDiv.addEventListener('click', function () {
        values.name = document.querySelector("#Name").value;
        values.lastName = document.querySelector("#lastName").value;
        values.otch = document.querySelector("#otch").value;
        values.count = document.querySelector("#count").value;
        values.city = document.querySelector("#city").value;
        values.email = document.querySelector("#email").value;
        var wasDraw = sign(); 
        if (wasDraw) {
            console.log(image);
            values.image = image;
            clearDiv(signatureDiv);
            clearDiv(fieldPoolDiv);
            addCheckDiv();
        }
        console.log(values);
        connection.send(values);
    });
}
//Добавление полей и кнопок начальной страницы
function addfieldPoolDiv() {
    fields = ['test', 'lastName', 'Name', 'otch', 'city', 'count', 'email'];
    addFields();
    addReserButton();
    addSignatureField();
    addClearButton();
    addSignButton();
}
//Кнопка вернуться к заполнению формы
function addReturnButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "returnButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Нет, есть ошибки";
    checklDiv === null || checklDiv === void 0 ? void 0 : checklDiv.appendChild(newDiv);
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clearDiv(checklDiv);
        clearDiv(pdfPoolDiv);
        addfieldPoolDiv();
    });
}
//Кнопка подтверждения
function addAllRigthButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "allRigthButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Да, все верно";
    checklDiv === null || checklDiv === void 0 ? void 0 : checklDiv.appendChild(newDiv);
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clearDiv(checklDiv);
        clearDiv(pdfPoolDiv);
        addMessage();
    });
}
//Проверка правильности заполнения полей
function addCheckDiv() {
    addPDF(["test.pdf"]);
    addReturnButton();
    addAllRigthButton();
}
//Вставка PDF-файла
function addPDF(fileNames) {
    for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
        var fileName = fileNames_1[_i];
        var newDiv = document.createElement('iframe');
        newDiv.setAttribute("src", fileName);
        newDiv.setAttribute("width", "400");
        newDiv.setAttribute("height", "500");
        newDiv.setAttribute('class', 'iframe_container');
        newDiv.innerHTML = "This browser does not support PDFs. Please download the PDF to view it: Download PDF";
        if (pdfPoolDiv) {
            pdfPoolDiv.appendChild(newDiv);
        }
        ;
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
function addMessage() {
    var newDiv = document.createElement('label');
    newDiv.setAttribute('id', 'message');
    newDiv.innerHTML = '<br>Копии документов отправлены на электронную почту<br>';
    checklDiv === null || checklDiv === void 0 ? void 0 : checklDiv.appendChild(newDiv);
}
function clearDiv(divName) {
    if (divName) {
        while (divName.firstChild) {
            divName.removeChild(divName.firstChild);
        }
        ;
    }
    ;
}
addfieldPoolDiv();