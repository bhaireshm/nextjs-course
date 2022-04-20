import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  function loadProject() {
    // router.push("/clients/bhai/project1");
    router.push({ pathname: "/clients/[id]/[clientprojectid]", query: { id: "bhai", clientprojectid: "project1" } });
  }

  return (
    <div>
      {router.query.id} Project Page
      <button onClick={loadProject}>Load project A</button>
    </div>
  );
}

export default ClientProjectsPage;
