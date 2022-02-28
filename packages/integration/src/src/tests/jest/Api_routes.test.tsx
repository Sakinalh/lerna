// import { Score } from "@material-ui/icons";
// import * as React from "react";
// import { queryParamFormater, replacePathParameter, bodyParamsFormater } from "src/api/accessors/queryGenerator";
// import { PAGE_EDIT_ZONE_REPLACE_PRODUCT, PAGE_GEN_RULES } from "src/api/routes/api_routes";

// const API_ROOT = "https://staging-api.naister.com/"

// const frisby = require("frisby");
// const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions
// let token;

// function getHeaders() {
//   return {
//     headers: {
//       Authorization: Buffer.from(token),
//       "Content-Type": "application/json",
//     },
//   };
// }

// describe("test api routes", () => {
//   it(`POST ${API_ROOT}api/accounts/token/`, function () {
//     const payload = {
//       email: "tim@sperone.com",
//       password: "naister_naister",
//     };

//     const result = Joi.object({
//       access_token: Joi.string().required(),
//       expires: Joi.string().required(),
//       user_id: Joi.number().required(),
//       username: Joi.string().required(),
//       business_id: Joi.number().required(),
//       is_admin: Joi.boolean().required(),
//       access_token_type: Joi.string().required(),
//     });

//     return frisby
//       .post(`${API_ROOT}api/accounts/token/`, payload)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result)
//       .then(function (res) {
//         token = Buffer.from(
//           res._json.access_token_type + " " + res._json.access_token
//         );
//       });
//   });

//   it(`GET ${API_ROOT}api/core/templates/`, function () {
//     const result2 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null).required(),
//       previous: Joi.string().allow(null).required(),
//       results: Joi.array().items(
//         Joi.object({
//           id: Joi.number(),
//           name: Joi.string(),
//           html: Joi.string(),
//           zones: Joi.array().items(
//             Joi.object({
//               rule: Joi.string(),
//               type: Joi.string(),
//               comment: Joi.string(),
//               zone_id: Joi.string(),

//               sub_zones: Joi.array().items(
//                 Joi.object({
//                   rule: Joi.string(),
//                   type: Joi.string(),
//                   comment: Joi.string(),
//                   zone_id: Joi.string(),
//                 })
//               ),
//             })
//           ),
//           url: Joi.string(),
//           creation_date: Joi.string(),
//           modification_date: Joi.string(),
//           rules: Joi.array().items(
//             Joi.object({
//               rule_id: Joi.number(),
//               rule_name: Joi.string(),
//             })
//           ),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(`${API_ROOT}api/core/templates/`)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result2)
//       .then(function (res) { });
//   });

//   it(`GET ${API_ROOT}api/core/templates/{id}`, function () {
//     const params = {id : 15};
//     const result3 = Joi.object({
//       id: Joi.number(),
//       name: Joi.string(),
//       zones: Joi.array().items(
//         Joi.object({
//           rule: Joi.string().allow(null).required(),
//           type: Joi.string(),
//           comment: Joi.string().allow(null).required(),
//           zone_id: Joi.string(),

