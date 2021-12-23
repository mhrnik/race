import Layout from "../components/Layout";
import AuthenticationGate from "../components/AuthenticationGate";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { useSession } from "next-auth/react";

export default function Join() {
  const { status: sessionStatus } = useSession();
  return (
    <AuthenticationGate sessionStatus={sessionStatus}>
      <Layout narrow={false} className="w-screen px-4 xl:px-0 px-4 xl:px-0">
        <ApplicationForm />
      </Layout>
    </AuthenticationGate>
  );
}
