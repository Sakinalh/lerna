import { rest } from "msw"; // msw supports graphql too!

export const handlers = [

  rest.get("http://ec2-52-16-58-180.eu-west-1.compute.amazonaws.com:8000/api/channel/projects/0/adgroups/", async (req, res, ctx) => res(
    ctx.json({
      results: ["a", "b"],
      next: null,
      previous: null,
      count: 2
    })
  ))

];
