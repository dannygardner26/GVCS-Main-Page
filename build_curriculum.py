import json

# Paste your full JSON here and run this to create the CurriculumData.js file
curriculum = '''PASTE_THE_FULL_JSON_HERE'''

data = json.loads(curriculum)

with open('CurriculumData.js', 'w', encoding='utf-8') as f:
    f.write('export const CURRICULUM_DATA = ')
    f.write(json.dumps(data, indent=2))
    f.write(';\\n')

print('Done! CurriculumData.js created.')
