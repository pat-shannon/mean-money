import random
import pandas as pd
from faker import Faker
from random_word import RandomWords

fake = Faker('en_UK')
word = RandomWords()

# Generate 25 test entries with the following fields:
# amount (Integer), date (date), businessName (String),
# category (String (['Food and Drink', 'Social and Entertainment', 'Shopping', 'Holiday and Travel', 'Health and Beauty', 'Miscellaneous'])


diaryCats = ['Food and Drink', 'Social and Entertainment', 'Shopping', 'Holiday and Travel', 'Health and Beauty', 'Miscellaneous']

diary_entry_seed = []
for i in range (25):
    amount = round(random.uniform(0.1, 1000.5),2)
    date = fake.date()
    businessName = word.get_random_word()
    category = random.choice(diaryCats)
    
    diary_entry_seed.append({
        "amount": amount,
        "date": date,
        "businessName": businessName,
        "category": category,
    })

# Creates DataFrame
df = pd.DataFrame(diary_entry_seed)

# Saves to CSV
FILE_PATH = "./tests_qe/seed_generation/seeds/diary_entry_seed_file.csv"
df.to_csv(FILE_PATH, index=False)
