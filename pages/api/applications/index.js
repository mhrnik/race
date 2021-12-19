// import { submitApplication } from "../../../actions/applications";
import { Application } from "../../../models/Application"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).send(await getApplications());
  } else if (req.method === "POST") {
    // const session = await getSession({ req });
    // if (session) {
      const userId = req?.body?.authorDiscordId;
      const application = req?.body?.application;

      var fullApplication = { ...{authorDiscordId: userId}, ...application }

      if (!userId || !application || !fullApplication) {
        res.status(400).json({ success: false })
      } else {
        try {
          const app = await Application.create(
            fullApplication
          )
          res.status(201).json({ success: true, data: app })
        } catch (error) {
          res.status(400).json({ success: false })
        }
      }
    // } else {
    //   res.status(401);
    // }
    res.end();
  } else {
    res.status(405);
  }
}
