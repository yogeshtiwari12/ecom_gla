import mongoose,{Document, Schema} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    otp: string;
}

const userSchema : Schema<User> = new Schema({
name:{
    type: String,
    required: true
},
email:{
    required: true,
    type: String,
},password:{
    type: String,
    required: true
},
role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    // required: false
},
isVerified:{
    type: Boolean,
    default: false
},
verifyCodeExpiry: {
    type: Date,
    default: Date.now()
},
createdAt: {
    type: Date,
    default: Date.now
},
})

export const USer = mongoose.models.User || mongoose.model<User>("User", userSchema);