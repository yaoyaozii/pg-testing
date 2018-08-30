const fs = require('fs');
const { Pool } = require('pg');
const con = new Pool({
  connectionString: process.env.DATABASE_URL
});

let db = {};

// db.insertUser = (user) => {
//   let res = db.findByName(user.username);
//   if (res) {
//     return null;
//   } else {
//     return dblow.get('users').push(user).write();
//   }
// };

// db.readId = (id) => {
//   return dblow.get('users').find({ user_id: id }).value();
// };

// db.readName = (name) => {
//   return dblow.get('users').find({ username: name }).value();
// };

// db.update = (user) => {
//   return dblow.get('users').find({user_id: user.user_id}).assign(user).write();
// };

// db.delete = (id) => {
//   return dblow.get('users').remove({ user_id: id }).write();
// };

db.createTable = () => {
	db.testing();
	let sql = fs.readFileSync('./pg.sql').toString();
	console.log(sql);
	let data = [{ name: "yaoyao", surname: "zii" }, { name: "name", surname: "surname"}];
	
	
};

db.testing = () => { console.log('testing'); }

db.query = (sql, params, callback) => {
	con.connect().then(client => {
		return client.query(sql, params)
			.then(res => {
				client.release();
				callback(null, res);
			})
			.catch(err => {
				client.release();
				callback(err, null);
			});
	})
	.catch(err => {
		callback(err, null);
	});
};

db.emptyRow = (res) => {
	var ret = {};
	res.fields.forEach(r => {
		ret[r.name] = "";
	});
	return ret;
};

db.queryOne = (sql, params) => {
	return con.connect().then(client => {
		return client.query(sql, params)
			.then(res => {
				client.release();
				return res;
			})
			.catch(err => {
				client.release();
				return err;
			});
	})
	.catch(err => {
		return err;
	});


};

module.exports = db;