//           sub_zones: Joi.array().items(
//             Joi.object({
//               rule: Joi.string().allow(null).required(),
//               type: Joi.string(),
//               comment: Joi.string().allow(null).required(),
//               zone_id: Joi.string(),
//             })
//           ),
//         })
//       ),
//       creation_date: Joi.date(),
//       modification_date: Joi.date(),
//       url: Joi.string(),
//       rules: Joi.array().items(
//         Joi.object({
//           rule_id: Joi.number(),
//           rule_name: Joi.string(),
//         })
//       ),
//       cached_temp_rule_id: Joi.string(),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(replacePathParameter(`${API_ROOT}api/core/templates/:id/`, params))
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result3)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/rules/`, function () {
//     const result4 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           processed_pages: Joi.string(),
//           total_pages: Joi.string(),
//           id: Joi.number(),
//           creation_date: Joi.string(),
//           template_id: Joi.number(),
//           status: Joi.string(),
//           name: Joi.string(),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(`${API_ROOT}api/core/rules/`)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result4)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/rules/{id}`, function () {
//     const params = {id: 162};
//     const result5 = Joi.object({
//       processed_pages: Joi.string(),
//       total_pages: Joi.string(),
//       id: Joi.number(),
//       creation_date: Joi.string(),
//       template_id: Joi.number(),
//       status: Joi.string(),
//       name: Joi.string(),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(replacePathParameter(`${API_ROOT}api/core/rules/:id/`, params))
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result5)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   // it("GET ​/api​/core​/rules​/zones​/proposals​/", function () {
//   //   const payload = {
//   //     rule_id: 163,
//   //     page_id: "63cf0246-6a8c-4c3a-ad96-8d0d204b827c",
//   //     zone_id: "2c340fca-628f-42f6-a753-2a28516f0ce7",
//   //   };
//   //   const result6 = Joi.object({
//   //     count: Joi.number(),
//   //     next: Joi.string().allow(null),
//   //     previous: Joi.string().allow(null),
//   //     results: Joi.array().items(
//   //       Joi.object({
//   //         zone_id: Joi.string(),
//   //         zone_type: Joi.string(),
//   //         data_type: Joi.date().allow(null),
//   //         comment: Joi.string().allow(null),
//   //         score: Joi.number(),
//   //         sub_zones: Joi.array().items(
//   //           Joi.object({
//   //             zone_id: Joi.string(),
//   //             zone_type: Joi.string(),
//   //             data_type: Joi.string(),
//   //             comment: Joi.string(),
//   //             zone_value: Joi.array().items(Joi.string()),
//   //             sub_zones: Joi.array(),
//   //             score: Joi.number(),
//   //           })
//   //         ),
//   //       })
//   //     ),
//   //   });

//   //   return frisby
//   //     .setup({
//   //       request: getHeaders(),
//   //     })
//   //     .get(
//   //       `https://staging-api.naister.com/api/core/rules/zones/proposals/?rule_id=${payload.rule_id}&page_id=${payload.page_id}&zone_id=${payload.zone_id}`
//   //     )
//   //     .expect("status", 404)
//   //     .expect("jsonTypesStrict", "", result6)
//   //     .then(function (res) {
//   //       // console.log(res);
//   //     });
//   // });

