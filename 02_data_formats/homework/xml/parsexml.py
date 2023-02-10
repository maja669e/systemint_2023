import xml.etree.ElementTree as ET
mytree = ET.parse('me.xml')
myroot = mytree.getroot()


for x in myroot[0]:
     print(x.text)


for x in myroot.findall('me'):
    name = x.find('name').text
    age = x.find('age').text
    hobbies = x.find('.//hobby').text
    print(name, age, hobbies)


"""import xml.etree.ElementTree as ET

tree = ET.parse('me.xml')

root = tree.getroot()


for hobby in root.iter('hobby'):
    print(hobby.text)"""
