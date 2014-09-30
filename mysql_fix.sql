ALTER TABLE hospitals ADD CONSTRAINT HOSPITAL_TYPE_FK FOREIGN KEY 
foreign_key_name(hospital_type)
REFERENCES hospital_types(id) 
ON DELETE SET NULL; 
