SELECT 
  "trip"."id" AS "trip_id"
, "trip"."createdAt" AS "trip_createdAt"
, "trip"."updatedAt" AS "trip_updatedAt"
, "t"."id" AS "t_id" 
FROM 
  "trip" "trip" 
INNER JOIN "customer" "t" ON "t"."id"="trip"."customerId"

-- Select one trip based on a condition
SELECT 
"trip"."id" AS "trip_id"
, "trip"."createdAt" AS "trip_createdAt"
, "trip"."updatedAt" AS "trip_updatedAt"
, "trip"."customerId" AS "trip_customerId"
, "c"."id" AS "c_id" 
FROM 
  "trip" "trip" 
INNER JOIN "customer" "c" ON "c"."id"="trip"."customerId" 
WHERE 
  "trip"."id" = $1

-- JOIN
SELECT 
  "trip"."id" AS "trip_id"
, "trip"."createdAt" AS "trip_createdAt"
, "trip"."updatedAt" AS "trip_updatedAt"
, "trip"."customerId" AS "trip_customerId"
, "trip"."operatorId" AS "trip_operatorId"
, "c"."id" AS "c_id" 
FROM "trip" "trip" 
INNER JOIN "customer" "c" ON "c"."id"="trip"."customerId"  
INNER JOIN "operator" "o" ON "o"."id"="trip"."operatorId"

