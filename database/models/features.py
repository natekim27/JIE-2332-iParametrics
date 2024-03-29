from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from models.base import Base

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
   cwcs: Mapped[int]


   def as_dict(self):
      return {c.name: getattr(self, c.name) for c in self.__table__.columns}
  
   def __init__(self, dict):
       for key in dict:
           setattr(self, key, dict[key])

   def generate_cwcs_array_features(self):
      arr = []
      arr.append(self.gdp) if self.gdp else arr.append(0)
      arr.append(self.taxes) if self.taxes else arr.append(0)
      arr.append(self.population) if self.population else arr.append(0)
      arr.append(self.em_employment) if self.em_employment else arr.append(0)
      arr.append(self.high_comb_haz_res) if self.high_comb_haz_res else arr.append(0)
      arr.append(self.high_comb_haz_com) if self.high_comb_haz_com else arr.append(0)
      arr.append(self.college_univ) if self.college_univ else arr.append(0)
      arr.append(self.nri) if self.nri else arr.append(0)
      arr.append(self.avg_dem_pct) if self.avg_dem_pct else arr.append(0)
      arr.append(self.higher_ed) if self.higher_ed else arr.append(0)
      arr.append(self.avg_rep_pct) if self.avg_rep_pct else arr.append(0)
      arr.append(self.voter_turn) if self.voter_turn else arr.append(0)
      arr.append(self.broadband) if self.broadband else arr.append(0)
      return arr
      
