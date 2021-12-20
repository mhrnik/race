import nextConnect from "next-connect";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { v4 as uuidv4 } from "uuid";
const { getStorage, uploadBytes, getDownloadURL } = require("firebase-admin/storage");
const multer = require("multer");

const { GOOGLE_CLOUD_PROJECT, FIREBASE_STORAGE_BUCKET_URL } = process.env;

if (!global.firebaseApp) {
  const firebaseConfig = {
    projectId: GOOGLE_CLOUD_PROJECT,
    storageBucket: FIREBASE_STORAGE_BUCKET_URL,
  };
  if (process.env.FIREBASE_APPLICATION_CREDENTIALS) {
    //const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_APPLICATION_CREDENTIALS, "base64").toString());
    const serviceAccount = JSON.parse(process.env.FIREBASE_APPLICATION_CREDENTIALS);
    firebaseConfig.credential = cert(serviceAccount);
  }
  global.firebaseApp = initializeApp(firebaseConfig);
}

const storage = getStorage(global.firebaseApp);

// Add file to Storage and return the file path
const uploadFile = async (req, res) => {
  // Grab the file
  const timestamp = Date.now();
  const fileName = `${timestamp}_${req.file.originalname}`;
  const bucket = storage.bucket();
  const file = bucket.file(fileName);

  let uuid = uuidv4();
  const fileStream = file.createWriteStream({
    metadata: {
      metadata: {
        originalName: req.file.originalname,
        firebaseStorageDownloadTokens: uuid,
      },
    },
    resumable: false,
  });
  // This is here incase any errors occur
  fileStream.on("error", function (err) {
    console.error(err);
    throw err;
  });
  fileStream.end(req.file.buffer);
  console.log(`${req.file.originalname} uploaded to ${bucket.name}`);
  const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media&token=${uuid}`;
  return { name: req.file.originalname, url: fileUrl };
};

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `something went wrong ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not supported` });
  },
});
apiRoute.post("/api/uploads", upload.single("file"), async (req, res) => {
  const result = await uploadFile(req, res);
  res.status(200).json(result);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
