from queries import Database
from connection import get_azure_engine
from sqlalchemy.orm import Session

engine = get_azure_engine()
__session = Session(engine)
db = Database(__session)