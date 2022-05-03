//export const path:string = "http://localhost/transfo-backend/educacion/";
//export const path:string = "http://localhost/api_educacion/educacion/";
export const path:string = "https://olam-systems.com.mx/connectandem/connectandem/";

export const pathSettlementsCity = "https://olam-systems.com.mx/api_suite_home/settlements/getMunicipios";

export const emulado = false;

export const idEmpresa = 188;
export const catalogoSabias = 149;

export const remastered = false;

export const environment = { 
  production: true,
  //Services path
  genericQuerie: `${path}petition`,
  fcm: `${path}fcm`,// push notifications
  mail: `${path}email`,
  loadBlob:`${path}load-blob`,
  load:`${path}load`,
  loadPDF:`${path}load-pdf`,
  getImagenIndividual: `${path}image/`,
  getPDF: `${path}pdf/`,
  loadBlobOnly:`${path}load-blob-only`,
  loadFile:`${path}load-file`,
  loadFileOnly:`${path}load-only-file`,
  deleteTemporal:`${path}delete-temporal`,
};

export const firebaseConfig = {
  apiKey: "AIzaSyCUnpgutL4cCLb5gCPMsV28e0_unokHWL4",
  authDomain: "my-gym-v5.firebaseapp.com",
  projectId: "my-gym-v5",
  storageBucket: "my-gym-v5.appspot.com",
  messagingSenderId: "207458345350",
  appId: "1:207458345350:web:e9e17cb70b6d10cda64c07",
  measurementId: "G-VJX45VN69L"
};

export const themeData = {
  blue: {
    background: "#051a3c",
    color: "#f2f2f2",
    alert_class: "theme1",
  },
  green: {
    background: "#104f26",
    color: "#f2f2f2",
    alert_class: "theme2",
  },
  red:{
    background: "#711b12",
    color: "#f2f2f2",
    alert_class: "theme3",
  },
  purple:{
    background: "#530751",
    color: "#f2f2f2",
    alert_class: "theme4",
  },
  pink:{
    background: "#a42069",
    color: "#f2f2f2",
    alert_class: "theme5",
  },
  black:{
    background: "#151414",
    color: "#f2f2f2",
    alert_class: "theme6",
  }
}