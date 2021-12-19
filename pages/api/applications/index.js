import Application from "../../../models/Application";
import { getSession } from "next-auth/react";
import queryWithSession from "../../../utils/queryWithSession";

export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).send(await getApplications());
  } else if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      const application = req?.body;
      if (!application) {
        res.status(400).json({ error: "Malformed request", success: false });
      } else {
        const { result, error } = await queryWithSession((session) => {
          Application.create(application);
        });
        if (error) {
          res.status(400).json({ error: error, success: false });
        } else {
          // might need data for email sending
          res.status(201).json({ success: true, data: result });
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
