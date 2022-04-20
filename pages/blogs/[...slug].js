import { useRouter } from "next/router";

function BlogsPage() {
  const router = useRouter();
  console.log(router.query);

  return <div>Blogs page</div>;
}

export default BlogsPage;
