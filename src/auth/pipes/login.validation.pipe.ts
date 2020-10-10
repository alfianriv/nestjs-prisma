import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class LoginValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
        });
    }
}