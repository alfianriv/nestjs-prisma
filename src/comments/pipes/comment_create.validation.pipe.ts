import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class CommentCreateValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            postId: Joi.string().required(),
            comment: Joi.string().required(),
        });
    }
}