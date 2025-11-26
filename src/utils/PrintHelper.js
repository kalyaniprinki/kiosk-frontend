import axios from "axios";

export default async function sendToLocalPrinter(filePath) {
  try {
    const res = await axios.post("http://localhost:9100/print", {
      filePath,
    });
    return res.data;
  } catch (err) {
    return { error: true, message: err.message };
  }
}
