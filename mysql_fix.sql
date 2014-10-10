use lcs;

ALTER TABLE hospitals ADD CONSTRAINT HOSPITAL_TYPE_FK FOREIGN KEY 
foreign_key_name(hospital_type)
REFERENCES hospital_types(id);

insert into hospital_types(name,details) values('HOSPITAL','Hospital');
insert into hospital_types(name,details) values('CLINICA','Clinica');
insert into hospital_types(name,details) values('ATENCION_PRIMARIA','Unidad de atencion primaria');
