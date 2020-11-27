const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	reviewValue: Number,
	comment: String
});

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;