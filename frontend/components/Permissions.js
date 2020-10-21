import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";
import PropTypes from "prop-types";
import { useMutation, useQuery, gql } from "@apollo/client";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY } from "./User";

const possiblePermissions = [
    "ADMIN",
    "USER",
    "ITEMCREATE",
    "ITEMUPDATE",
    "ITEMDELETE",
    "PERMISSIONUPDATE",
];

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            name
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = props => {
    const { data, loading, error } = useQuery(ALL_USERS_QUERY);

    return (
        <div>
            <Error error={error} />
            <div>
                <h2>Manage Permissions</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            {possiblePermissions.map(permission => (
                                <th key={permission}>{permission}</th>
                            ))}
                            <th>👇🏻</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.users &&
                            data.users.map(user => (
                                <UserPermissions {...user} key={user.id} />
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
    // return null;
};

function UserPermissions({ id, name, email, permissions }) {
    const { inputs, handleChange, clearForm } = useForm({
        permissions,
        userId: id,
    });
    console.log("inputs = ", inputs);

    const [updatePermissions, { error, loading, data }] = useMutation(
        UPDATE_PERMISSIONS_MUTATION,
        {
            variables: inputs,
            // refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );

    return (
        <React.Fragment>
            {error && (
                <tr>
                    <td colspan="8">
                        <Error error={error} />
                    </td>
                </tr>
            )}
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                {possiblePermissions.map(permission => (
                    <td key={permission}>
                        <label htmlFor={`${id}-permission-${permission}`}>
                            <input
                                id={`${id}-permission-${permission}`}
                                type="checkbox"
                                checked={inputs.permissions.includes(
                                    permission
                                )}
                                value={permission}
                                onChange={e =>
                                    handleChange(e, inputs.permissions)
                                }
                                name="permissions"
                            />
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton
                        type="button"
                        disabled={loading}
                        onClick={updatePermissions}
                    >
                        Updat{loading ? "ing" : "e"}
                    </SickButton>
                </td>
            </tr>
        </React.Fragment>
    );
}

UserPermissions.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        id: PropTypes.string,
        permissions: PropTypes.array,
    }).isRequired,
};

export default Permissions;
