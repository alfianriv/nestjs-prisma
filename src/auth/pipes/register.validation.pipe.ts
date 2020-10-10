import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class RegisterValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            fullname: Joi.string().required().max(50),
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
        });
    }
}