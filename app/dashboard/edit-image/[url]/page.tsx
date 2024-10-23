import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import EditImage from "@/components/image/edit-image";



export default async function Page({ params }: { params: { url: string } }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
        <EditImage url={params.url} />
    </SessionProvider>
  );
}
