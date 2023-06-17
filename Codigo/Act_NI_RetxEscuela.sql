/*
 4----------------------------------------------------------------------------------*/
SELECT
    esc.codescuela,
    esc.nombreesc,
    COUNT(
        CASE
            WHEN est.statusest = 'Activo' THEN 1
        END
    ) AS Cant_Activos,
    COUNT(
        CASE
            WHEN est.statusest = 'No Inscrito' THEN 1
        END
    ) AS Cant_NoInscritos,
    COUNT(
        CASE
            WHEN est.statusest = 'Retirado' THEN 1
        END
    ) AS Cant_Retirado,
    COUNT(est.statusest) AS Cant_Total
FROM
    escuela esc,
    estudiantes est
WHERE
    esc.codescuela = est.codescuela
    AND est.statusest IN ('Activo', 'No Inscrito', 'Retirado')
GROUP BY
    esc.codescuela
ORDER BY
    Cant_Total DESC;

--------------------------------------------------------------------------------------
SELECT
    esc.codescuela,
    esc.nombreesc,
    COUNT(*) FILTER (
        WHERE
            est.statusest = 'Activo'
    ) AS Cant_Activos,
    COUNT(*) FILTER (
        WHERE
            est.statusest = 'No Inscrito'
    ) AS Cant_NoInscritos,
    COUNT(*) FILTER (
        WHERE
            est.statusest = 'Retirado'
    ) AS Cant_Retirado,
    COUNT(est.statusest) AS Cant_Total
FROM
    escuela esc
    INNER JOIN estudiantes est USING (codescuela)
WHERE
    est.statusest IN ('Activo', 'No Inscrito', 'Retirado')
GROUP BY
    esc.codescuela
ORDER BY
    Cant_Total DESC;