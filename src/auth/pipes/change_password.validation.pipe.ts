import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class ChangePasswordValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            password: Joi.string().min(6).required(),
            code: Joi.string().required()
        });
    }
}