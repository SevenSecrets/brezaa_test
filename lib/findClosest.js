const findDistance = require('./findDistance');

module.exports = (sellers, userLong, userLat) => {
	const distances = []
	
	// populate distances with the distances between users
	sellers.forEach((seller) => {
		let distance = findDistance(userLat, userLong, seller.latitude, seller.longitude);
		distances.push(distance);
	})

	// find lowest distance
	let closest = Math.min(...distances);

	// return the seller with that distance 
	return sellers[distances.indexOf(closest)];
}