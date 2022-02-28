import { setCtrlBuild } from "./helper";
/* test for form parser
*
*   object
*   control builder
* */
export const SAMPLE = {
  id: 2,
  name: "rule 1",
  variables: [
    {
      name: "cities",
      type: "text list",
      value: ["paris"]
    },
    {
      name: "product_discount",
      type: "text",
      value: "-40%"
    },
    {
      name: "location",
      type: "text",
      value: "DisneyLand"
    }
  ],
  utm: [
    {
      name: "campaign_source",
      value: "newsletter"
    },
    {
      name: "campaign_medium",
      value: "banner"
    }
  ],
  url_pattern: "http://www.example.com/{city}/",
  meta: {
    kwds: "kwds rule",
    title: "lobortis varius est elit vitae orci",
    description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas volutpat tortor in ligula tincidunt mollis. Nullam tincidunt ipsum luctus metus tincidunt, eu porttitor purus fermentum. Aenean vel diam ut lorem tristique feugiat. Cras euismod at elit nec sollicitudin. Vivamus vulputate, odio sit amet sollicitudin fermentum, massa lectus pretium leo"
  },
  zones: [
    {
      rule:
                "Lorem ipsum dolor sit amet, {location} consectetur adipiscing elit.",
      type: "text",
      comment: "title",
      zone_id: "380fe372caff46e3894fef5cb2efa8b1"
    },
    {
      rule: {
        metas: {
          negative_tags: ["Nam tellus", "Maecenas"],
          positive_tags: ["Lorem ipsum", "malesuada"]
        },
        design: [
          {
            filter: "aspect_ratio",
            max_value: 0.75,
            min_value: 0.5
          },
          {
            filter: "width",
            max_value: 2000,
            min_value: 1000
          },
          {
            filter: "height",
            max_value: 1400,
            min_value: 900
          }
        ],
        sources: [1, 21]
      },
      type: "bank image",
      comment: "banner image",
      zone_id: "f4d85c1ab05a49c792859fbb978a8153"
    },
    {
      rule:
                "Neque porro quisquam est qui dolorem ipsum quia dolor {location} sit amet, consectetur, adipisci velit {product_discount}",
      type: "text",
      comment: "sub title",
      zone_id: "11cf355d1c2542b08e5555451397f668"
    },
    {
      rule:
                "Lorem ipsum dolor sit amet, {product_discount} consectetur adipiscing elit. Sed accumsan euismod condimentum. Fusce at lectus placerat, posuere sem ac, consectetur neque. Sed non semper ipsum. ",
      type: "text",
      comment: "description",
      zone_id: "4ac1974ada9643ff80500c8705875a18"
    },
    {
      rule: {
        filters: [
          {
            type: "numeric",
            max_value: 15,
            min_value: 3,
            filter_name: "age"
          },
          {
            type: "text",
            value: "paris",
            filter_name: "city"
          }
        ],
        sources: [23, 5]
      },
      type: "product",
      comment: null,
      zone_id: "4546cfba111841d586ae6ed66bfb9417",
      aggregate: true,
      sub_zones: [
        {
          rule: "consectetur adipiscing elit {location}",
          type: "text",
          comment: "product title",
          zone_id: "dda87d0ff6174a8fbe39269d4f84bce0"
        },
        {
          rule: {
            optimize_sequence: true,
            height: 300,
            width: 400
          },
          type: "product image",
          comment: "product image",
          zone_id: "620c8fba586c43e9a1d162021267ea2f"
        },
        {
          rule:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim tincidunt urna. Pellentesque tristique odio lorem, at consectetur ante tincidunt vitae. Nunc dignissim magna id felis bibendum, ac vestibulum ante.",
          type: "text",
          comment: "product description",
          zone_id: "0b5ebeaf4af340439cbd13c29f4de3fb"
        }
      ]
    },
    {
      rule: {
        filters: [
          {
            type: "numeric",
            max_value: 25,
            min_value: 15,
            filter_name: "age"
          },
          {
            type: "text",
            value: "paris",
            filter_name: "city"
          }
        ],
        sources: [3, 39]
      },
      type: "product",
      comment: null,
      zone_id: "666f42386fe743e6979eea743c4e47e9",
      aggregate: true,
      sub_zones: [
        {
          rule: "Pellentesque tristique odio lorem at consectetur",
          type: "text",
          comment: "product title",
          zone_id: "76760c32061042b5b8cc5872c2d1bc15"
        },
        {
          rule: {
            optimize_sequence: true,
            height: 200,
            width: 200
          },
          type: "image",
          comment: "product image",
          zone_id: "d80946b97ab34a2688ee1be598a040d0"
        },
        {
          rule:
                        "Aenean vel diam ut lorem tristique feugiat. Cras euismod at elit nec sollicitudin. Vivamus vulputate, odio sit amet sollicitudin fermentum, massa lectus pretium leo, lobortis varius est elit vitae orci.",
          type: "text",
          comment: "product description",
          zone_id: "7c35dd6904c54f2ca5565663b7fc0016"
        }
      ]
    }
  ],
  creation_date: "2020-09-03T00:00:00Z",
  modification_date: "2020-09-03T00:00:00Z",
  template_id: 2,
  status: "in_progress"
};
export const SAMPLE_B = {
  list: [
    {
      test: 1,
      temp: {
        nested: "nested"
      }
    }
  ],
  id: 1,
  name: {
    name_id: {
      value: 1,
      test: {
        name: "toto",
        test_value: [""]
      },
      data: [
        {
          prop: "test"
        }
      ]
    },
    name_list: ["a", "b"]
  }
};

export const SAMPLE_C = {
  list: [
    {
      test: 1,
      temp: {
        nested: "nested"
      }
    }
  ],
  id: 1,
  name: {

    name_id: {
      value: 1,
      test: {
        name: "toto"
      }
    }
  }
};
export const SAMPLE_Z = setCtrlBuild(
  setCtrlBuild(
    {
      id: setCtrlBuild(1, ["required"], 1),
      list: setCtrlBuild(
        [
          2,
          setCtrlBuild({
            nest: setCtrlBuild(
              [
                setCtrlBuild({ test: "est" }, ["required"], { test: "est" })
              ],
              [],
              [{ test: "est" }]
            )
          }, [], {
            nest: [{ test: "est" }]
          })
        ],
        ["required"],
        [2, {
          nest: [{ test: "est" }]
        }]
      )

    },
    [],
    {
      id: 1,
      list: [2]
    }
  ),
  [],
  {
    id: 1,
    list: [2, {
      nest: "nest"
    }]
  }
);
