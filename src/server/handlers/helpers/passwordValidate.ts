import passwordValidator from "password-validator";
import messages from "../../../static/messages.js"

// Password validation schema
let schema = new passwordValidator()
    .is().min(8, messages.auth.password.min_chars)
    .is().max(100, messages.auth.password.max_chars)
    .has().lowercase(0)
    .has().not().spaces(0, messages.auth.password.no_spaces);

function validPass(password: string) {
    const validPass = schema.validate(password, { details: true }) as any[]
    if (validPass.length > 0) {
        // At least one rule was broken
        let messages = [];
        for (let reason of validPass) {
            messages.push(reason.message);
        }

        throw new Error(messages.toString());

    }

    return true;
} 

export default validPass;