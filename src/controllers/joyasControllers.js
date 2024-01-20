
import {
    
  getJoyas,
  getLimitjoyas,
  joyasById,
  orderAndLimitjoya,
  getModeljoyaswithFilter,

    
  } from "../models/joyasModel.js";
import { findError } from "../utils/util.js";
import { pagination } from "../helpers/paginatorJoyas.js";
import {prepareHateoas} from "../helpers/hateoas.js"
export const getAllJoyas = async (req, res) => {
    try {
      const joyas = await getJoyas();
      res.status(200).json({ joyas: joyas });
    } catch (error) {
      console.log(error);
      const errorFound = findError(error.code);
      return res
        .status(errorFound[0]?.status)
        .json({ error: errorFound[0]?.message });
    }
  };

  export const getJoyasLimit = async (req, res) => {
    try {
     // console.log("req.query", req.query);
      //console.log("req.params", req.params);
      const { limit } = req.query;
      const joyas = await getLimitjoyas(limit);
      res.status(200).json({ joyas: joyas });
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code);
        return res
          .status(errorFound[0]?.status)
          .json({ error: errorFound[0]?.message });
      }
      //console.log("error", error);
      //console.log("error.code", error.code);
     
    }

   export  const getOrderAndLimitjoya = async (req, res) => {
        try {
          // Extrae los parámetros de orden, límite y página de la solicitud HTTP
          const { order_by, limit, page } = req.query;
          //console.log("req.query", req.query);
          // Llama a la función orderAndLimitTravels con los parámetros extraídos
          const joyas = await orderAndLimitjoya(order_by, limit, page);
          // Establece el estado de la respuesta en 200 (OK)
          res.status(200).json({ joyas: joyas });
        } catch (error) {
          // Si ocurre un error, lo muestra en la consola y devuelve una respuesta con un código de error y un mensaje de error
          console.log("error", error);
          const errorFound = findError(error.code);
          return res
            .status(errorFound[0].status)
            .json({ error: errorFound[0].message });
        }
      }
             //paginacion
             export const joyasWithPagination = async (req, res) => {
              try {
                const { items, page } = req.query;
                //console.log("req.query", req.query);
                const joyas = await getJoyas();
                const ispage = /^[0-9]+$/.test(page);
                if (!ispage) {
                  return res
                 .status(400)
                 .json({ error: "El parámetro page debe ser un número" });
                }
                const paginationData = pagination(joyas, items, page);
                res.status(200).json(paginationData);
              } catch (error) {
                console.log("error", error);
                const errorFound = findError(error.code);
                return res
                  .status(errorFound[0].status)
                  .json({ error: errorFound[0].message });
              }
            };


            //HATEOAS

            export const getControllerjoyasWithHateoas = async (req, res) => {
              try {
             const joyas = await getJoyas();
             //const joyas = await orderAndLimitjoya(order_by, limits, page);
             
                const joyasWithHateoas = await prepareHateoas ("joyas", joyas);
                res.status(200).json({ joyas: joyasWithHateoas });
              } catch (error) {
                console.log("error", error);
              }
            }

            //get por ID

            export const getJoyasById = async (req, res) => {
              try {
                const { id } = req.params;
                const joyas = await joyasById(id);
                res.status(200).json({ joyas: joyas });
              } catch (error) {
                console.log("error", error);
              }
            }


       // creando filtros dinamicos por parametros

      export const filterControllerjoyas = async (req, res) => {
        try {
          const {items, page, filters} = req.body 
//console.log("req.body", req.body);
          const joyas = await getModeljoyaswithFilter(filters) 
         // console.log("joyas", joyas);
          const paginationData = pagination(joyas, items, page);
          res.status(200).json(paginationData);
        } catch (error) {
          console.log("error", error);
        }
      };


  