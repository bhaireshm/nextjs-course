import { useRouter } from "next/router";

function ClientSelectedProjectPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      {router.query.id} specific({router.query.clientprojectid}) Project Page
    </div>
  );
}

export default ClientSelectedProjectPage;
