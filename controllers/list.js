const logger = require("../logger");
const List = require("../models/list");

async function getAllLists() {
  let lists = await List.find({});
  return (lists || []).map(list => {
    list._id = list._id.toString();
    return list;
  });
}

module.exports = {
  craete: async (req, res) => {
    try {
      await List.create(req.body);
      return res.redirect("back");
    } catch (error) {
      console.warn("Error in creating list =", error);
      throw error;
    }
  },
  deleteById: async (req, res) => {
    try {
      await List.findByIdAndDelete(req.params.id);
      return res.redirect("back");
    } catch (error) {
      console.warn("Error in deleteById list =", error);
      throw error;
    }
  },
  changeStatus: async (req, res, next) => {
    try {
      let rec = await List.findOne({ _id: req.params.id }, { status: 1 });
      let tmpStatus = rec.status == "Pending" ? "Completed" : "Pending";
      if (rec && rec.status)
        await List.updateOne(
          { _id: req.params.id },
          { $set: { status: tmpStatus } }
        );
      // return res.send(tmpStatus);
      return res.json({ ...rec, status: tmpStatus });
    } catch (error) {
      console.warn("Error in changeStatus list =", error);
      throw error;
    }
  },
  getAll: async (req, res) => {
    try {
      return res.render("home", {
        lists: await getAllLists()
      });
    } catch (error) {
      console.warn("Error in getAll list =", error);
      throw error;
    }
  },
  completeAll: async (req, res) => {
    try {
      await List.updateMany({}, { $set: { status: "Completed" } });
      return res.redirect("back");
    } catch (error) {
      console.warn("Error in completeAll list =", error);
      throw error;
    }
  },
  deleteAll: async (req, res) => {
    try {
      await List.deleteMany({});
      return res.redirect("back");
    } catch (error) {
      console.warn("Error in deleteAll list =", error);
      throw error;
    }
  }
};
