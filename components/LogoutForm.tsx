import { logout } from "@/server/actions/auth"

export default function Page(){
    return(
        <form action={logout}>
            <button
             className="p-2 bg-orange-500 rounded"
             type="submit">
                Logout
            </button>
        </form>
    )
}