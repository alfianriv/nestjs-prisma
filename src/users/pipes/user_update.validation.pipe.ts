import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class UserUpdateValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            email: Joi.string().email().min(6).required(),
            fullname: Joi.string().required()
        });
    }
}