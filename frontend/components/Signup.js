import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
    ) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

function Signup() {
    const { inputs, handleChange, clearForm } = useForm({
        name: "",
        email: "",
        password: "",
    });
    const [signup, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
    return (
        <Form
            method="post"
            onSubmit={async e => {
                e.preventDefault();
                await signup({
                    variables: inputs,
                });
                clearForm();
            }}
        >
            <fieldset
                disabled={loading}
                aria-busy={loading}
                data-testid="loading"
            >
                <h2>Sign Up for An Account</h2>
                <Error error={error} />
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={inputs.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={inputs.name}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={inputs.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </label>

                <button type="submit">Sign Up!</button>
            </fieldset>
        </Form>
    );
}

export default Signup;
export { SIGNUP_MUTATION };
