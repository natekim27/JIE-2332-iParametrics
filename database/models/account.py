from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from database.models.base import Base

class Account(Base):
   __tablename__ = "account"


   username: Mapped[int] = mapped_column(primary_key=True, autoincrement=False)
   password: Mapped[str] = mapped_column(String(50))
   user_type: Mapped[int]
  


   def as_dict(self):
      return {c.name: getattr(self, c.name) for c in self.__table__.columns}
  
   def __init__(self, dict):
       for key in dict:
           setattr(self, key, dict[key])