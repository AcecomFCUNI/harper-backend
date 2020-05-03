create table careers(id char(2) primary key, name varchar(50));

create table member_status(
  id_status serial primary key,
  name_status varchar(50)
);

create table data_area(
  code_area serial primary key,
  area_name varchar(50) not null,
  abstract text,
  image_url text
);

create table data_members(
  code char(9) primary key,
  names varchar(50) not null,
  first_last_name varchar(50) not null,
  second_last_name varchar(50) not null,
  career_id char(2) references careers(id),
  email varchar(50),
  phone char(9),
  image_url text,
  name_status int references member_status(id_status),
  has_key boolean,
  code_area int references data_area(code_area),
  birthday date
);

create table projects(
  id_project serial primary key,
  project_name varchar(50) not null,
  topic varchar(50)
);

create table project_members(
  code char(9) references data_members(code),
  id_project int references projects(id_project)
);

insert into
  careers
values
  ('N1', 'Física'),
  ('N2', 'Matemática'),
  ('N3', 'Química'),
  ('N4', 'Ingeniería Física'),
  ('N6', 'Ciencia de la Computación');

insert into
  member_status (name_status)
values
  ('Junta Directiva'),
  ('Regular'),
  ('Aspirante');

insert into
  data_members
values
  (
    '20190611K',
    'Pierre Adan Camilo',
    'Ruiz',
    'Rosas',
    'N6',
    'pierre_adan@hotmail.com',
    '991598415',
    null,
    1,
    true,
    null
  ),
  (
    '20162613B',
    'Diego',
    'Andrade',
    'Carril',
    'N6',
    'diegoandrade1698@gmail.com',
    '926451081',
    null,
    2,
    true,
    null
  ),
  (
    '20132097F',
    'Daniel Alfredo',
    'Hidalgo',
    'Chavez',
    'N6',
    'dhidalgoc@uni.pe',
    '941377122',
    null,
    2,
    true,
    null
  ),
  (
    '20144567B',
    'Ingrid Fransheska',
    'Ipanaque',
    'Casquina',
    'N6',
    'ingrid.ipanaque.casquina@gmail.com',
    '982057679',
    null,
    2,
    true,
    null
  ),
  (
    '20152231J',
    'Luis Leonardo',
    'Vasquez',
    'Espinoza',
    'N6',
    'luis.vasquez@uni.pe',
    '995399159',
    null,
    2,
    true,
    null
  ),
  (
    '20162665B',
    'Cristopher Sebastian',
    'Garcia',
    'Pacheco',
    'N6',
    'crisebas100@gmail.com',
    '967580758',
    null,
    1,
    true,
    null
  ),
  (
    '20180463I',
    'Carlos Enrique',
    'Moscol',
    'Durand',
    'N6',
    'carlonchito1505@gmail.com',
    '987862882',
    null,
    2,
    false,
    null
  ),
  (
    '20180517A',
    'Cristhian Wiki',
    'Sanchez',
    'Sauñe',
    'N6',
    'christiansanchezsaune@gmail.com',
    '924130271',
    null,
    2,
    false,
    null
  ),
  (
    '20180426F',
    'Edwin Cesar',
    'Yauyo',
    'Soto',
    'N6',
    'christiansanchezsaune@gmail.com',
    '924130271',
    null,
    2,
    false,
    null
  ),
  (
    '20152734A',
    'Nelson Steven',
    'Sanabio',
    'Maldonado',
    'N6',
    'nsanabiom@uni.pe',
    '991624039',
    null,
    2,
    true,
    null
  ),
  (
    '20170616G',
    'Nicolás Guillermo',
    'Rojas',
    'Minaya',
    'N2',
    'nrojasm@uni.pe',
    '956000304',
    null,
    2,
    false,
    null
  ),
  (
    '20132631B',
    'Jhon Alexander',
    'Rojas',
    'Isidro',
    'N6',
    'jhon.rojas.i@uni.pe',
    '961519118',
    null,
    2,
    true,
    null
  );

insert into
  data_area(area_name, abstract, image_url)
values
  ('Desarrollo Web', null, null),
  ('Inteligencia Artificial', null, null),
  ('Computación Gráfica', null, null),
  ('Seguridad Informática', null, null);
