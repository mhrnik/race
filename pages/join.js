import Layout from "../components/Layout";
import AuthenticationGate from "../components/AuthenticationGate";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { getSession } from "next-auth/react";

export default function Join({ userSession }) {
  return (
    <AuthenticationGate userSession={userSession}>
      <Layout narrow={false} className="w-screen px-4 xl:px-0 px-4 xl:px-0">
        <ApplicationForm />
      </Layout>
    </AuthenticationGate>
  );
}

export async function getServerSideProps(context) {
  let userSession = null;

  try {
    userSession = await getSession(context);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      userSession,
    },
  };
}
