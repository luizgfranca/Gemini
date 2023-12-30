CREATE TABLE pessoa (
    id uuid primary key,
    apelido varchar(32),
    nome varchar(100),
    nascimento varchar(10),
    stack JSON
);


CREATE TABLE search_index_stack_pessoa(
    id_pessoa uuid references pessoa(id),
    stack_item varchar(32)
);

CREATE FUNCTION after_create_person_do() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('insert_completed', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_create_person
AFTER INSERT ON pessoa
FOR EACH ROW
EXECUTE FUNCTION after_create_person_do();