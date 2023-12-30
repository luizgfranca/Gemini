import sys

def get_lines_from_file(file_name):
    file = open(file_name, 'r')
    return file.readlines()

def write_lines_on_file(file_name, lines):
    file = open(file_name, 'w')
    file.writelines(lines)

def clean_ends_after_character(lines, character):
    new_lines = []
    for line in lines: 
        position = line.find(character)
        new_lines.append(line if position == -1 else (line[:position] + '\n'))
    return new_lines

origin_file = sys.argv[1]
character = sys.argv[2]
destination_file = sys.argv[3]

result = clean_ends_after_character(
    get_lines_from_file(origin_file), 
    character
) 

write_lines_on_file(destination_file, result)