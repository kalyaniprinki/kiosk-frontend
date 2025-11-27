import axios from "axios";
// export default async function sendToLocalPrinter(url) {
//   try {
//     const res = await axios.post("http://localhost:9100/download-and-print", {
//       url
//     });
//     return res.data;
//   } catch (err) {
//     return { error: true, message: err.message };
//   }
// }

// import axios from "axios";

export default async function sendToLocalPrinter(pdfUrl) {
  try {
    const res = await axios.post("http://localhost:9100/print", {
      url: pdfUrl,
    });
    return res.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}

// export default async function sendToLocalPrinter(filePath) {
//   try {
//     const res = await axios.post("http://localhost:9100/print", {
//       filePath,
//     });
//     return res.data;
//   } catch (err) {
//     return { error: true, message: err.message };
//   }
// }
