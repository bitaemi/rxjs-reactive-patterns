export function createSubscriber(tag) {
	return {
		next(item) { console.log(`${tag}.next ${item}`); },
		error(error) { console.log(`${tag}.error ${error.stack || error}`); },
		complete() { console.log(`${tag}.complete`); }
	};
}