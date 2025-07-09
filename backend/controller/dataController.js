const DataModel = require("../model/Data");

const addDataController = async (req, res) => {
    try {
const obj=req.body;
console.log(obj)

const newEntry=await new DataModel(obj);

await newEntry.save();
res.status(201).send({
    message:"Data added successfully",
    newEntry
})
    } catch (error) {
res.status(401).send({
    message:"error to adding data in backend",
    error
})
    }
}


const getDataController= async (req, res) => {
    try {
const data=await DataModel.find({userId:req.user.userId});
console.log(data);
console.log(req.user);

res.status(200).json(data);
    } catch (error) {
res.status(500).send({
    message:"failed to fetch data",
    
})
    }
}

const updateDataController = async (req, res) => {
    try {
        const {id}=req.params;
        const data=req.body
        const updateData=await DataModel.findByIdAndUpdate(id,data,{new:true});
        if(!updateData){
           return  res.status(404).send({
                message:"Patient not found",
            })
        }
        
        res.status(200).json({
            message:"data updated successfully",
            updateData
        })
    } catch (error) {
        console.log(error)
res.status(400).send({
    error:error.message,
    message:"user not found"
})
    }
}

const deleteDataController = async (req, res) => {
    try {
const {id}=req.params;
console.log(typeof(id))
const deleteData=await DataModel.findByIdAndDelete(id);
if(!deleteData){
   return  res.status(404).send({
        message:"Patient not found",
    })
}

res.status(200).json({
    message:"data deleted successfully",
    deleteData
})
    } catch (error) {
console.log(error)
return  res.status(404).send({
    message:"Patient not found",
    error:error.message
})
    }
}


const getByIdDataController= async (req, res) => {
    try {
        const {id}=req.params;
const data=await DataModel.findById(id);
console.log(data);


res.status(200).json(data);
    } catch (error) {
res.status(500).send({
    message:"failed to fetch data",
    
})
    }
}
module.exports={
    addDataController,
    getDataController,
    updateDataController,
    deleteDataController,
    getByIdDataController

}