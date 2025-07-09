const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
name:{
    type:String,
    required:true
},
gender:{
    type:String,
    enum:['Male','Female'],
    required:true
},
age:{
    type:Number,
    required:true
},
doctor:{
    type:String,
    required:true
},
test:{
    type:String,
    required:true
},
opd:{
    type:String,
    required:true
},
remark:{
    type:String,
    required:true
},
lab:{
    type:String,
    required:true
},
amount:{
    type:Number,
    required:true
},
date:{
    type:Date,
    default:Date.now,
    required:true
},

},
{
    timestamps:true
}
)



const DataModel=mongoose.model("Data",DataSchema);

module.exports=DataModel;