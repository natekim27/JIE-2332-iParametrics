from sqlalchemy.ext.declarative import declarative_base


class CustomBase():
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __init__(self, dict):
        for key in dict:
            setattr(self, key, dict[key])
            
Base = declarative_base(cls=CustomBase)