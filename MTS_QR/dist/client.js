"use strict";
var pdfPoolDiv = document.getElementById('pdf_pool_container');
var fieldPoolDiv = document.getElementById('field_pool_container');
var signatureDiv = document.getElementById('signature_container');
function getTextByName(name) {
    switch (name) {
        case 'name':
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
        case "test":
            {
                return 'Тест';
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
function addField(field, newForm) {
    var newDiv = document.createElement('span');
    newDiv.innerHTML = getTextByName(field) + "<br>";
    newForm.appendChild(newDiv);
    var newInput = document.createElement('input');
    newInput.setAttribute('name', field);
    newInput.setAttribute('class', 'input_field');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('size', '40');
    newForm.appendChild(newInput);
    newDiv = document.createElement('span');
    newDiv.innerHTML = "<br>";
    newForm.appendChild(newDiv);
}
function addFields(fields) {
    var newForm = document.createElement('form');
    newForm.setAttribute('name', 'input');
    newForm.setAttribute('method', 'post');
    newForm.setAttribute('action', '#');
    if (fieldPoolDiv) {
        fieldPoolDiv.appendChild(newForm);
    }
    ;
    if (newForm) {
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            addField(field, newForm);
        }
        ;
        var newSubmit = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');
        newSubmit.setAttribute('id', 'sendButton');
        newSubmit.setAttribute('value', 'Отправить');
        newForm.appendChild(newSubmit);
        var newReset = document.createElement('input');
        newReset.setAttribute('type', 'reset');
        newReset.setAttribute('value', 'Очистить');
        newForm.appendChild(newReset);
    }
}
function addPDF(fileNames, signed) {
    for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
        var fileName = fileNames_1[_i];
        var newDiv = document.createElement('iframe');
        newDiv.setAttribute("src", fileName);
        newDiv.setAttribute("width", "600");
        newDiv.setAttribute("height", "600");
        newDiv.innerHTML = "This browser does not support PDFs. Please download the PDF to view it: Download PDF";
        if (pdfPoolDiv) {
            pdfPoolDiv.appendChild(newDiv);
        }
        ;
    }
    if (pdfPoolDiv) {
        var newDiv = document.createElement('span');
        if (!signed) {
            newDiv.innerHTML = '<br>Данные заполнены верно?<br>';
        }
        else {
            newDiv.innerHTML = '<br>Подпись отправлена<br>';
        }
        ;
        pdfPoolDiv.appendChild(newDiv);
    }
    ;
}
function addClearButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "clearButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Очистить";
    if (signatureDiv) {
        signatureDiv.appendChild(newDiv);
    }
    ;
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clear();
    });
}
function addSignButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "signButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Подписать";
    if (signatureDiv) {
        signatureDiv.appendChild(newDiv);
    }
    ;
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        var wasDraw = sign();
        if (wasDraw) {
            clearDiv(signatureDiv);
            addSignedPDFPoolDiv();
        }
    });
}
function addSendButton() {
    var sendButton = document.getElementById('sendButton');
    sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', function () {
        clearDiv(fieldPoolDiv);
        addPDFPoolDiv();
    });
}
function addReturnButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "returnButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Нет, у меня есть ошибки";
    if (pdfPoolDiv) {
        pdfPoolDiv.appendChild(newDiv);
    }
    ;
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clearDiv(pdfPoolDiv);
        addfieldPoolDiv();
    });
}
function addAllRigthButton() {
    var newDiv = document.createElement('button');
    newDiv.setAttribute("id", "allRigthButton");
    newDiv.setAttribute("class", 'container button');
    newDiv.innerHTML = "Да, все верно";
    if (pdfPoolDiv) {
        pdfPoolDiv.appendChild(newDiv);
    }
    ;
    newDiv === null || newDiv === void 0 ? void 0 : newDiv.addEventListener('click', function () {
        clearDiv(pdfPoolDiv);
        addSignatureField();
    });
}
function addSignatureField() {
    var canvasDiv = document.createElement('canvas');
    canvasDiv.setAttribute("id", "signature");
    canvasDiv.setAttribute("width", "1000");
    canvasDiv.setAttribute("height", "200");
    canvasDiv.innerHTML = "This browser does not support Canvas.";
    var drawDiv = document.createElement('script');
    drawDiv.setAttribute("src", "dist/draw.js");
    if (signatureDiv) {
        signatureDiv.appendChild(canvasDiv);
        signatureDiv.appendChild(drawDiv);
    }
    ;
    addClearButton();
    addSignButton();
}
function addfieldPoolDiv() {
    addFields(['test', 'name', 'lastName']);
    addSendButton();
}
function addPDFPoolDiv() {
    addPDF(["test.pdf"], false);
    addReturnButton();
    addAllRigthButton();
}
function addSignedPDFPoolDiv() {
    addPDF(["test.pdf"], true);
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
//# sourceMappingURL=client.js.map