// import { submitApplication } from "../../../actions/applications";
import Application from "../../../models/Application"
import dbConnect from '../../../utils/dbConnect'
import { getSession } from "next-auth/react"


export default async function handler(req, res) {
  await dbConnect()

  if (req.method === "GET") {
    return res.status(200).send(await getApplications());
  } else if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      const application = req?.body
      if (!application) {
        res.status(400).json({ error: "Malformed request", success: false })
      } else {
        try {
          const app = await Application.create(application)
          res.status(201).json({ success: true, data: app })
        } catch (error) {
          res.status(400).json({ error: error, success: false })
        }
      }
    } else {
      res.status(401).json({ error: "Unauthorized", success: false });
    }
    res.end();
  } else {
    res.status(405);
  }
}
