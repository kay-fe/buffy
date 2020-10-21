import UpdateItem from "../components/UpdateItem";
import { useRouter } from "next/router";

function Update() {
    const router = useRouter();
    return (
        <div>
            <UpdateItem id={router.query.id} />
        </div>
    );
}

export default Update;
