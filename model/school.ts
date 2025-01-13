import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startYear: { type: String, required: true },
  totalStudent: { type: Number, required: true },
  state: { type: String, required: true },
  stateAbbr: { type: String, required: true },
  lat: { type: Number, required: true },
  lnt: { type: Number, required: true },
  address: { type: String, required: true },
  addressCity: { type: String, required: true },
  zipcode: { type: Number, required: true },
  phone: { type: Number, required: true },
  type: { type: String, required: true },
  lowestGrade: { type: String, required: true },
  highestGrade: { type: String, required: true },
  fteTeachers: { type: Number, required: true },
  ratio: { type: Number, required: true },
  addressCounty: { type: String, required: true },
  asianOrPacificIslanderStudents: {
    "2022-23": { type: Number, required: true },
  },
  asapStudent: { type: Number, required: true },
  afStudent: { type: Number, required: true },
  whStudent: { type: Number, required: true },
  schoolLevel: { type: Number, required: true },
  schoolId: { type: Number, required: true },
}
,{
    timestamps: true,
    collection: 'schools'
});

export default mongoose.models.schools || mongoose.model('schools', SchoolSchema)
