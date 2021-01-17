-- select * from public."customer";
-- select * from public."operator";
-- select * from public."trailer";
-- select * from public."trip";
-- select * from public."user";
-- select * from public."vehicle";

select
	t."id" as "Identificador de Viaje"
,	t."createdAt" as "Fecha de Inicio"
,	t."isCompleted" as "Finalizado"
, 	c."name" as "Cliente"
,	CONCAT(o."name", ' ', o."lastName") as "Nombre de Operario"
,	v."name" as "Unidad"
,	tr."name" as "Remolque"
from public."trip" as t
left join public."customer" as c on t."customerId"=c."id"
left join public."operator" as o on t."operatorId"=o."id"
left join public."vehicle" as v on t."vehicleId"=v."id"
left join public."trailer" as tr on v."trailerId"=tr."id";