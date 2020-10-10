import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class PostUpdateValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            title: Joi.string().required(),
            content: Joi.string(),
        });
    }
}