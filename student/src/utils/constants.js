const prod = {
  url: {
    API_URL: "http://localhost:5001",
   }
 };

 const dev = {
  url: {
    API_URL: "http://localhost:5001"
   }
 };

 export const appUrl = process.env.NODE_ENV === "development" ? dev.url.API_URL : prod.url.API_URL;

