from typing import List
from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column



class Base(DeclarativeBase):
   pass


class Feature(Base):
   __tablename__ = "features"


   serial_number: Mapped[int] = mapped_column(primary_key=True)
   statefp: Mapped[int]
   countyfp: Mapped[int]
   geoid: Mapped[int]
   name: Mapped[str] = mapped_column(String(50), primary_key=True)
   namelsad: Mapped[str] = mapped_column(String(50), primary_key=True)
   stusps: Mapped[str] = mapped_column(String(50), primary_key=True)
   population: Mapped[int]
   gdp: Mapped[float]
   avg_dem_pct: Mapped[float]
   avg_rep_pct: Mapped[float]
   declarations: Mapped[int]
   hm: Mapped[float]
   pa: Mapped[float]
   hm_plan_type: Mapped[str] = mapped_column(String(50))
   hm_plan_status: Mapped[str] = mapped_column(String(50))
   nri: Mapped[float]
   cdc_svi: Mapped[float]
   hvri_sovi: Mapped[float]
   high_comb_haz_com: Mapped[float]
   high_comb_haz_res: Mapped[float]
   em_employment: Mapped[float]
   em_employment_per: Mapped[float]
   em_lq: Mapped[float]
   urban_rural: Mapped[str] = mapped_column(String(50))
   college_univ: Mapped[float]
   higher_ed: Mapped[float]
   broadband: Mapped[float]
   poverty: Mapped[float]
   health_insurance: Mapped[float]
   voter_turn: Mapped[float]
   pop_change: Mapped[float]
   income_stability: Mapped[float]
   built_environment: Mapped[float]
   bric_social: Mapped[float]
   bric_econ: Mapped[float]
   bric_house: Mapped[float]
   bric_community: Mapped[float]
   bric_institutional: Mapped[float]
   bric_environmental: Mapped[float]
   bric_resilience: Mapped[float]
   operating_ratio: Mapped[float]
   taxes: Mapped[float]
   cwcs: Mapped[float]


   def as_dict(self):
      return {c.name: getattr(self, c.name) for c in self.__table__.columns}
  
   def __init__(self, dict):
       for key in dict:
           setattr(self, key, dict[key])

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
