import mongoose,{Schema} from "mongoose";

const LocationSchema = new Schema({
    lat: { type: Number },
    lng: { type: Number },
  });
  
  const ViewportSchema = new Schema({
    northeast: LocationSchema,
    southwest: LocationSchema,
  });
  
  const GeometrySchema = new Schema({
    location: LocationSchema,
    viewport: ViewportSchema,
  });

  
const googleclinics = new mongoose.Schema({
    formatted_address: { type: String },
    formatted_phone_number: { type: String },
    geometry: GeometrySchema,
    icon: { type: String },
    icon_background_color: { type: String },
    name: { type: String },
    international_phone_number: { type: String },
    rating: { type: Number },
    url: { type: String },
    types: [{ type: String }],
    website: { type: String },
    vicinity: { type: String },
    wheelchair_accessible_entrance: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{
    timestamps: true,
    collection: 'googleclinics'
})

export default mongoose.models.googleclinics || mongoose.model('googleclinics', googleclinics)

