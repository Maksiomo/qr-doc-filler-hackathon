import json
import sys
import os
import comtypes.client
from docxtpl import DocxTemplate


def fillDocx(data):
    doc = DocxTemplate("../../data/form.docx")
    doc.render(data)
    doc.save("../../data/form-final.docx")
    docx2pdfConvert()


def docx2pdfConvert():
    wdFormatPDF = 17

    word = comtypes.client.CreateObject('Word.Application')
    doc = word.Documents.Open("../../data/form-final.docx")
    doc.SaveAs("../../data/form-out.pdf", FileFormat=wdFormatPDF)
    doc.Close()
    word.Quit()


if __name__ == "__main__":
    with open('../../data/test.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
        fillDocx(data)