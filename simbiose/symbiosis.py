import mysql.connector
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import PatternFill, Border, Side, Alignment, Font
from openpyxl.utils import get_column_letter

'''
---> EXTRAINDO DADOS DO BD <---
'''

conexao = mysql.connector.connect(
    host="34.198.86.190",
    user="root",
    password="urubu100",
    database="codenexus"
)

cursor = conexao.cursor(dictionary=True)

cursor.execute("SELECT * FROM PartidasTime")

teamData = cursor.fetchall()

cursor.close()
conexao.close()

'''
---> CONFIGURAÇÕES DE ESTILO <---
''' 

wb = Workbook()
ws = wb.active
ws.title = "Relatorio"

fill_header = PatternFill("solid", fgColor="ffd966")
fill_values = PatternFill("solid", fgColor="e2efda")

line = Side(style="thin", color="000000")
border = Border(left=line, right=line, top=line, bottom=line)

center_align = Alignment(horizontal="center", vertical="center")
left_align = Alignment(horizontal="left", vertical="center")

# Variáveis de fonte
font_bold = Font(bold=True, size=13)
font_normal = Font(size=11)

'''
---> FUNÇÕES AUXILIARES <---
'''

def style_cell(cell, fill=None, bold=False, align=False):
    cell.border = border
    cell.fill = fill

    if bold:
        cell.font = font_bold
    else:
        cell.font = font_normal
    
    if align:
        cell.alignment = center_align
    else:
        cell.alignment = left_align

def write_cell(row, col, value):
    return ws.cell(row, col, value=value)

def create_cell(row, col, value, fill, isBold, isAlign):
    cell = write_cell(row, col, value)
    style_cell(cell, fill, isBold, isAlign)

def resize(col, row, size_row):
    col_letter = get_column_letter(col)
    ws.column_dimensions[col_letter].width = 22
    ws.row_dimensions[row].height = size_row

header_titles = [
    "Data", 
    "Resultado", 
    "Tipo", 
    "Duração", 
    "Total de Abates", 
    "Total de Assistências", 
    "Total de Mortes", 
    "Total de Gold", 
    "Total de Baron", 
    "Total de Drag", 
    "Total de Torres", 
    "Total de Dano"
]

current_row = 2
current_col = 2

for i, titles in enumerate(header_titles, start=2):
    create_cell(current_row, i, titles, fill_header, True, True)
    resize(i, current_row, 27)

for item in teamData:
    current_row += 1

    for value in item.values():

        create_cell(current_row, current_col, value, fill_values, False, False)
        resize(current_col, current_row, 15)
        print(value)

        current_col += 1

    current_col = 2

date = datetime.now().strftime("%d-%m-%Y")
arquivo_saida = "Relátorio-Partidas-Equipe-" + date + ".xlsx"
wb.save(arquivo_saida)

print("Arquivo gerado com sucesso: " + arquivo_saida)