//   it(`GET ${API_ROOT}api/core/rules/{rule_id}/pages/`, function () {
//     const params = {
//       rule_id: 163,
//     };
//     const result7 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           keyword_id: Joi.string(),
//           keyword_name: Joi.string(),
//           pages: Joi.array().items(
//             Joi.object({
//               page_id: Joi.string(),
//               page_name: Joi.string(),
//               zones: Joi.array().items({
//                 zone_id: Joi.string(),
//                 zone_type: Joi.string(),
//                 data_type: Joi.string(),
//                 score: Joi.string(),
//                 sub_zones: Joi.array().items(
//                   Joi.object({
//                     zone_id: Joi.string(),
//                     zone_type: Joi.string(),
//                     data_type: Joi.string(),
//                     score: Joi.string(),
//                     sub_zones: Joi.array().items(Joi.object()),
//                   })
//                 ),
//               }),
//             })
//           ),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         replacePathParameter(`${API_ROOT}api/core/rules/:rule_id/pages/`, params)
//       )
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result7)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/rules/{id}/campaigns/`, function () {
//     const params = {
//       id: 163,
//     };

//     const query = {
//       limit: 5,
//       offset: 5
//     };
//     const result8 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items({
//         id: Joi.number(),
//         total_pages: Joi.number(),
//         name: Joi.string(),
//         processed_pages: Joi.number(),
//         status: Joi.string(),
//       }),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         replacePathParameter(`${API_ROOT}api/core/rules/:id/campaigns/`, params) + "?" + queryParamFormater(query)
//       )
//       .inspectRequest()
//       .inspectBody()
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result8)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}/api/core/rules/{rule_id}/campaigns/{cp_id}/keywords-summary/`, function () {
//     const params = {
//       rule_id: 163,
//       cp_id: 12703975671,
//     };
//     const result9 = Joi.array().items({
//       name: Joi.string(),
//       keyword_count: Joi.number(),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         replacePathParameter(`${API_ROOT}api/core/rules/:rule_id/campaigns/:cp_id/keywords-summary/`, params )
//       )
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result9)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}/api/core/rules/{rule_id}/campaigns/{cp_id}/categories/{category}/keywords/`, function () {
//     const params = {
//       rule_id: 163,
//       cp_id: 12703975671,
//       category: "pending",

//     };

//     const query = {
//       limit: 5,
//       offset: 5,
//     }

//     const result10 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           id: Joi.number(),
//           template_id: Joi.number().allow(null),
//           category: Joi.string(),
//           kwd_text: Joi.string(),
//           total_pages: Joi.number(),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         replacePathParameter(`${API_ROOT}api/core/rules/:rule_id/campaigns/:cp_id/categories/:category/keywords/`, params) + "?" +   queryParamFormater(query)
//       )
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result10)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/rules/{rule_id}/keywords/{keyword_id}/pages/`, function () {
//     const params = {
//       rule_id: 163,
//       keyword_id: 12703975671,
//     };
//     const result11 = Joi.array().items(
//       Joi.object({
//         title: Joi.string(),
//         score: Joi.string(),
//         preview_url: Joi.string(),
//         page_id: Joi.string(),
//         status: Joi.string(),
//         zones: Joi.array().items(
//           Joi.object({
//             id: Joi.string(),
//             score: Joi.string(),
//             type: Joi.string(),
//             name: Joi.string(),
//             content: Joi.string(),
//           })
//         ),
//       })
//     );

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         replacePathParameter(`${API_ROOT}api/core/rules/:rule_id/keywords/:keyword_id/pages/`, params)
//       )
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result11)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ​${API_ROOT}api​/core​/rules​/get-zone-products​/ wrong zone type`, function () {
//     const query = queryParamFormater( {
//       page_id : "41d5f0a0-ea91-4786-82ad-c02bb476300d#location-porto-vecchio-8-personnes/tmp2/958139_1.html",
//       zone_id : "63cf0246-6a8c-4c3a-ad96-8d0d204b827c",
//       keyword_id : "12703975671",
//       rule_id : "163",
//       limit : "5",
//       offset : "5",
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         `${API_ROOT}api/core/rules/get-zone-products/?${query}`
//       )
//       .expect("status", 500)

//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ​${API_ROOT}/api​/core​/rules​/get-zone-products​/`, function () {
//     const query = queryParamFormater({
//       keyword_id: 958139,
//       rule_id: 164,
//       zone_id: "63cf0246-6a8c-4c3a-ad96-8d0d204b827c",
//       page_id: "41d5f0a0-ea91-4786-82ad-c02bb476300d#location-porto-vecchio-8-personnes/tmp2/958139_0.html",

//     });

//     const result14 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       products: Joi.array().items(
//         Joi.object({
//           name: Joi.string(),
//           score: Joi.number(),
//           title: Joi.string(),
//           description: Joi.string(),
//           price: Joi.number(),
//           currency: Joi.string(),
//           id: Joi.string(),
//           neo_id: Joi.number(),
//           image: Joi.string(),
//           zone_id: Joi.string(),
//           is_active: Joi.string(),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
      
//       .get(`${API_ROOT}api/core/rules/get-zone-products/?${query}`)
//       .inspectRequest()
//       .inspectBody()
//       .inspectStatus()

//       //.expect("status", 200)
//       //.expect("jsonTypesStrict", "", result14)
//       .then(function (res) {
//         //console.log(res);
//       });
//   });

//   // it(`GET ${API_ROOT}/api/core/rules/zones/get-text-content/`, function () {
//   //   const query = queryParamFormater({ 
//   //     rule_id: 163,
//   //     keyword_id: 12703975671,
//   //     page_id:
//   //       "41d5f0a0-ea91-4786-82ad-c02bb476300d%23location-porto-vecchio-8-personnes%2Ftmp2%2F958139_0.html",
//   //     zone_id: "2c340fca-628f-42f6-a753-2a28516f0ce7",
//   //     limit: 5,
//   //     offset: 5,
//   //   });

//   //   const result15 = Joi.object({
//   //     text_value: Joi.string().allow(""),
//   //     zone_id: Joi.string().allow(""),
//   //   });

//   //   return frisby
//   //     .setup({
//   //       request: getHeaders(),
//   //     })
//   //     .get(
//   //       `${API_ROOT}api/core/rules/zones/get-text-content/?${query}`
//   //     )
//   //     .expect("status", 200)
//   //     .expect("jsonTypesStrict", "", result15)
//   //     .then(function (res) {
//   //       // console.log(res);
//   //     });
//   // });

//   it(`GET ${API_ROOT}api/core/image-banks/`, function () {
//     const result16 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           id: Joi.number(),
//           imgb_path: Joi.string(),
//           name: Joi.string(),
//           neo_id: Joi.string(),
//           delimiter: Joi.string(),
//           creation_date: Joi.string(),
//           modification_date: Joi.string(),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(`${API_ROOT}api/core/image-banks/`)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result16)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/catalogs/`, function () {
//     const result17 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           name: Joi.string(),
//           number_products: Joi.number(),
//           processed_products: Joi.number(),
//           catalog_file: Joi.string(),
//           creation_date: Joi.string(),
//           last_update: Joi.string(),
//           status: Joi.string(),
//           delimiter: Joi.string(),
//           fields: Joi.object({
//             custom: Joi.array(),
//             default: Joi.array().items(
//               "Pk",
//               "availability",
//               "bid",
//               "bid_cid",
//               "bid_type_parentId",
//               "cid",
//               "custom_label_0",
//               "custom_label_1",
//               "custom_label_2",
//               "custom_label_3",
//               "description",
//               "id",
//               "last_updated",
//               "link",
//               "title",
//               "image_link",
//               "additional_image_link"
//             ),
//             pricing: Joi.array().items("price"),
//             location: Joi.array().items("city"),
//             characteristics: Joi.array().items("condition"),
//           }),
//           id: Joi.number(),
//         })
//       ),
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(`${API_ROOT}api/core/catalogs/`)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result17)
//       .then(function (res) {
//         // console.log("cata",res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/catalogs/get-columns-values/`, function () {
//     const result18 = Joi.array().items(Joi.string());

