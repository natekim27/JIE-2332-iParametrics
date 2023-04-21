from dotenv import load_dotenv

import textwrap
import sqlalchemy as db
import urllib
import os

class SQLConnectionObject:
   def __init__(self):
       load_dotenv()
       self.driver = os.getenv("DRIVER")
       self.database_name = os.getenv("DATABASE")
       self.server = os.getenv("SERVER")
       self.username = os.getenv("USER_NAME")
       self.password = os.getenv("PASSWORD")


   def create_connection_string(self) -> str:
       connection_string = textwrap.dedent('''
           Driver={driver};
           Server={server};
           Database={database};
           Uid={username};
           Pwd={password};
           Encrypt=yes;
           TrustServerCertificate=no;
           Connection Timeout=30;
       '''.format(
           driver=self.driver,
           server=self.server,
           database=self.database_name,
           username=self.username,
           password=self.password
       ))
       params = urllib.parse.quote_plus(connection_string)
       connection_string = 'mssql+pyodbc:///?autocommit=true&odbc_connect={}'.format(params)
       return connection_string
   
#turn echo = true off later
def get_azure_engine():
   connection = SQLConnectionObject()
   engine_azure = db.create_engine(connection.create_connection_string(), echo=True)
   return engine_azure
