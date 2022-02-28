// extends React namespace and declare it as app
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
        readonly REACT_APP_API_URI: string;
        readonly REACT_APP_NAISTER_API_URI: string;
    }
}
