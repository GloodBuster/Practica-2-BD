/*
 2----------------------------------------------------------------------------------*/
SELECT
    cedulaprof,
    nombrep,
    fechaing
FROM profesores
WHERE
    dedicacion = 'MT'
    AND categoria = 'I'
    AND fechaing BETWEEN '2022-01-01'
    AND '2022-12-31'
ORDER BY
    fechaing ASC,
    nombrep ASC;
--------------------------------------------------------------------------------------
SELECT
    cedulaprof,
    nombrep,
    fechaing
FROM profesores
WHERE
    dedicacion = 'MT'
    AND categoria = 'I'
    AND EXTRACT(YEAR FROM fechaing) = (EXTRACT(YEAR FROM CURRENT_DATE) - 1)
ORDER BY
    fechaing ASC,
    nombrep ASC;