CREATE TABLE pessoa (
    id uuid primary key,
    apelido varchar(32) not null,
    nome varchar(100) not null,
    nascimento varchar(10) not null,
    stack JSON
);


CREATE TABLE search_index_stack_pessoa(
  	id serial primary key,
    id_pessoa uuid references pessoa(id) not null,
    stack_item varchar(32)
);

CREATE FUNCTION after_create_person_do() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('pessoa__created', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_create_person
AFTER INSERT ON pessoa
FOR EACH ROW
EXECUTE FUNCTION after_create_person_do();