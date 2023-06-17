/*
8----------------------------------------------------------------------------------*/

UPDATE profesores p SET statusp = 'R', fechaegr = '2023-03-31' 
WHERE (SELECT COUNT(*) FROM secciones s
	   WHERE s.lapso = '252023' AND p.cedulaprof = s.cedulaprof) = 0;
--------------------------------------------------------------------------------------