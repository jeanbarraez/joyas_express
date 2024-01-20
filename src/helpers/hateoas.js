export const prepareHateoas = async (entity, data) => {
   // const cantidad = data.length;
    const results = data
      .map((v) => {
        return {
          nombre: v.metal,
          link:[{
          href: `http://localhost:5000/api/v1/${entity}/${v.id}`,
          }]
        };
      })
      .slice(0, 3);
      //.slice(0, cantidad);

   // const total = cantidad;// data.length;
    const total = data.length;
    
    const HATEOAS = {
      total,
      results,
    };
    return HATEOAS;
  };
  
