import random
import pandas as pd
from faker import Faker

fake = Faker('en_UK')

# Generate 25 test entries with the following fields:
# name, email, password, currentSavings, disposableIncome,
# foodAndDrinkGoal, socialOutingsGoal, entertainmentAndAppsGoal,
# holidayAndTravelGoal, healthAndBeautyGoal, miscGoal

user_seed = []
for i in range (25):
    name = fake.name()
    email = fake.email()
    password = fake.password()
    currentSavings = random.randint(0,1000000)
    disposableIncome = random.randint(0,1000000)
    foodAndDrinkGoal = random.randint(0,1000)
    socialOutingsGoal = random.randint(0,1000)
    entertainmentAndAppsGoal = random.randint(0,1000)
    holidayAndTravelGoal = random.randint(0,1000)
    healthAndBeautyGoal = random.randint(0,1000)
    miscGoal = random.randint(0,1000)

    user_seed.append({
        "name": name,
        "email": email,
        "password": password,
        "currentSavings": currentSavings,
        "disposableIncome": disposableIncome,
        "foodAndDrinkGoal": foodAndDrinkGoal,
        "socialOutingsGoal": socialOutingsGoal,
        "entertainmentAndAppsGoal": entertainmentAndAppsGoal,
        "holidayAndTravelGoal": holidayAndTravelGoal,
        "healthAndBeautyGoal": healthAndBeautyGoal,
        "miscGoal": miscGoal,
    })

# Create DataFrame
df = pd.DataFrame(user_seed)

# Save to CSV
FILE_PATH = "./tests_qe/seed_generation/seeds/user_seed_file.csv"
df.to_csv(FILE_PATH, index=False)