//     const query = queryParamFormater({ 
//       "catalog-ids": "187",
//       "column-name": "description"
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get(
//         `${API_ROOT}api/core/catalogs/get-columns-values/?${query}`
//       )
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", result18)
//       .then(function (res) {
//         // console.log(res);
//       });
//   });

//   it(`GET ${API_ROOT}api/core/rules/get-text-proposals`, function () {
//     const result19 = Joi.object({
//       count: Joi.number(),
//       next: Joi.string().allow(null),
//       previous: Joi.string().allow(null),
//       results: Joi.array().items(
//         Joi.object({
//           zone_id: Joi.string(),
//           data_type: Joi.string(),
//           zone_value: Joi.string(),
//           score: Joi.number(),
//           content_id: Joi.string()
//         })
//       )

//     });

//     const query = queryParamFormater({ 
//       rule_id: "164",
//       page_id: "41d5f0a0-ea91-4786-82ad-c02bb476300d%23location-porto-vecchio-8-personnes%2Ftmp2%2F958139_0.html",
//       zone_id: "2c340fca-628f-42f6-a753-2a28516f0ce7",
//       keyword_id: "958139",
//       limit: "3",
//       offset: "0"
//     });

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .get( `${API_ROOT}api/core/rules/get-text-proposals/?${query}`
//       )
//       .expect("status", 200)
//       //.expect("jsonTypesStrict", "", result19)
//       .then(function (res) {
//         // console.log(res, "restest")
//       });
//   });


//   // it("GET /api/core/catalogs/get-filters/", function () {
//   //   const result19 = Joi.object({

//   //       default: Joi.array(),
//   //       pricing: Joi.array(),
//   //       locale: Joi.array(),
//   //       characteristics: Joi.array(),
//   //       custom labels: Joi.array()

//   //   });

//   //   const payload = {
//   //     catalog_ids: "187",
//   //   };

//   //   return frisby
//   //     .setup({
//   //       request: getHeaders(),
//   //     })
//   //     .get(
//   //       `https://staging-api.naister.com/api/core/catalogs/get-filters/?catalog-ids=${payload.catalog_ids}`
//   //     )
//   //     .expect("status", 200)
//   //     .expect("jsonTypesStrict", "", result19)
//   //     .then(function (res) {
//   //       console.log(res);
//   //     });
//   // });



//   /**
//    * REPLACE PRODUCT ENDPOINT
//    */
  
//   // it(`POST ${API_ROOT + PAGE_EDIT_ZONE_REPLACE_PRODUCT}`, function () {

//   //   const payload = {
//   //     current_product_id: "6ef59ca6-7ad2-4f77-bb65-1c82d3f470df",
//   //     keyword_id: 958680,
//   //     new_product_id: "6ef59ca6-7ad2-4f77-bb65-1c82d3f470df",
//   //     page_id: "41d5f0a0-ea91-4786-82ad-c02bb476300d#location-corse-7-chambres/tmp2/958680_0.html",
//   //     rule_id: 164,
//   //     zone_id: "63cf0246-6a8c-4c3a-ad96-8d0d204b827c"
//   //   }
    
//   //   const response = "Product replaced successfully";

//   //   return frisby
//   //     .setup({
//   //       request: getHeaders(),
//   //     })
//   //     .post(`${API_ROOT}api/core/rules/replace-product/`, payload)
//   //     .expect("status", 200)
//   //     .expect("jsonTypesStrict", "", response)
//   // });




//   /**
//    * ADD PRODUCT ENDPOINT
//    */
  
//   it(`POST api/core/rules/add-products/`, function () {

//     const payload = {
//       "page_id": "250194f5-0199-4d12-af4d-7fdbb580a62d#location-bonifacio-vue-mer/tmp1/564338_0.html",
//       "keyword_id": 564338,
//       "products": [
//         {content_id: "17b6a2cd-9628-4b54-9871-aafd5d2b0213", zone_id: "63cf0246-6a8c-4c3a-ad96-8d0d204b827c"}
//       ]
//     }

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .post(`${API_ROOT}api/core/rules/add-products/`, payload)
//       .expect("status", 200)
//       .expect("json", { Success: 'The product(s) added' })
//   });

//     /**
//    *  EDIT TXT ENDPOINT
//    */

//   it(`POST ${API_ROOT + PAGE_EDIT_ZONE_REPLACE_PRODUCT}`, function () {

//     const payload =   {
//       page_id : "250194f5-0199-4d12-af4d-7fdbb580a62d#location-corse-3-chambres/tmp1/958647_0.html",
//       keyword_id : "958647",
//       update: {
//         content_id : "",
//         score: 0,
//         type: "text",
//         value: "test",
//         zone_id: "2c340fca-628f-42f6-a753-2a28516f0ce7"
//       }
//     }
    
//     const response = "page updated with the new text";

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .post(`${API_ROOT}api/core/rules/update-content/`, payload)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", response)
//   });

//     /**
//    *  EDIT TXT ENDPOINT
//    */

//   it(`POST ${API_ROOT + PAGE_EDIT_ZONE_REPLACE_PRODUCT}`, function () {

//     const payload =   {
//       page_id : "250194f5-0199-4d12-af4d-7fdbb580a62d#location-corse-3-chambres/tmp1/958647_0.html",
//       keyword_id : "958647",
//       update: {
//         content_id : "",
//         score: 0,
//         type: "text",
//         value: "test",
//         zone_id: "2c340fca-628f-42f6-a753-2a28516f0ce7"
//       }
//     }
    
//     const response = "page updated with the new text";

//     return frisby
//       .setup({
//         request: getHeaders(),
//       })
//       .post(`${API_ROOT}api/core/rules/update-content/`, payload)
//       .expect("status", 200)
//       .expect("jsonTypesStrict", "", response)
//   });

  
// });
