
```python
# Importação de Bibliotecas
import mysql.connector # Conexão com BD
from datetime import datetime # Data e hora
import os # Interage com o Sistema Operacional

# openpyxl: Biblioteca pra criar e manipular arquivos Excel (.xlsx)
from openpyxl import Workbook # Cria arquivos excel e gerenciar suas abas
from openpyxl.styles import PatternFill, Border, Side, Alignment, Font # Estiliza as células
# PatternFill: aplica preenchimento de cor nas células
# Border/Side: cria bordas personalizadas
# Alignment: alinha o texto da célula
# Font: muda fonte, tamanho, negrito, itálico, cor do texto
from openpyxl.utils import get_column_letter # converte número da coluna em letra

'''
---> EXTRAINDO DADOS DO BD <---
'''

# Conexão com MySQL
conexao = mysql.connector.connect(
    host="34.198.86.190",
    user="root",
    password="urubu100",
    database="codenexus"
)

# Criar cursor
cursor = conexao.cursor(dictionary=True)

# Executar consulta
cursor.execute("SELECT * FROM PartidasTime")

# Pegar resultados
teamData = cursor.fetchall()

# Exibir resultados
for linha in teamData:
    print(linha)

print()

# Fechar cursor e conexão
cursor.close()
conexao.close()

'''
---> CONFIGURAÇÕES DE ESTILO <---
''' 

wb = Workbook() # Cria uma nova planilha no Excel
ws = wb.active # Seleciona a primeira aba (sheet)
ws.title = "Relatorio" # Define o nome da aba (sheet)

# Váriavéis de cor de preenchimento:
# O PatternFill preenche a célula com uma cor sólida
# Cada variável representa uma cor para as seções da planilha (por padrão elas são nomeadas com "fill...")
fill_header = PatternFill("solid", fgColor="ffd966") # Cabeçalho
fill_values = PatternFill("solid", fgColor="e2efda") # Linhas

# Variáveis de bordas
line = Side(style="thin", color="000000") # Side define espessura e cor da linha das bordas da célula
border = Border( # Border indica em quais lados da célula a borda será aplicada
    left=line, 
    right=line, 
    top=line, 
    bottom=line
)

# Variáveis de alinhamento
center_align = Alignment(horizontal="center", vertical="center") # Centraliza o texto da célula
left_align = Alignment(horizontal="left", vertical="center") # Alinha o texo a esquerda da célula

# Variáveis de fonte
font_bold = Font(bold=True, size=13) # Negrito, tamanho 13
font_normal = Font(size=11) # Normal, tamanho 11

'''
---> FUNÇÕES AUXILIARES <---
'''

# Função para aplicar estilização nas células
# Parâmetros: Célula a ser estilizada, cor do preenchimento, se a fonte é em negrito e o tipo de alinhamento
def style_cell(cell, fill=None, bold=False, align=False):
    # Toda célula estilizada possui as bordas destacadas e um preenchimento
    cell.border = border
    cell.fill = fill

    # Validação do font:
    # Se bold for true, aplica negrito na fonte célula, senão deixa a fonte normal
    if bold:
        cell.font = font_bold
    else:
        cell.font = font_normal
    
    # Validação do alignment:
    # Se o parâmetro receber o alinhamento, aplica na célula, senão centraliza ela por padrão
    if align:
        cell.alignment = center_align
    else:
        cell.alignment = left_align

# Função para adicionar textos nas células, retornando as coordenadas da célula alterada
# Parâmetros: Linha da célula, coluna da célula e o texto a ser aplicado
def write_cell(row, col, value):
    return ws.cell(row, col, value=value)

# Função para criar as células de título
# Parâmetros: Linha da célula, coluna inicial, coluna final, texto a ser aplicado e preenchimento de cor
def create_cell(row, col, value, fill, isBold, isAlign):
    cell = write_cell(row, col, value) # Chama a função de aplicar texto e salva a célula em uma variável
    style_cell(cell, fill, isBold, isAlign) # Chama a função de estilizar a célula

# Função para redimensiosar o a altura e a largura das células
def resize(col, row, size_row):
    col_letter = get_column_letter(col)
    ws.column_dimensions[col_letter].width = 22
    ws.row_dimensions[row].height = size_row

# Lista com o nome de todos os títulos do cabeçalho
header_titles = ["Data", "Resultado", "Tipo", "Duração", 
          "Total de Abates", "Total de Assistências", "Total de Mortes", "Total de Gold", 
          "Total de Baron", "Total de Drag", "Total de Torres", "Total de Dano"]

# Linha e Coluna de início
current_row = 2
current_col = 2

# Cabeçalho
for i, titles in enumerate(header_titles, start=2):
    create_cell(current_row, i, titles, fill_header, True, True)
    resize(i, current_row, 27)

# Valores
for item in teamData: # Percorre cada dicionário da lista
    current_row += 1

    for value in item.values(): # Percorre os valores do dicionário atual

        create_cell(current_row, current_col, value, fill_values, False, False)
        resize(current_col, current_row, 15)
        print(value)

        current_col += 1

    current_col = 2

date = datetime.now().strftime("%d-%m-%Y")
arquivo_saida = "Relátorio-Partidas-Equipe-" + date + ".xlsx"
wb.save(arquivo_saida)

print("Arquivo gerado com sucesso: " + arquivo_saida)
```