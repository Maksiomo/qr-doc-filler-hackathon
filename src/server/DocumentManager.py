import json, base64
from docx2pdf import convert
from docxtpl import DocxTemplate
from docx.shared import Inches

def fillAndConvert(info_folder, file_name, data):
    doc = DocxTemplate(info_folder + "form.docx")
    tables = doc.tables
    print(tables)
    p = tables[2].rows[3].cells[2].add_paragraph()
    r = p.add_run()
    r.add_picture(info_folder + 'signature.png', width=Inches(3), height=Inches(.5))

    doc.render(data)

    doc.save(info_folder + file_name + ".docx")
    convert(info_folder + file_name + ".docx", info_folder + file_name + ".pdf")


def decodeDataUrl(info_folder, code):
    with open(info_folder + 'signature.png', 'wb') as f:
        f.write(base64.b64decode(code.split(',')[1].encode()))
