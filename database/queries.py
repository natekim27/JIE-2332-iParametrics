from sqlalchemy import select
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select
from models.account import Account
from models.features import Feature
from typing import Dict

class Database():
    def __init__(self, session: Session):
        self.session = session
        
    def get_all_features(self) -> List[Dict]:
        stmt = select(Feature)
        result = []
        for feature in self.session.scalars(stmt):
            result.append(feature.as_dict())
        return result
    
    def get_feature_by_sno(self, serial_number: int) -> Feature:
        stmt = select(Feature).where(Feature.serial_number == serial_number)
        feature = self.session.scalar(stmt)
        return feature
    
    def get_features_by_population_range(self, min_pop: int, max_pop: int) -> List[Feature]:
        if max_pop and min_pop:
            stmt = select(Feature).where
            (Feature.population >= min_pop).where
            (Feature.population <= max_pop)
        elif min_pop:
            stmt = select(Feature).where(Feature.population >= min_pop)
        else:
            stmt = select(Feature).where(Feature.population <= max_pop)
        result = []

        for feature in self.session.scalars(stmt):
            result.append(feature.as_dict())

        return result
    
    def delete_feature_by_sno(self, serial_number: int) -> Feature:
        stmt = select(Feature).where(Feature.serial_number == serial_number)
        feature = self.session.scalar(stmt)
        self.session.delete(feature)

    def add_feature(self, feature: Feature) -> Feature:
        try:    
            self.session.add(feature)
            self.session.commit()
        except:
            self.session.rollback()
            raise
            
        return feature

    def get_account_by_username(self, username: str) -> Account:
        stmt = select(Account).where(Account.username == username)
        account = self.session.scalar(stmt)
        return account

    def add_account(self, username: str, password: str, user_type: int) -> None:
        entry_data = {
            "username": username,
            "password": password,
            "user_type": user_type
        }        
        new_entry = Account(entry_data)
        try:
            self.session.add(new_entry)
            self.session.commit()  
        except:
            self.session.rollback()
            raise
    

    def update_account_password(self, username: str, new_password: str) -> Account:
        stmt = select(Account).where(Account.username == username)
        account = self.session.scalar(stmt)
        setattr(account, 'password', new_password)
        try:
            self.session.commit()
        except:
            self.session.rollback()
            raise

        return account  
    
    def session_commit(self) -> None:
        try:
            self.session.commit()
        except:
            self.session.rollback()
            raise