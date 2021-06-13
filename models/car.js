const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    model: { type: String },
    carno: { type: String },
    insurance: { type: String }
});

const Car = new mongoose.model("Car", carSchema);

// module.exports = Car;

module.exports = {

    fetchData: function(callback) {
        var car = Car.find({});
        car.exec((err, data) => {
            if (err) throw err;
            return callback(data);
        })
    }
}