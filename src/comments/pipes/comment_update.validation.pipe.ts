import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class CommentUpdateValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            comment: Joi.string().required(),
        });
    }
}