import Reset from "../../../components/Reset";
import { useRouter } from "next/router";

const ResetPage = () => {
    const router = useRouter();
    return (
        <div>
            <p>Reset Your Password</p>
            <Reset resetToken={router.query.resetToken} />
        </div>
    );
};

export default ResetPage;
