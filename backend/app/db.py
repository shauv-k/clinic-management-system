import oracledb
import os
from dotenv import load_dotenv

load_dotenv()

dsn = os.getenv("DB_DSN")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")

def get_connection():
    return oracledb.connect(user=user, password=password, dsn=dsn)