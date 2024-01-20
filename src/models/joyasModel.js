
import pool from "../../db/ConectionDb.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js"; 
 

export const getJoyas = async () => {
  const SQLquery = { text: "SELECT * FROM inventario" };
  const response = await pool.query(SQLquery);
  return response.rows;
};

// para liimitar las cantidad de reagistros que se muestran basta con recibir este campo por query params
// se agrega un parametro por defecto en caso de que no se reciba nada
export const getLimitjoyas = async (limits = 4) => {
    const SQLquery = {
      text: "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    
      values: [limits],
    };
    const response = await pool.query(SQLquery);
    return response.rows;
  };

  // comienza el uso de pg format

export const orderAndLimitjoya = async (
    order_by = "stock_ASC",
    limits = 3,
    page = 0
  ) => {
    // Desestructura el parámetro order_by en attribute y direction
    const [attribute, direction] = order_by.split("_");//el metodo split separa el atributo y la dirección(id y ASC)
    //el split devuelve un arreglo con el atributo y la dirección.
  
    // Calcula el desplazamiento en función de la página y los límites
    const offset = page * limits;
  
    // Formatea la consulta con los parámetros proporcionados
    const formattedQuery = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      attribute,
      direction,
      limits,
      offset
    );
    // Muestra la consulta formateada en la consola
    console.log("query: ", formattedQuery);
    // Realiza la consulta a la base de datos utilizando la consulta formateada
    const response = await pool.query(formattedQuery);
    // Muestra la respuesta en la consola
    console.log("response", response);
    // Devuelve las filas de la respuesta
    return response.rows;
  }


  //HATEOAS

   export const getModeljoyasWithHateoas = async (req, res) => {
    //export const getModeljoyasWithHateoas = async (order_by, limits, page) => {
    const allJoyas = await getJoyas();
   //const joyasHateoas= await orderAndLimitjoya(order_by, limits, page)
    res.status(200).json({ joyas: allJoyas });
    //res.status(200).json({ joyas: joyasHateoas });
   }

   // get por ID

   export const joyasById = async (id) => {
    const SQLquery = {
      text: "SELECT * FROM inventario WHERE id = $1",
      values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  }


  //creando filtros dinamicos por parametro

  export const getModeljoyaswithFilter = async (filters) => {
    
//    console.log("prueba funcion",createQuery("inventario", filters))
   
    const {query, values} = await createQuery("inventario", filters);
   //const values = createQuery("inventario", filters);
    
   // console.log("resultado query de prueba",query);
   // console.log("resultado  prueba", values);
    const result = await pool.query(query, values)
   
    //console.log("result",result)
    return result.rows;
  };
  
    

