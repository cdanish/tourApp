import mongose from "mongoose";

const tourSchema = new mongose.Schema({

    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date,
    },
    likeCount: {
        type: Number,
        default: 0
    }

},
   { timestamps: true}
);

const TourModel = mongose.model("Tour", tourSchema);

export default TourModel;