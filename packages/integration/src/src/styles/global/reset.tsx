export const reset = {
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video": {
    margin: "0",
    padding: "0",
    border: "0",
    fontSize: "100%",
    font: "inherit",
    verticalAlign: "baseline"
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section": {
    display: "block"
  },
  body: { lineHeight: 1 },
  "ol, ul": { listStyle: "none" },
  "blockquote, q": { quotes: "none" },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: ["''", "none"]
  },

  table: { borderCollapse: "collapse", borderSpacing: "0" },

  html: { height: "100%", overflow: "hidden" },
  "#root, body": {
    height: "inherit",
    fontFamily: "Poppins, TeX Gyre Adventor, URW Gothic L, sans-serif",
    color: "black",
    backgroundColor: "white"
  },
  "#root": { display: "flex", flexDirection: "column" },
  "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover, select:-webkit-autofill:focus": {
    WebkitTextFillColor: "inherit",
    boxShadow: "none",
    WebkitBoxShadow: "none",
    transition: "background-color 5000s ease-in-out 0s"
  },

  ul: { padding: "0" },
  input: { borderWidth: "0", padding: "10px 0" },
  ":focus": { outline: "none" },
  "input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: "0"
  },
  "input[type=number]": { MozAppearance: "textfield" },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(385deg)" }
  },
  // inside the body element
  ".snap--helper": {
    zIndex: 999
  },
  "*::-webkit-scrollbar": {
    width: "10px"
  },
  "*::-webkit-scrollbar-track": {
    "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    border: "1px solid slategrey"
  },
  ".hide": { opacity: 0, pointerEvents: "none" },
  ".show": { opacity: 1 },
  ".remove": { display: "none" },
  ".place": { display: "block" },
  ".capitalizeFirstLetter": {
    display: "inline-block",
    "&:first-letter": {
      textTransform: "capitalize"
    }
  },
  ".ellipsis": {
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "inherit"
  },
  ".ellipsisMulti": {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical"
  }

};
