import { v4 as uuidv4 } from 'uuid';

function generate_confirmation_token(): string {
    return uuidv4()
}

export { generate_confirmation_token }