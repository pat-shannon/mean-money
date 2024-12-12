import random
import pandas as pd
from faker import Faker
from random_word import RandomWords

fake = Faker('en_UK')
word = RandomWords()

# Generate 25 test entries with the following fields:
# savingsTitle (String), savingsTarget (Integer),
# savingsCategory (String (['Holiday', 'House', 'Emergency Funds', 'Education', 'Wedding', 'Family', 'Business', 'Miscellaneous'])
# startDate (date), endDate (date), isComplete (boolean)

savingsCats = ['Holiday', 'House', 'Emergency Funds', 'Education', 'Wedding', 'Family', 'Business', 'Miscellaneous']
isCompleteCats = [True, False]


savings_goal_seed = []
for i in range (25):
    savingsTitle = word.get_random_word()
    savingsTarget = random.randint(0,1000000)
    savingsCategory = random.choice(savingsCats)
    startDate = fake.date()
    endDate = fake.future_date()
    isComplete = random.choice(isCompleteCats)
    
    savings_goal_seed.append({
        "savingsTitle": savingsTitle,
        "savingsTarget": savingsTarget,
        "savingsCategory": savingsCategory,
        "startDate": startDate,
        "endDate": endDate,
        "isComplete": isComplete,
    })

# Create DataFrame
df = pd.DataFrame(savings_goal_seed)

# Save to CSV
FILE_PATH = "./tests_qe/seed_generation/seeds/savings_goal_seed_file.csv"
df.to_csv(FILE_PATH, index=False)
