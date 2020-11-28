module.exports = (latUser, longUser, latSeller, longSeller) => {
	// converting lat/long degrees to radians
	const latRadiansUser = (latUser*(Math.PI/180));
	const longRadiansUser = (longUser*(Math.PI/180));
	const latRadiansSeller = (latSeller*(Math.PI/180));
	const longRadiansSeller = (longSeller*(Math.PI/180));

	// Haversine formula
	const diffLat = latRadiansSeller - latRadiansUser;
	const diffLong = longRadiansSeller - longRadiansUser;

	const distance = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(latRadiansUser) * Math.cos(latRadiansSeller) * Math.pow(Math.sin(diffLong / 2), 2);

	// no unit was given so I'm using miles
	const distMiles = 3936 * (2 * Math.asin(Math.sqrt(distance)));

	console.log(distMiles);
	return distMiles;
}