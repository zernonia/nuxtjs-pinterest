const DB_NAME = 'Nuxt-Pinterest';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
                resolve(DB);
                console.log('OPENING DB', DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore("liked", { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deleteLiked(data) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['liked'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('liked');
			store.delete(data.id);
		});	
	},
	async getLiked() {

		let db = await this.getDb();

		return new Promise(resolve => {


			let trans = db.transaction(['liked'],'readonly');
			trans.oncomplete = () => {
				resolve(likeds);
			};
			
			let store = trans.objectStore('liked');
			let likeds = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					likeds.push(cursor.value)
					cursor.continue();
				}
			};
		});
	},

	async saveLiked(liked) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['liked'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('liked');
			store.put(liked);

		});
	
	}

}