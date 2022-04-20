import Link from "next/link";

function ClientListPage() {
  const clients = [
    { id: "bhai", name: "Bhairesh" },
    { id: "patil", name: "Mallanagouda Patil" },
  ];

  return (
    <div>
      Clients List Page
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              {/* <Link href={`/clients/${client.id}`}>{client.name}</Link> */}
              <Link href={{ pathname: "/clients/[id]", query: { id: client.id } }}>{client.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientListPage;
