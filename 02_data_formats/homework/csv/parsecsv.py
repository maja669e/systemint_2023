import csv

with open('me.csv', 'r') as csv_file:
    reader = csv.reader(csv_file)

    for row in reader:
        print(row)    
    csv_file.close()