import { useState } from "react";
import { apiCloudinary } from "../config";

export default function useForm(initial = {}) {
    const [inputs, setInputs] = useState(initial);
    const [customLoading, setCustomLoading] = useState(false);

    async function handleChange(e, permissions = []) {
        let { value, name, type } = e.target;

        // let addition = {
        //     largeImage: "",
        // };

        if (type === "number") {
            value = parseInt(value);
        }
        if (type === "file") {
            setCustomLoading(true);
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "buffyco");

            const res = await fetch(apiCloudinary, {
                method: "POST",
                body: data,
            });
            const file = await res.json();

            value = file.secure_url;
            // addition.largeImage = file.eager[0].secure_url;
            inputs.largeImage = file.eager[0].secure_url;
            setCustomLoading(false);
        }
        if (type === "checkbox") {
            // take a copy of the current permissions
            let updatedPermissions = [...permissions];
            //     // figure out if we need to remove or add this permission
            if (e.target.checked) {
                // add it in!
                updatedPermissions.push(value);
            } else {
                updatedPermissions = updatedPermissions.filter(
                    permission => permission !== value
                );
            }
            value = updatedPermissions;
        }

        setInputs({
            ...inputs,
            [name]: value,
            // ...addition,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(
            Object.entries(inputs).map(([key]) => [key, ""])
        );
        setInputs(blankState);
    }

    return {
        inputs,
        customLoading,
        handleChange,
        resetForm,
        clearForm,
    };
}
