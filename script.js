document.addEventListener("DOMContentLoaded", () => {
    const prepareStatementBtn = document.getElementById("prepare-statement-btn");
    const resultOutput = document.getElementById("result");
    const copyToClipboardBtn = document.getElementById("copy-to-clipboard-btn");
    const dbNameInput = document.getElementById("database-name");
    const dbUsernameInput = document.getElementById("database-username");

    prepareStatementBtn.addEventListener("click", () => {
        const dbName = document.getElementById("database-name").value;
        const dbUsername = document.getElementById("database-username").value;
        let dbHost = document.getElementById("database-host").value;
        const cleanOption = document.getElementById("clean").checked;
        const addIfExistsOption = document.getElementById("add-if-exists").checked;
        const onlySchema = document.getElementById("only-schema").checked;

        if (dbName === "") {
            dbNameInput.classList.add("is-invalid");
            return;
        }

        if (dbUsername === "") {
            dbUsernameInput.classList.add("is-invalid");
            return;
        }

        // Clear validation classes if the fields are filled
        dbNameInput.classList.remove("is-invalid");
        dbUsernameInput.classList.remove("is-invalid");

        if (!dbHost) {
            dbHost = "localhost";
        }

        let statement = `pg_dump -U ${dbUsername} -h ${dbHost} ${dbName} > ${dbName}.sql`;

        if (!onlySchema && cleanOption) {
            statement += " --clean";
        }

        if (!onlySchema && addIfExistsOption) {
            statement += " --if-exists";
        }

        if (onlySchema) {
            statement += " --schema-only";
        }

        statement += " --no-owner";

        resultOutput.textContent = statement;

        // Enable the "Copy to Clipboard" button after generating the statement
        copyToClipboardBtn.disabled = false;
    });

    copyToClipboardBtn.addEventListener("click", () => {
        const textToCopy = resultOutput.textContent;
        const tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Statement copied to clipboard!");
    });

    // Reset custom validation messages when user interacts with the input fields
    dbNameInput.addEventListener("input", () => {

        const dbName = document.getElementById("database-name").value;

        if (dbName === "") {
            dbNameInput.classList.add("is-invalid");
        } else {
            dbNameInput.classList.remove("is-invalid");
        }
    });

    dbUsernameInput.addEventListener("input", () => {

        const dbUsername = document.getElementById("database-username").value;

        if (dbUsername === "") {
            dbUsernameInput.classList.add("is-invalid");
        } else {
            dbUsernameInput.classList.remove("is-invalid");
        }
    });
});
