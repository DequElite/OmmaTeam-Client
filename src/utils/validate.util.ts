import { ZodSchema } from "zod";

export function validateSchemas<T>(schema: ZodSchema<T>, data: unknown){
    const result = schema.safeParse(data);
    if(!result.success){
        throw new Error(JSON.stringify(result.error.format()));
    }
    return result.data;
}