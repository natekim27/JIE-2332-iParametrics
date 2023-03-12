import textwrap
import pyodbc
import sqlalchemy as db
import urllib


class SQLConnectionObject:
   def __init__(self):
       self.driver = '{ODBC Driver 18 for SQL Server}'
       self.server_name = 'iparametricsserver'
       self.database_name = 'iParametrics'
       self.server = '{server}.database.windows.net, 1433'.format(server=self.server_name)
       self.username = "teamipara"
       self.password = "*****"


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
