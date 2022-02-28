// https://github.com/microsoft/TypeScript-React-Starter/issues/12* //fix img/svg type
declare module "*.png" {
  const png: any;
  export default png;
}
declare module "*.svg" {
  const svg: any;
  export default svg;
}
declare module "*.jpg" {
  const jpg: any;
  export default jpg;
}
