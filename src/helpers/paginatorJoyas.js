


export const pagination = (data, items, page ) => {//data me trae todos los viajes de la base de datos
    // convierto los parámetros de la página y los elementos a números
  const pageInt = Number(page);
  const itemsInt = Number(items);

  // se calculan los índices de inicio y fin para la porción de datos paginada
  const startIndex = (pageInt - 1) * itemsInt;
  const endIndex = pageInt * itemsInt;

  // guardo el resultado en un objeto
  const results = {};//el objeto es mutable, puedo alterar

  // valido si hay una página siguiente y agrego la info
  if (endIndex < data.length) {//fin (pagina siguiente)
    results.next = {
      page: pageInt + 1,
      items: itemsInt,
    };
  }

 // valido si hay una página anterior y agrego la info
  if (startIndex > 0) {//inicio(pagina anterior)
    results.previous = {
      page: pageInt - 1,
      items: itemsInt,
    };
  }
  
   // agrego la porción paginada de los datos a los resultados
   //console.log("slice mensaje",data.slice(0, 1))
  results.results = data.slice(startIndex, endIndex);//se parte el array en next, previous(paginaanterior y siguiente)
/*   console.log("results", results);
  console.log("data", data);
  console.log("startIndex", startIndex);
  console.log("endIndex", endIndex); */
  //el metodo slice devuelve un objeto y lo fracciona
  return results;
};


