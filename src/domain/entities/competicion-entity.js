import mongoose from "mongoose"

const competicion = (db) => {
    const competicionSchema = new Schema(
        {
            name: { type: String, required: true, unique: true},
            users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    required: true
                },
            ],
            players: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "player",
                    required: true
                },
            ],
        },
        {
            timestamps: true,
        }
    );
    return db.model("competicion", competicionSchema)
}

export default competicion;